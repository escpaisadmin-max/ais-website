/**
 * Drive → website sync entry point.
 *
 *   node sync.mjs            real run (reads Drive, writes data files + PDFs)
 *   node sync.mjs --dry-run  read Drive + log what would change, write nothing
 *   node sync.mjs --self-test offline tests of parsing/generation (no network)
 *
 * Auth: Application Default Credentials (WIF in CI; `gcloud auth
 * application-default login` locally).
 */
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";
import { PDFDocument } from "pdf-lib";

import {
  ROOT_FOLDER_ID, DEPARTMENTS, PDF_CATEGORIES, EVENTS_CONFIG, IMAGE_MIMES,
} from "./config.mjs";
import {
  getDrive, listChildren, findFolder, isFolder, fetchAsPdf, fetchBinary,
} from "./drive.mjs";
import { parseFilename, stripExt, slugify, titleKey } from "./parse.mjs";
import { loadExisting, indexByTitle, renderDataFile } from "./generate.mjs";

const DRY_RUN = process.argv.includes("--dry-run");
const SELF_TEST = process.argv.includes("--self-test");
const log = (...a) => console.log(...a);
const warn = (...a) => console.warn("⚠ ", ...a);

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function pdfPageCount(buffer) {
  try {
    const doc = await PDFDocument.load(buffer, { updateMetadata: false });
    return doc.getPageCount();
  } catch {
    return 0;
  }
}

/** Make a unique id within a category. */
function uniqueId(base, used) {
  let id = base || "item";
  let n = 2;
  while (used.has(id)) id = `${base}-${n++}`;
  used.add(id);
  return id;
}

/** Build a sidecar-description map: basename(lower) → text file's content. */
async function readSidecars(drive, files) {
  const map = new Map();
  const txts = files.filter((f) => /\.txt$/i.test(f.name));
  for (const f of txts) {
    const buf = await fetchBinary(drive, f);
    map.set(stripExt(f.name).toLowerCase(), buf.toString("utf8").trim());
  }
  return map;
}

/** Process one PDF-library category. Returns { wrote, count } and queues PDF writes. */
async function syncPdfCategory(drive, cat) {
  const root = await findFolder(drive, ROOT_FOLDER_ID, cat.folderName);
  if (!root) {
    warn(`folder "${cat.folderName}" not found in Drive; skipping ${cat.key}`);
    return { skipped: true };
  }

  const existing = await loadExisting(cat.dataFile, cat.exportName);
  const byTitle = indexByTitle(existing);
  const usedIds = new Set();
  const records = []; // { entry, sortDate, buffer, pdfFilename }

  // Gather source folders: department sub-folders, or the category folder itself.
  const sources = [];
  if (cat.byDepartment) {
    for (const [folderName, deptKey] of Object.entries(DEPARTMENTS)) {
      const sub = await findFolder(drive, root.id, folderName);
      if (sub) sources.push({ folderId: sub.id, dept: deptKey });
    }
  } else {
    sources.push({ folderId: root.id, dept: null });
  }

  for (const src of sources) {
    const children = await listChildren(drive, src.folderId);
    const sidecars = await readSidecars(drive, children);
    const docs = children.filter(
      (f) => !isFolder(f) && (f.mimeType === "application/pdf" || f.mimeType.startsWith("application/vnd.google-apps."))
        && !/\.txt$/i.test(f.name)
    );

    for (const f of docs) {
      let buffer;
      try {
        buffer = await fetchAsPdf(drive, f);
      } catch (e) {
        warn(`could not fetch ${f.name}: ${e.message}`);
        continue;
      }
      const { title, displayDate, sortDate } = parseFilename(f.name, f.createdTime);
      const prev = byTitle.get(titleKey(title));
      const idBase = prev?.id || (src.dept ? `${src.dept}-${slugify(title)}` : slugify(title));
      const id = uniqueId(idBase, usedIds);
      const pageCount = await pdfPageCount(buffer);
      const description = prev?.description ?? sidecars.get(stripExt(f.name).toLowerCase()) ?? "";

      const entry = { id, title };
      if (src.dept) entry.department = src.dept;
      if (cat.key !== "founderReports") entry.topic = prev?.topic ?? "";
      Object.assign(entry, {
        date: displayDate || prev?.date || "",
        description,
        pdfPath: `${cat.pdfUrlBase}/${id}.pdf`,
        pageCount,
      });
      if (cat.key === "newsletters" && prev?.issue != null) entry.issue = prev.issue;

      records.push({ entry, sortDate, buffer, pdfFilename: `${id}.pdf` });
    }
  }

  // Newsletters: assign issue numbers (carry-over preserved; new ones continue the count).
  if (cat.key === "newsletters") {
    let maxIssue = Math.max(0, ...records.map((r) => r.entry.issue || 0));
    records
      .filter((r) => r.entry.issue == null)
      .sort((a, b) => a.sortDate - b.sortDate)
      .forEach((r) => { r.entry.issue = ++maxIssue; });
  }

  // Order newest-first for a tidy file (runtime sorts independently anyway).
  records.sort((a, b) => b.sortDate - a.sortDate);
  const entries = records.map((r) => r.entry);

  // Safety guard: never wipe a populated category to empty.
  if (entries.length === 0 && existing.length > 0) {
    warn(`${cat.key}: Drive returned 0 files but ${existing.length} exist — refusing to wipe. Skipping.`);
    return { skipped: true };
  }

  log(`  ${cat.key}: ${entries.length} item(s) (was ${existing.length})`);
  if (DRY_RUN) return { dryRun: true, count: entries.length };

  // Write PDFs, then the data file.
  await ensureDir(cat.pdfDir);
  for (const r of records) {
    await fs.writeFile(path.join(cat.pdfDir, r.pdfFilename), r.buffer);
  }
  await fs.writeFile(
    cat.dataFile,
    renderDataFile({ exportName: cat.exportName, folderName: cat.folderName, entries })
  );
  return { wrote: true, count: entries.length };
}

