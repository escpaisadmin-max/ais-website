import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { getHeadTags, sitePages } from "../src/data/pageMetadata.js";

const template = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
assert(template.includes("<!-- ais:metadata -->"), "Build the Vite HTML template before generating route pages.");
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function renderTags(path) {
  return getHeadTags(path).map(({ tag, text, ...attributes }) => {
    const attrs = Object.entries(attributes).map(([name, value]) => ` ${name}="${escape(value)}"`).join("");
    const open = `<${tag} data-ais-meta${attrs}>`;
    if (!text) return open;
    return `${open}${tag === "script" ? text.replaceAll("<", "\\u003c") : escape(text)}</${tag}>`;
  }).join("\n    ");
}

for (const path of [...sitePages.map((page) => page.path), "/404"]) {
  let html = template.replace(/<!-- ais:metadata -->[\s\S]*?<!-- \/ais:metadata -->/, renderTags(path));
  if (path === "/404") {
    html = html.replace('<div id="root"></div>', `<div id="root"><main style="min-height:100vh;display:grid;place-content:center;text-align:center;background:#1E3360;color:white;font-family:Arial,sans-serif;padding:2rem"><h1>404 — Page not found</h1><p>The page you're looking for doesn't exist.</p><p><a href="/" style="color:#B7C8E8">Back to AIS home</a></p></main></div>`);
  }
  const output = new URL(`../dist${path === "/" ? "/index" : path}.html`, import.meta.url);
  await mkdir(dirname(fileURLToPath(output)), { recursive: true });
  await writeFile(output, html);
}
console.log(`Generated metadata HTML for ${sitePages.length} public routes and a custom 404 page.`);
