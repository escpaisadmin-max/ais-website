/**
 * Filename / metadata parsing helpers.
 *
 * Naming convention for dropped files (see README):
 *   "YYYY-MM Title.pdf"        e.g. "2025-02 Guide to LBO Modeling.pdf"
 *   "YYYY Title.pdf"           e.g. "2025 Founder Report.pdf"
 *   "YYYY-Qn Title.pdf"        e.g. "2026-Q1 Founder Report.pdf"
 * The leading date token is optional; if absent we fall back to the file's
 * Drive createdTime for ordering and leave the display date blank-ish.
 */
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Strip a trailing extension (".pdf", ".docx", …). */
export function stripExt(name) {
  return name.replace(/\.[a-z0-9]+$/i, "");
}

/** kebab-case slug for ids / filenames. */
export function slugify(s) {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Normalised title key for matching against existing entries (carry-over). */
export function titleKey(s) {
  return (s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/**
 * Parse "YYYY-MM Title", "YYYY-Qn Title", "YYYY Title" or "Title".
 * Returns { title, displayDate, sortDate } — sortDate is a JS Date for ordering.
 */
export function parseFilename(rawName, fallbackIso) {
  const base = stripExt(rawName).trim();
  const m = base.match(/^(\d{4})(?:[-_ ](\d{2})|[-_ ](Q[1-4]))?\s*[-–—.]?\s*(.*)$/i);

  if (m && m[1]) {
    const year = Number(m[1]);
    const month = m[2] ? Number(m[2]) : null; // 1-12
    const quarter = m[3] ? Number(m[3].slice(1)) : null; // 1-4
    const title = (m[4] || "").trim() || base;

    let displayDate;
    let sortMonth = 0;
    if (month) {
      displayDate = `${MONTHS[month - 1]} ${year}`;
      sortMonth = month - 1;
    } else if (quarter) {
      displayDate = `Q${quarter} ${year}`;
      sortMonth = (quarter - 1) * 3;
    } else {
      displayDate = String(year);
      sortMonth = 0;
    }
    return { title, displayDate, sortDate: new Date(year, sortMonth, 1) };
  }

  // No date prefix → use Drive createdTime for ordering, blank display date.
  const sortDate = fallbackIso ? new Date(fallbackIso) : new Date(0);
  return { title: base, displayDate: "", sortDate };
}

export { MONTHS };
