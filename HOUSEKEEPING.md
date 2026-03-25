# AIS Website — Housekeeping Guide

This document is for future Claude Code sessions (or any developer) working on this repo. It covers the content workflow, file conventions, and how to add new material.

---

## Project Overview

- **Stack:** React 19 + Vite + Tailwind CSS v4 + Framer Motion + react-pdf
- **Hosting:** Netlify (SPA with `_redirects` for client-side routing)
- **Content approach:** All content is hardcoded in JS data files in `src/data/`. No CMS — future board members edit source files directly.
- **Brand font:** Georgia (serif). Brand colors defined as Tailwind `@theme` variables in `src/styles/index.css`.

---

## Adding New Presentations

1. Get the final PPTX or PDF from the division.
2. If PPTX only, convert to PDF: `soffice --headless --convert-to pdf --outdir public/presentations/pdf/ "file.pptx"`
3. Rename using the convention: `{dept}-{number}-{short-title}.pdf`
   - Departments: `pe`, `vc`, `hf`, `re`
   - Example: `pe-06-distressed-debt.pdf`
4. Place the PDF in `public/presentations/pdf/`.
5. Add an entry to `src/data/presentations.js` with all fields filled in.
6. Delete any working files (PPTX sources, outlines, drafts, task managers, docx files). Only final PDFs belong in the repo.

**What to discard when processing a division's folder:**
- PPTX source files (once PDF exists)
- LinkedIn cover slides (`*_Cover_*.pptx`)
- Outlines, feedback notes, task managers (`.docx`, `.xlsx`)
- Draft versions (anything not `vF` or clearly the final)
- Third-party reference PDFs (interview guides, external resources)
- Corrupt/placeholder files (check file size — anything under 1KB is suspicious)

---

## Adding New Newsletters

1. Get the final DOCX or PDF from the division.
2. If DOCX, convert to PDF: `soffice --headless --convert-to pdf --outdir public/newsletters/pdf/ "file.docx"`
3. Rename using the convention: `{dept}-{issue number}-{short-title}.pdf`
   - Example: `re-24-logistics.pdf`
4. Place the PDF in `public/newsletters/pdf/`.
5. Add an entry to `src/data/newsletters.js` with all fields filled in.
6. To determine the issue number, department, and title: read the first page of the PDF. Newsletters always start with `Newsletter (N) - Title` and mention the department.

**Getting page counts (batch):**
```bash
python3 -c "
from PyPDF2 import PdfReader
import os
for f in sorted(os.listdir('public/newsletters/pdf')):
    if f.endswith('.pdf'):
        r = PdfReader(f'public/newsletters/pdf/{f}')
        print(f'{f}: {len(r.pages)} pages')
"
```

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

## Adding New Events

1. Save event photos to `public/events/`.
2. Ensure the partner logo exists in `public/logos/`.
3. Add an entry to `src/data/events.js` with all fields.
4. The `slug` field is used in the URL: `/events/{slug}`.

---

## Key Files Reference

| File | Purpose |
|---|---|
| `src/data/team.js` | Team members, photos, roles, LinkedIn |
| `src/data/presentations.js` | Presentation library entries |
| `src/data/newsletters.js` | Newsletter library entries |
| `src/data/events.js` | Event cards and detail pages |
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

Netlify auto-deploys from the `main` branch. The `_redirects` file in `public/` handles SPA routing.

---

## Working Directory Note

The project directory has a trailing space in its name (`AIS website `). The `Read` and `Edit` tools may fail with absolute paths. Use `Bash` with relative paths from within the `ais-website/` directory, or `cd` into it first.

---

## Git Conventions

- Commit messages should be concise and describe the change.
- Do not commit `node_modules/`, `dist/`, or `.DS_Store` (covered by `.gitignore`).
- Do not commit working files (PPTX, DOCX, XLSX, outlines, drafts). Only final PDFs.
- Remote: `origin` → `https://github.com/escpaisadmin-max/ais-website`
