# AIS Website — Housekeeping Guide

This document is for future Claude Code sessions (or any developer) working on this repo. It covers the content workflow, file conventions, and how to add new material.

---

## Project Overview

- **Stack:** React 19 + Vite + Tailwind CSS v4 + Framer Motion + react-pdf
- **Hosting:** Vercel (SPA with `vercel.json` rewrites for client-side routing)
- **Content approach:** EDUs, Newsletters, Founder Reports, and Events are managed in **Google Drive** and auto-published (see next section). Team, partner logos, stats, divisions, and site config are still hand-edited in `src/data/`.
- **Brand font:** Georgia (serif). Brand colors defined as Tailwind `@theme` variables in `src/styles/index.css`.

---

## Content via Google Drive (auto-sync)

EDUs, Newsletters, Founder Reports, and Events publish **automatically from Google Drive** — board members just drag files in; no code, no PDFs committed by hand.

**How it flows:** Drive → scheduled GitHub Action (`.github/workflows/drive-sync.yml`, every ~15 min, keyless auth via Workload Identity Federation) runs `ops/drive-sync/` → regenerates the data files + copies PDFs/photos into `public/` → commits → Vercel deploys.

> ⚠️ `src/data/presentations.js`, `newsletters.js`, `founderReports.js`, and `events.js` are now **AUTO-GENERATED** (each carries a "do not edit by hand" banner). Editing them directly does nothing useful — the next sync overwrites them. **Change content in Drive instead.**

**Drive folder** — "AIS Website Content", shared as Viewer with `drive-sync@ais-escp-website.iam.gserviceaccount.com`:
```
EDUs/  → PE, VC, HF, RE          Newsletters/  → PE, VC, HF, RE
Founder Reports/                  Events/  → one sub-folder per event
```

**Naming (PDF libraries):** `YYYY-MM Title.pdf` (e.g. `2025-02 Guide to LBO Modeling.pdf`); `YYYY-Qn`/`YYYY` also work for reports. Department = the sub-folder. Page count is read automatically. Google Slides/Docs can be dropped directly (auto-converted to PDF). An optional same-named `.txt` becomes the description.

**Events:** one sub-folder per event (folder name = URL slug) containing an `event.json` (title, date, partnerName, partnerUrl, division, type, description, fullDescription, keyTakeaways, bannerLogo) plus images — a `banner.*` image becomes the hero, the rest form the gallery. Rendering: a real `photo` is used as the hero if present; otherwise a navy→ocean gradient shows `bannerLogo` (or just the title). `partnerUrl` turns the "In partnership with …" line into a link.

**Operating it** (full detail in `ops/drive-sync/README.md`):
- Manual run: `gh workflow run drive-sync.yml -f dry_run=true` then `gh run watch <id>` (drop `dry_run` for a real run).
- Safety guard: the sync refuses to wipe a populated category to empty.
- Migrating existing content in: upload PDFs named with the **current site titles** so descriptions / issue numbers / URLs carry over automatically.

---

## Adding New Team Members

1. Save the headshot to `public/team/` with a URL-safe filename: `firstname-lastname.jpg` (no spaces).
2. Add the entry to `src/data/team.js` under the correct section:
   - `leadership` array for President, VP, Treasurer, Head of Events, etc.
   - `divisions.{pe|vc|hf|re}.members` array for division presidents and analysts
   - `adminStaff` array for operations roles
3. LinkedIn URLs and bios can be left empty (`""`) and filled in later.

**Important:** Never use filenames with spaces for photos — they break in some browsers due to URL encoding.

---

## Adding New Partner/Employer Logos

1. Save the logo (PNG or SVG, transparent background preferred) to `public/logos/`.
2. Add an entry to `src/data/partners.js`.
3. If this company had an event, set `eventSlug` to the event's slug so the logo links to the event detail page.

---

## Key Files Reference

| File | Purpose |
|---|---|
| `src/data/team.js` | Team members, photos, roles, LinkedIn |
| `src/data/presentations.js` | EDU library entries — **auto-generated from Drive** |
| `src/data/newsletters.js` | Newsletter library entries — **auto-generated from Drive** |
| `src/data/events.js` | Event cards/detail pages — **auto-generated from Drive** |
| `src/data/founderReports.js` | Founder Report entries — **auto-generated from Drive** |
| `ops/drive-sync/` | Drive→site sync script + its README |
| `.github/workflows/drive-sync.yml` | Scheduled sync workflow (keyless WIF) |
| `src/data/partners.js` | Scrolling logo banner on homepage |
| `src/data/stats.js` | Animated stat counters on homepage |
| `src/data/divisions.js` | Division names and descriptions |
| `src/data/siteConfig.js` | Nav links, social URLs, newsletter config |
| `src/styles/index.css` | Brand colors, base styles, animations |

---

## Build & Deploy

```bash
npm run dev      # Local dev server
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

Vercel auto-deploys from the connected Git branch. The `vercel.json` file handles SPA routing by rewriting all paths to `index.html`.

---

## Working Directory Note

The project directory has a trailing space in its name (`AIS website `). The `Read` and `Edit` tools may fail with absolute paths. Use `Bash` with relative paths from within the `ais-website/` directory, or `cd` into it first.

---

## Git Conventions

- Commit messages should be concise and describe the change.
- Do not commit `node_modules/`, `dist/`, or `.DS_Store` (covered by `.gitignore`).
- Do not commit working files (PPTX, DOCX, XLSX, outlines, drafts). Only final PDFs.
- Remote: `origin` → `https://github.com/escpaisadmin-max/ais-website`
