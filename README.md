# escpais.com

Website of the ESCP Alternative Investment Society (AIS): React 19, Vite, Tailwind CSS v4, hosted on Vercel. Publications and events sync automatically from Google Drive.

> **Campus Life rule.** Any change to how the site describes AIS (society description, divisions, recruitment and selectivity, newsletter signup, main section URLs, branding) must also be made on the ESCP Campus Life page in the same piece of work. How and where: [`docs/campus-life.md`](docs/campus-life.md).

## Where to start

- [`HOUSEKEEPING.md`](HOUSEKEEPING.md): how content gets onto the site, file conventions, build and deploy.
- [`docs/campus-life.md`](docs/campus-life.md): the ESCP Campus Life pages that mirror this site, and how to edit them.
- [`docs/seo-follow-ups.md`](docs/seo-follow-ups.md): open search and AI visibility work.
- [`ops/drive-sync/README.md`](ops/drive-sync/README.md): the Google Drive sync.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # production build and prerendered pages in dist/
npm run lint
node scripts/check-publications.mjs --live   # publication hosting check
```

## Handover checklist

When a new person takes over the website, make sure they have:

1. Push access to this repository and access to the Vercel project.
2. Edit access to the "AIS Website Content" folder in Google Drive.
3. Officer rights on the AIS group(s) on ESCP Campus Life (see `docs/campus-life.md`).
4. Access to PostHog (EU) and Google Search Console for escpais.com.
5. Read this README, `HOUSEKEEPING.md` and `docs/campus-life.md`.
