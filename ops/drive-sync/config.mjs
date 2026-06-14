/**
 * Central configuration for the Drive → website sync.
 *
 * The only Drive identifier we hardcode is the ROOT folder ID ("AIS Website
 * Content"). Sub-folders (EDUs/PE, Newsletters/…, Founder Reports, Events) are
 * discovered by name at runtime, so renaming/restructuring is forgiving.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// repo root = two levels up from ops/drive-sync
export const REPO_ROOT = path.resolve(__dirname, "..", "..");
export const PUBLIC_DIR = path.join(REPO_ROOT, "public");
export const DATA_DIR = path.join(REPO_ROOT, "src", "data");

export const ROOT_FOLDER_ID = "1gIGmUrMXPJitLj4kPlDwRvvpWZyJHhkw";

// Department sub-folder names → division keys used across the site.
export const DEPARTMENTS = { PE: "pe", VC: "vc", HF: "hf", RE: "re" };

/**
 * Each PDF-library category: which top folder to read, where to write the data
 * file + PDFs, and whether it is split into department sub-folders.
 */
export const PDF_CATEGORIES = [
  {
    key: "presentations",
    folderName: "EDUs",
    byDepartment: true,
    exportName: "presentations",
    dataFile: path.join(DATA_DIR, "presentations.js"),
    pdfDir: path.join(PUBLIC_DIR, "presentations", "pdf"),
    pdfUrlBase: "/presentations/pdf",
  },
  {
    key: "newsletters",
    folderName: "Newsletters",
    byDepartment: true,
    exportName: "newsletters",
    dataFile: path.join(DATA_DIR, "newsletters.js"),
    pdfDir: path.join(PUBLIC_DIR, "newsletters", "pdf"),
    pdfUrlBase: "/newsletters/pdf",
  },
  {
    key: "founderReports",
    folderName: "Founder Reports",
    byDepartment: false,
    exportName: "founderReports",
    dataFile: path.join(DATA_DIR, "founderReports.js"),
    pdfDir: path.join(PUBLIC_DIR, "founder-reports", "pdf"),
    pdfUrlBase: "/founder-reports/pdf",
  },
];

export const EVENTS_CONFIG = {
  folderName: "Events",
  exportName: "events",
  dataFile: path.join(DATA_DIR, "events.js"),
  photoDir: path.join(PUBLIC_DIR, "events"),
  photoUrlBase: "/events",
};

export const DRIVE_SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

// MIME types of Google-native files that must be exported to PDF.
export const GOOGLE_PDF_EXPORTABLE = new Set([
  "application/vnd.google-apps.document",
  "application/vnd.google-apps.presentation",
  "application/vnd.google-apps.spreadsheet",
]);
export const FOLDER_MIME = "application/vnd.google-apps.folder";
export const IMAGE_MIMES = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml"]);