/** Process the Events folder (one sub-folder per event; optional event.json). */
async function syncEvents(drive) {
  const cfg = EVENTS_CONFIG;
  const root = await findFolder(drive, ROOT_FOLDER_ID, cfg.folderName);
  if (!root) { warn(`"${cfg.folderName}" folder not found; skipping events`); return { skipped: true }; }

  const existing = await loadExisting(cfg.dataFile, cfg.exportName);
  const bySlug = new Map(existing.map((e) => [e.slug, e]));
  const eventFolders = (await listChildren(drive, root.id)).filter(isFolder);

  const entries = [];
  const photoWrites = []; // { dir, name, buffer }

  for (const folder of eventFolders) {
    const slug = slugify(folder.name);
    const prev = bySlug.get(slug) || {};
    const children = await listChildren(drive, folder.id);

    // metadata file (event.json) is the source for editorial fields
    let meta = {};
    const metaFile = children.find((f) => /^event\.json$/i.test(f.name));
    if (metaFile) {
      try { meta = JSON.parse((await fetchBinary(drive, metaFile)).toString("utf8")); }
      catch (e) { warn(`bad event.json in ${folder.name}: ${e.message}`); }
    }

    // images: a "banner.*" becomes the hero photo; the rest become the gallery
    const images = children.filter((f) => IMAGE_MIMES.has(f.mimeType));
    const eventPhotoDir = path.join(cfg.photoDir, slug);
    const photos = [];
    let photo = prev.photo ?? null;
    for (const img of images) {
      const isBanner = /^banner\./i.test(img.name);
      const safe = `${slugify(stripExt(img.name)) || "photo"}${path.extname(img.name)}`;
      const url = `${cfg.photoUrlBase}/${slug}/${safe}`;
      photoWrites.push({ dir: eventPhotoDir, name: safe, file: img });
      if (isBanner) photo = url; else photos.push(url);
    }

    entries.push({
      slug,
      title: meta.title ?? prev.title ?? folder.name,
      date: meta.date ?? prev.date ?? "",
      partnerLogo: meta.partnerLogo ?? prev.partnerLogo ?? null,
      partnerName: meta.partnerName ?? prev.partnerName ?? "",
      partnerUrl: meta.partnerUrl ?? prev.partnerUrl,
      description: meta.description ?? prev.description ?? "",
      fullDescription: meta.fullDescription ?? prev.fullDescription ?? "",
      photo,
      bannerLogo: meta.bannerLogo ?? prev.bannerLogo,
      photos: photos.length ? photos : (prev.photos ?? []),
      division: meta.division ?? prev.division ?? "general",
      type: meta.type ?? prev.type ?? "speaker",
      keyTakeaways: meta.keyTakeaways ?? prev.keyTakeaways ?? [],
    });
  }

  if (entries.length === 0 && existing.length > 0) {
    warn(`events: Drive returned 0 events but ${existing.length} exist — refusing to wipe. Skipping.`);
    return { skipped: true };
  }

  log(`  events: ${entries.length} event(s) (was ${existing.length})`);
  if (DRY_RUN) return { dryRun: true, count: entries.length };

  for (const w of photoWrites) {
    await ensureDir(w.dir);
    await fs.writeFile(path.join(w.dir, w.name), await fetchBinary(drive, w.file));
  }
  await fs.writeFile(
    cfg.dataFile,
    renderDataFile({ exportName: cfg.exportName, folderName: cfg.folderName, entries })
  );
  return { wrote: true, count: entries.length };
}

async function selfTest() {
  const assert = (cond, msg) => { if (!cond) { throw new Error(`self-test FAIL: ${msg}`); } };

  let p = parseFilename("2025-02 Guide to LBO Modeling.pdf");
  assert(p.title === "Guide to LBO Modeling", `title was "${p.title}"`);
  assert(p.displayDate === "February 2025", `date was "${p.displayDate}"`);

  p = parseFilename("2026-Q1 Founder Report.pdf");
  assert(p.displayDate === "Q1 2026", `q-date was "${p.displayDate}"`);

  p = parseFilename("2025 Founder Report.pdf");
  assert(p.displayDate === "2025" && p.title === "Founder Report", `year-only parse: ${JSON.stringify(p)}`);

  p = parseFilename("No Date Title.pdf", "2026-03-01T00:00:00Z");
  assert(p.title === "No Date Title" && p.displayDate === "", "no-date fallback");

  assert(slugify("Guide to LBO Modeling!") === "guide-to-lbo-modeling", "slugify");

  // render → import round-trip
  const entries = [{ id: "pe-x", title: "T", department: "pe", topic: "", date: "March 2025", description: "d", pdfPath: "/x.pdf", pageCount: 3 }];
  const out = renderDataFile({ exportName: "presentations", folderName: "EDUs", entries });
  assert(out.includes("AUTO-GENERATED"), "banner present");
  const tmp = path.join(os.tmpdir(), `dst-${Date.now()}.mjs`);
  await fs.writeFile(tmp, out);
  const mod = await import(pathToFileURL(tmp).href);
  assert(Array.isArray(mod.presentations) && mod.presentations[0].id === "pe-x", "round-trip import");
  await fs.rm(tmp);

  log("✓ self-test passed");
}

async function main() {
  if (SELF_TEST) return selfTest();

  log(`Drive sync starting${DRY_RUN ? " (DRY RUN)" : ""}…`);
  const drive = await getDrive();
  for (const cat of PDF_CATEGORIES) {
    await syncPdfCategory(drive, cat);
  }
  await syncEvents(drive);
  log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
