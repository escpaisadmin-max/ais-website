import { writeFile } from "node:fs/promises";
import { siteOrigin, sitePages } from "../src/data/pageMetadata.js";

const urls = [...new Set(sitePages.map(({ path }) => path))].map((path) =>
  `  <url><loc>${siteOrigin}${path.replaceAll("&", "&amp;")}</loc></url>`
);
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  "</urlset>",
  "",
].join("\n");

await writeFile(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`Generated sitemap with ${urls.length} URLs.`);
