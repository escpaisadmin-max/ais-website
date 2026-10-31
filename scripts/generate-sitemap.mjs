import { writeFile } from "node:fs/promises";
import { siteOrigin, sitePages } from "../src/data/pageMetadata.js";
import { isoDate } from "../src/lib/publications.js";

// Every public HTML page, including one page per publication. The PDFs themselves are
// left out: each PDF names its publication page as canonical (see vercel.json).
const urls = sitePages.filter((page) => !page.canonicalPath).map((page) => {
  const lastmod = page.publication ? isoDate(page.publication.item.date) : null;
  return `  <url><loc>${siteOrigin}${page.path.replaceAll("&", "&amp;")}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;
});
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  "</urlset>",
  "",
].join("\n");

await writeFile(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`Generated sitemap with ${urls.length} URLs.`);
