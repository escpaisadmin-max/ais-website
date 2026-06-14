/**
 * Thin Google Drive client. Auth uses Application Default Credentials:
 *  - In GitHub Actions, google-github-actions/auth provides them via WIF.
 *  - Locally, run `gcloud auth application-default login` once.
 */
import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import { DRIVE_SCOPES, FOLDER_MIME, GOOGLE_PDF_EXPORTABLE } from "./config.mjs";

export async function getDrive() {
  const auth = new GoogleAuth({ scopes: DRIVE_SCOPES });
  const client = await auth.getClient();
  return google.drive({ version: "v3", auth: client });
}

const LIST_FIELDS =
  "nextPageToken, files(id, name, mimeType, modifiedTime, createdTime, md5Checksum, size)";

/** List all non-trashed direct children of a folder (handles pagination). */
export async function listChildren(drive, parentId) {
  const out = [];
  let pageToken;
  do {
    const res = await drive.files.list({
      q: `'${parentId}' in parents and trashed = false`,
      fields: LIST_FIELDS,
      pageSize: 1000,
      pageToken,
      // include items from shared drives too, in case this ever moves to one
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });
    out.push(...(res.data.files || []));
    pageToken = res.data.nextPageToken;
  } while (pageToken);
  return out;
}

/** Find a direct sub-folder by (case-insensitive) name. */
export async function findFolder(drive, parentId, name) {
  const children = await listChildren(drive, parentId);
  const target = name.toLowerCase();
  return children.find(
    (f) => f.mimeType === FOLDER_MIME && f.name.toLowerCase() === target
  );
}

export function isFolder(file) {
  return file.mimeType === FOLDER_MIME;
}

/** Download a file's bytes, exporting Google-native files to PDF. Returns a Buffer. */
export async function fetchAsPdf(drive, file) {
  if (GOOGLE_PDF_EXPORTABLE.has(file.mimeType)) {
    const res = await drive.files.export(
      { fileId: file.id, mimeType: "application/pdf" },
      { responseType: "arraybuffer" }
    );
    return Buffer.from(res.data);
  }
  if (file.mimeType === "application/pdf") {
    const res = await drive.files.get(
      { fileId: file.id, alt: "media", supportsAllDrives: true },
      { responseType: "arraybuffer" }
    );
    return Buffer.from(res.data);
  }
  throw new Error(`Unsupported file type for PDF: ${file.name} (${file.mimeType})`);
}

/** Download any binary file (e.g. an image). Returns a Buffer. */
export async function fetchBinary(drive, file) {
  const res = await drive.files.get(
    { fileId: file.id, alt: "media", supportsAllDrives: true },
    { responseType: "arraybuffer" }
  );
  return Buffer.from(res.data);
}
