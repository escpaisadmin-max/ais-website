# Search Console data

`pull.mjs` copies Google Search Console data for escpais.com into the private Google Sheet
**AIS Search Console data** (Drive: AIS Website Content). The workflow
`.github/workflows/search-console.yml` runs it every Monday at 06:17 UTC, before the weekly
website audit; run it any time from the Actions tab ("Search Console data", Run workflow).

Tabs: Summary, Queries, Pages, Countries, Devices (last 28 complete days) and Daily (last 90 days)
are replaced on every run; History gets one row per run so trends survive.

Access, no keys anywhere:
- The workflow signs in keyless (Workload Identity Federation) as
  `drive-sync@ais-escp-website.iam.gserviceaccount.com`, the same account as the Drive sync.
- That account is a **Restricted** user of the escpais.com property in Search Console and an
  **Editor** of the one sheet. The Search Console API and Google Sheets API are enabled in the
  Google Cloud project `ais-escp-website`.
- The data is never committed: this repo is public.

ESCP Google accounts cannot open Search Console (blocked by ESCP's Workspace); use the
escpaisadmin account or a personal Google account to look at it directly.
