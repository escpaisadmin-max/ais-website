# Notes for coding agents

Read `README.md` and `HOUSEKEEPING.md` before changing anything.

## Campus Life rule (always applies)

Any change to how the site describes AIS must also be made on ESCP Campus Life in the same task. That covers the society description, divisions, recruitment and selectivity wording, newsletter signup, main section URLs and branding. Follow `docs/campus-life.md` for which pages, how to edit them and how to log the change. If you can't reach Campus Life (no browser, no officer login), say so explicitly at the end of the task and list the exact text that still needs to go there. Never report the work as done while Campus Life is out of date.

## Other rules

- `src/data/presentations.js`, `newsletters.js`, `founderReports.js` and `events.js` are generated from Google Drive. Don't edit them by hand.
- Run `npm run lint`, `npm run build` and `node scripts/check-publications.mjs` before opening a pull request.
