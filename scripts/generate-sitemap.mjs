import { writeFile } from "node:fs/promises";
import { navLinks } from "../src/data/siteConfig.js";
import { presentations } from "../src/data/presentations.js";
import { newsletters } from "../src/data/newsletters.js";
import { founderReports } from "../src/data/founderReports.js";
import { events } from "../src/data/events.js";

const origin = "https://www.escpais.com";
const paths = [
  ...navLinks.map(({ path }) => path),
  "/privacy-policy",
  "/impressum",
  ...presentations.map(({ id }) => `/presentations/${encodeURIComponent(id)}`),
  ...newsletters.map(({ id }) => `/newsletters/${encodeURIComponent(id)}`),
  ...founderReports.map(({ id }) => `/founder-report/${encodeURIComponent(id)}`),
  ...events.map(({ slug }) => `/events/${encodeURIComponent(slug)}`),
];

const urls = [...new Set(paths)].map((path) =>
  `  <url><loc>${origin}${path.replaceAll("&", "&amp;")}</loc></url>`
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
