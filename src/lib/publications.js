// One place for the three PDF libraries: data, URLs and numbering.
import { presentations } from "../data/presentations.js";
import { newsletters } from "../data/newsletters.js";
import { founderReports } from "../data/founderReports.js";
import { publicationDepartments } from "../data/divisions.js";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const libraries = {
  presentations: {
    key: "presentations",
    items: presentations,
    route: "/presentations",
    folder: "presentations",
    listLabel: "Publications",
    pluralLabel: "publications",
    kindLabel: "Educational presentation",
    goalType: "presentation",
  },
  newsletters: {
    key: "newsletters",
    items: newsletters,
    route: "/newsletters",
    folder: "newsletters",
    listLabel: "Newsletters",
    pluralLabel: "newsletters",
    kindLabel: "Newsletter",
    goalType: "newsletter",
  },
  founderReports: {
    key: "founderReports",
    items: founderReports,
    route: "/founder-report",
    folder: "founder-reports",
    listLabel: "Founder Report",
    pluralLabel: "Founder Reports",
    kindLabel: "Founder Report",
    goalType: "founder_report",
  },
};

/** "March 2026" -> Date, "Q2 2026" -> Date, "2025" -> Date; unknown -> epoch. */
export function parseDisplayDate(value = "") {
  const text = String(value).trim();
  let m = text.match(/^([A-Za-z]+) (\d{4})$/);
  if (m && MONTHS.includes(m[1])) return new Date(Date.UTC(Number(m[2]), MONTHS.indexOf(m[1]), 1));
  m = text.match(/^Q([1-4]) (\d{4})$/);
  if (m) return new Date(Date.UTC(Number(m[2]), (Number(m[1]) - 1) * 3, 1));
  m = text.match(/^(\d{4})$/);
  if (m) return new Date(Date.UTC(Number(m[1]), 0, 1));
  return null;
}

/** ISO date (YYYY-MM or YYYY) matching the precision of the display date. */
export function isoDate(value = "") {
  const date = parseDisplayDate(value);
  if (!date) return null;
  if (/^\d{4}$/.test(String(value).trim())) return String(date.getUTCFullYear());
  return date.toISOString().slice(0, 7);
}

/** Edu numbers count up by date; same month ties break by id (matches the list page). */
export const eduNumbers = new Map(
  [...presentations]
    .sort((a, b) => (parseDisplayDate(a.date) || 0) - (parseDisplayDate(b.date) || 0) || b.id.localeCompare(a.id))
    .map((item, index) => [item.id, index + 1]),
);

export function publicationPath(libraryKey, id) {
  return `${libraries[libraryKey].route}/${encodeURIComponent(id)}`;
}

export function textPath(libraryKey, id) {
  return `/${libraries[libraryKey].folder}/text/${encodeURIComponent(id)}.json`;
}

export function findPublication(libraryKey, id) {
  return libraries[libraryKey]?.items.find((item) => item.id === id) || null;
}

export function divisionFor(item) {
  return publicationDepartments.find((division) => division.id === item.department) || null;
}

export function allPublications() {
  return Object.values(libraries).flatMap((library) =>
    library.items.map((item) => ({ library: library.key, item })),
  );
}
