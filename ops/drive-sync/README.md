# Drive → Website Sync

Department heads drop files into Google Drive; a scheduled GitHub Action pulls
them in and updates the website automatically.

```
Google Drive (AIS Website Content)
   → GitHub Action (scheduled every 15 min; GitHub may delay runs)
   → regenerates src/data/*.js + copies PDFs/photos into public/
   → commits to the repo → Vercel deploys
```

No credentials are stored anywhere: the Action authenticates to Google with a
short-lived OIDC token (WIF), and commits with GitHub's built-in token.

---

## Google Drive layout

Inside the shared folder **AIS Website Content**:

```
Department Publishing/
  Private Equity/   → Publications/  Newsletters/
  Venture Capital/  → Publications/  Newsletters/
  Hedge Funds/      → Publications/  Newsletters/
  Real Estate/      → Publications/  Newsletters/
  Private Credit/   → Publications/  Newsletters/
  Infrastructure/   → Publications/  Newsletters/
Founder Reports/   (founder report PDFs)
Events/            → <one sub-folder per event>
```

The folder **must stay shared (Viewer)** with
`drive-sync@ais-escp-website.iam.gserviceaccount.com`.

Share each department folder with its head as **Editor**. They only need that
one link. Upload final PDFs into **Publications** or **Newsletters**; publication
is automatic, with no further approval step. Keep drafts outside these folders.
Google Slides/Docs are also exported automatically, so do not draft in the live folders.
Keep folder names unchanged. New folders inherit the sync account's Viewer access.

Existing department PDFs were moved into this layout on 9 October 2026. The
empty old folders are in `Archive - retired folder structure` for old Drive
links. The original root-level `EDUs/PE`, `Newsletters/PE`, etc. paths remain
supported for migration/rollback; do not leave duplicate publications there.

## Naming convention (PDF libraries)

Name each file with an optional leading date, then the title:

| Filename in Drive | Shows on site as |
|---|---|
| `2025-02 Guide to LBO Modeling.pdf` | "Guide to LBO Modeling" · February 2025 |
| `2026-Q1 Founder Report.pdf` | "Founder Report" · Q1 2026 |
| `2025 Founder Report.pdf` | "Founder Report" · 2025 |
| `Some Title.pdf` (no date) | "Some Title" · ordered by upload time |

- **Department** comes from the department folder — you don't put it in the name.
- **Page count** is read from the PDF automatically.
- **Reading and downloads**: every PDF opens in the browser's full-page reader.
  The sync keeps a full-quality copy under `originals/` for **Download** and
  creates a smaller reading copy under `pdf/` for **Read**. Images are optimized
  for screens; text, links, page geometry and bookmarks are checked before use.
  Both copies have their PDF document Title set to the website publication title,
  including any embedded XMP title. Other metadata and the Drive source stay intact.
  The smaller of the titled lossless and image-optimized versions is published.
  Fully scanned PDFs retain their original image resolution.
- **Automatic optimization**: `pdf-cache.json` records source/optimizer hashes so
  unchanged PDFs are reused. Updating a Drive file or the optimizer regenerates
  its reading copy. Reading copies can remain in a visitor's browser cache for
  up to five minutes; originals are excluded from search indexing.
- You can drop **Google Slides/Docs** directly (no need to export) — they're converted to PDF.
- **Description** (the blurb under the title): add an optional text file
  with the *same name* as the PDF, e.g. `2025-02 Guide to LBO Modeling.txt`, whose
  contents become the description. Editing that text file updates the description on the next sync.

### Updating / removing
- **Update**: use Drive → File information → Manage versions → Upload new version. Keep the filename when replacing a file. Drive file IDs are also stored to preserve the website URL across renames.
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
**uploaded into Drive first**, or the sync would have nothing to publish. Missing required folders, duplicate titles within a department/category, and unreadable PDFs fail the run before any commit. A safety guard also refuses to wipe an entire populated category to empty. Deleting an individual PDF removes its listing; cached PDF URLs are retained.

To migrate a category without losing the current descriptions:
1. Upload the existing PDFs into the matching Drive folders.
2. **Name them with the same titles** currently shown on the site — the sync
   carries over the existing description/topic/issue/URL by matching the Drive file ID, or the title and department for an existing file that has not been synced with an ID yet.
3. Trigger a **dry run** first (Actions tab → "Drive content sync" → Run workflow →
   tick *dry_run*) and read the log to confirm the counts look right.
4. Run it for real (untick dry_run). It commits and Vercel deploys.

## Running locally (optional)

```bash
gcloud auth application-default login   # one-time, as escpaisadmin@gmail.com
cd ops/drive-sync && npm install
python3 -m pip install -r requirements.txt
# Also install qpdf (brew install qpdf on macOS; apt-get install qpdf on Linux).
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

## Scheduling and recovery

The Action is active on the default branch. It requests runs at minutes 7, 22,
37 and 52; GitHub can delay or drop scheduled jobs, so 15 minutes is not a
publishing guarantee. Vercel deployment follows a successful content commit.
An unchanged library produces no deployment. A heartbeat commit after 30 days
without repository commits prevents the ordinary 60-day inactivity shutdown of
public-repository schedules. This does not prevent authentication, service,
quota, or manually disabled-workflow failures.

For urgent publishing, open the repository's **Actions → Drive content sync →
Run workflow** with `dry_run` off. For troubleshooting, use `dry_run` first and
inspect the source folders and counts. A failed run does not commit partial
content. Restore a renamed folder or fix the named PDF, then rerun.

Verification: `node --test ops/drive-sync/sources.test.mjs`,
`node ops/drive-sync/sync.mjs --self-test`, `npm run lint`, `npm run build`, and a
successful authenticated Drive run with the expected content counts.

## Later: department-head authoring guide

Requested by Max on 9 October 2026; prepare later, not part of the folder setup.
Create a detailed guide to producing good AIS research: topic selection, original
analysis, primary sources and clickable citations, fact-checking, authorship and
review, charts, writing/design standards, PDF export, and the publishing checklist.
The current Drive guide only explains the immediate upload workflow.
