# Drive → Website Sync

Department heads drop files into Google Drive; a scheduled GitHub Action pulls
them in and updates the website automatically.

```
Google Drive (AIS Website Content)
   → GitHub Action (every ~15 min, keyless auth via Workload Identity Federation)
   → regenerates src/data/*.js + copies PDFs/photos into public/
   → commits to the repo → Vercel deploys
```

No credentials are stored anywhere: the Action authenticates to Google with a
short-lived OIDC token (WIF), and commits with GitHub's built-in token.

---

## Google Drive layout

Inside the shared folder **AIS Website Content**:

```
EDUs/            → PE/  VC/  HF/  RE/      (educational presentation PDFs)
Newsletters/     → PE/  VC/  HF/  RE/      (newsletter PDFs)
Founder Reports/                            (founder report PDFs)
Events/          → <one sub-folder per event>
```

The folder **must stay shared (Viewer)** with
`drive-sync@ais-escp-website.iam.gserviceaccount.com`.

## Naming convention (PDF libraries: EDUs, Newsletters, Founder Reports)

Name each file with an optional leading date, then the title:

| Filename in Drive | Shows on site as |
|---|---|
| `2025-02 Guide to LBO Modeling.pdf` | "Guide to LBO Modeling" · February 2025 |
| `2026-Q1 Founder Report.pdf` | "Founder Report" · Q1 2026 |
| `2025 Founder Report.pdf` | "Founder Report" · 2025 |
| `Some Title.pdf` (no date) | "Some Title" · ordered by upload time |

- **Department** comes from the sub-folder (PE/VC/HF/RE) — you don't put it in the name.
- **Page count** is read from the PDF automatically.
- You can drop **Google Slides/Docs** directly (no need to export) — they're converted to PDF.
- **Description / topic** (the blurb under the title): add an optional text file
  with the *same name* as the PDF, e.g. `2025-02 Guide to LBO Modeling.txt`, whose
  contents become the description.

### Updating / removing
- **Update**: replace the file in Drive (keep the same name to keep the same URL).
- **Remove**: delete the file from Drive — it disappears from the site on the next sync.

## Events

One sub-folder per event under `Events/`. The folder name becomes the URL slug.
Put an **`event.json`** in it for the editorial fields, plus images:

```json
{
  "title": "EQT Real Estate Workshop",
  "date": "2026",
  "partnerName": "EQT Real Estate",
  "partnerUrl": "https://eqtgroup.com/real-estate",
  "division": "re",
  "type": "workshop",
  "description": "Short card text.",
  "fullDescription": "Longer recap.\n\nSecond paragraph.",
  "keyTakeaways": ["First point", "Second point"],
  "bannerLogo": "/logos/EQTRealEstate-white.svg"
}
```

- An image named `banner.*` becomes the hero photo; other images become the gallery.
- Missing fields fall back to the event's current values on the site.

---

## First run & migration (operator)

Because Drive is the source of truth, a category's existing site content must be
**uploaded into Drive first**, or the sync would have nothing to publish. A safety
guard refuses to wipe a category to empty, so nothing breaks if a folder is empty —
it's just skipped.

To migrate a category without losing the current descriptions:
1. Upload the existing PDFs into the matching Drive folders.
2. **Name them with the same titles** currently shown on the site — the sync
   carries over the existing description/topic/issue/URL by matching the title.
3. Trigger a **dry run** first (Actions tab → "Drive content sync" → Run workflow →
   tick *dry_run*) and read the log to confirm the counts look right.
4. Run it for real (untick dry_run). It commits and Vercel deploys.

## Running locally (optional)

```bash
gcloud auth application-default login   # one-time, as escpaisadmin@gmail.com
cd ops/drive-sync && npm install
npm run dry-run     # read Drive, write nothing
npm run sync        # real run
npm run self-test   # offline parsing/generation tests
```

## How auth works

- **CI:** `google-github-actions/auth` exchanges GitHub's OIDC token for short-lived
  Google credentials via the Workload Identity provider, impersonating the
  `drive-sync` service account (read-only Drive scope).
- **Local:** Application Default Credentials from `gcloud auth application-default login`.
- The service account has **no key**; the Drive folder is shared with it as Viewer.
