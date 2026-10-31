// Checks that every EDU, newsletter and Founder Report is hosted correctly.
//
//   node scripts/check-publications.mjs           repository checks (+ prerendered pages if dist/ exists)
//   node scripts/check-publications.mjs --live    also checks https://www.escpais.com
//   node scripts/check-publications.mjs --json    machine readable output
//
// Exit code 1 when there are errors (warnings alone exit 0). Used by the daily publication check task.
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { libraries, textPath, publicationPath } from "../src/lib/publications.js";
import { siteOrigin, sitePages } from "../src/data/pageMetadata.js";

const root = new URL("../", import.meta.url);
const live = process.argv.includes("--live");
const asJson = process.argv.includes("--json");
const file = (path) => new URL(`.${path}`, root);
const sha256 = (url) => createHash("sha256").update(readFileSync(url)).digest("hex");
const words = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
const titleKey = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const issues = [];
const add = (severity, library, id, problem, fix) => issues.push({ severity, library, id, problem, fix });
const sitemap = existsSync(file("/public/sitemap.xml")) ? readFileSync(file("/public/sitemap.xml"), "utf8") : "";
const hasDist = existsSync(file("/dist/index.html"));
const seenTitles = new Map();
let count = 0;

for (const library of Object.values(libraries)) {
  for (const item of library.items) {
    count += 1;
    const id = item.id;
    const page = sitePages.find((p) => p.path === publicationPath(library.key, id));

    if (!item.pdfPath || !existsSync(file(`/public${item.pdfPath}`))) add("error", library.key, id, `reading PDF missing (${item.pdfPath})`, "re-run the Drive sync workflow");
    if (item.downloadPath && !existsSync(file(`/public${item.downloadPath}`))) add("error", library.key, id, `download PDF missing (${item.downloadPath})`, "re-run the Drive sync workflow");

    const textUrl = file(`/public${textPath(library.key, id)}`);
    if (!existsSync(textUrl)) {
      add("error", library.key, id, "text version missing", "run python ops/drive-sync/extract_text.py and commit public/*/text");
    } else if (item.pdfPath && existsSync(file(`/public${item.pdfPath}`))) {
      const text = JSON.parse(readFileSync(textUrl, "utf8"));
      if (text.sha256 !== sha256(file(`/public${item.pdfPath}`))) add("error", library.key, id, "text version is stale (PDF changed)", "run python ops/drive-sync/extract_text.py and commit public/*/text");
      const chars = (text.pages || []).flat().join(" ").length;
      if (chars < 500) add("warning", library.key, id, `text version has only ${chars} characters (scanned or image only PDF?)`, "check the PDF; ask the author for a PDF with real text");
    }

    if (!item.description?.trim()) add("warning", library.key, id, "no description (no .txt file next to the PDF in Drive)", "write a 1 to 2 sentence description and save it in Drive as a .txt with the PDF's exact name");
    if (/_|\w- \S/.test(item.title)) add("warning", library.key, id, `title needs tidying: "${item.title}"`, "rename the file in Drive");
    if (!item.date) add("warning", library.key, id, "no date (file name lacks a YYYY-MM prefix)", "rename the file in Drive to start with YYYY-MM");
    if (!page) add("error", library.key, id, "no page metadata entry", "check src/data/pageMetadata.js");

    const key = titleKey(item.title);
    if (seenTitles.has(key)) add("warning", library.key, id, `same title as ${seenTitles.get(key)}`, "remove the duplicate file from Drive");
    else seenTitles.set(key, `${library.key}/${id}`);

    if (page && !page.canonicalPath && sitemap && !sitemap.includes(`${siteOrigin}${page.path}<`)) add("error", library.key, id, "missing from sitemap.xml", "run npm run build");

    if (hasDist && page) {
      const built = file(`/dist${page.path}.html`);
      if (!existsSync(built)) add("error", library.key, id, "no prerendered page in dist/", "run npm run build");
      else if (words(readFileSync(built, "utf8")) < 150) add("error", library.key, id, "prerendered page has under 150 words", "check the text version and the prerender");
    }

    if (live && page) {
      const url = `${siteOrigin}${page.path}`;
      try {
        const response = await fetch(url, { redirect: "manual" });
        const html = response.status === 200 ? await response.text() : "";
        if (response.status !== 200) add("error", library.key, id, `live page returns ${response.status}`, "check the latest Vercel deployment");
        else if (words(html) < 150) add("error", library.key, id, "live page has under 150 words of HTML text", "check the latest deployment and the prerender");
        const pdf = await fetch(`${siteOrigin}${item.pdfPath}`, { method: "HEAD" });
        if (pdf.status !== 200) add("error", library.key, id, `live PDF returns ${pdf.status}`, "check the deployment");
        else if (!(pdf.headers.get("link") || "").includes(page.path)) add("warning", library.key, id, "live PDF does not name its page as canonical", "check the Link headers in vercel.json");
      } catch (error) {
        add("error", library.key, id, `live check failed: ${error.message}`, "retry; check the site is up");
      }
    }
  }
  // Files left behind after a PDF was removed from Drive still answer at their old URL.
  const ids = new Set(library.items.map((item) => item.id));
  for (const sub of ["pdf", "originals", "text"]) {
    const dir = file(`/public/${library.folder}/${sub}/`);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      const id = name.replace(/\.(pdf|json)$/i, "");
      if (name !== id && !ids.has(id)) add("error", library.key, id, `public/${library.folder}/${sub}/${name} has no publication entry (removed from Drive?)`, "delete the leftover file (the Drive sync now does this)");
    }
  }
}

const errors = issues.filter((i) => i.severity === "error").length;
if (asJson) {
  console.log(JSON.stringify({ checked: count, live, prerendered: hasDist, errors, warnings: issues.length - errors, issues }, null, 2));
} else {
  console.log(`Checked ${count} publications${live ? " (with live site)" : ""}${hasDist ? " (with prerendered pages)" : ""}: ${errors} errors, ${issues.length - errors} warnings.`);
  for (const i of issues) console.log(`- [${i.severity}] ${i.library}/${i.id}: ${i.problem}. Fix: ${i.fix}.`);
}
process.exit(errors > 0 ? 1 : 0);
