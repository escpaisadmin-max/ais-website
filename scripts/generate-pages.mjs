import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { getHeadTags, siteOrigin, sitePages } from "../src/data/pageMetadata.js";
import { libraries, textPath } from "../src/lib/publications.js";

// Server bundle from `vite build --ssr src/entry-server.jsx` (see package.json).
const { render } = await import("../dist-ssr/entry-server.js");

const template = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
assert(template.includes("<!-- ais:metadata -->"), "Build the Vite HTML template before generating route pages.");
assert(template.includes('<div id="root"></div>'), "The HTML template needs an empty #root to prerender into.");
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const scriptJson = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");

function renderTags(path) {
  return getHeadTags(path).map(({ tag, text, ...attributes }) => {
    const attrs = Object.entries(attributes).map(([name, value]) => ` ${name}="${escape(value)}"`).join("");
    const open = `<${tag} data-ais-meta${attrs}>`;
    if (!text) return open;
    return `${open}${tag === "script" ? text.replaceAll("<", "\\u003c") : escape(text)}</${tag}>`;
  }).join("\n    ");
}

async function publicationText(page) {
  if (!page.publication) return null;
  const url = textPath(page.publication.libraryKey, page.publication.item.id);
  try {
    const data = JSON.parse(await readFile(new URL(`../public${url}`, import.meta.url), "utf8"));
    return { url, author: data.author || "", pages: data.pages || [] };
  } catch {
    console.warn(`No text version for ${page.path} (expected public${url}); the page will load it in the browser.`);
    return null;
  }
}

const thin = [];
for (const page of sitePages) {
  const text = await publicationText(page);
  const body = render(page.path, { publicationText: text });
  const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  if (words < 80) thin.push(`${page.path} (${words} words)`);
  let html = template
    .replace(/<!-- ais:metadata -->[\s\S]*?<!-- \/ais:metadata -->/, renderTags(page.path))
    .replace('<div id="root"></div>', `<div id="root">${body}</div>${text ? `\n    <script type="application/json" id="ais-publication-text">${scriptJson(text)}</script>` : ""}`);
  if (page.path === "/") {
    html = html.replace("</head>", '  <link rel="preload" as="image" href="/london-skyline.avif" type="image/avif" fetchpriority="high" />\n  </head>');
  }
  const output = new URL(`../dist${page.path === "/" ? "/index" : page.path}.html`, import.meta.url);
  await mkdir(dirname(fileURLToPath(output)), { recursive: true });
  await writeFile(output, html);
}

// Custom 404: static fallback content, replaced by the app once it loads.
const notFound = template
  .replace(/<!-- ais:metadata -->[\s\S]*?<!-- \/ais:metadata -->/, renderTags("/404"))
  .replace('<div id="root"></div>', `<div id="root"><main style="min-height:100vh;display:grid;place-content:center;text-align:center;background:#1E3360;color:white;font-family:Arial,sans-serif;padding:2rem"><h1>404 — Page not found</h1><p>The page you're looking for doesn't exist.</p><p><a href="/" style="color:#B7C8E8">Back to AIS home</a></p></main></div>`);
await writeFile(new URL("../dist/404.html", import.meta.url), notFound);

// llms.txt: a plain text map of the site for AI assistants (https://llmstxt.org).
const section = (title, pages) => [`## ${title}`, "", ...pages.map((p) => `- [${p.title.replace(/ \| AIS$/, "")}](${siteOrigin}${p.path}): ${p.description}`), ""];
const byLibrary = (key) => sitePages.filter((p) => p.publication?.libraryKey === key && !p.canonicalPath);
const llms = [
  "# ESCP Alternative Investment Society (AIS)",
  "",
  "> Student society at ESCP Business School focused on alternative investments: private equity, venture capital, hedge funds, real estate, private credit and infrastructure. AIS publishes educational presentations, newsletters and the ESCP Founder Report, and runs events with industry professionals.",
  "",
  "Every publication page includes a full text version of its PDF.",
  "",
  ...section("Main pages", sitePages.filter((p) => !p.publication && !p.path.startsWith("/events/") && !["/privacy-policy", "/impressum"].includes(p.path))),
  ...section("Founder Reports", byLibrary("founderReports")),
  ...section("Educational presentations", byLibrary("presentations")),
  ...section("Newsletters", byLibrary("newsletters")),
  ...section("Events", sitePages.filter((p) => p.path.startsWith("/events/"))),
  "## Optional",
  "",
  `- [Privacy Policy](${siteOrigin}/privacy-policy)`,
  `- [Legal notice](${siteOrigin}/impressum)`,
  "",
].join("\n");
await writeFile(new URL("../dist/llms.txt", import.meta.url), llms);

console.log(`Prerendered ${sitePages.length} routes, a custom 404 page and llms.txt.`);
if (thin.length) console.warn(`Pages with under 80 words of prerendered text: ${thin.join(", ")}`);
assert.equal(Object.keys(libraries).length, 3);
