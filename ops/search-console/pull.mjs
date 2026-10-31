// Pulls Google Search Console data for escpais.com into the private Google Sheet
// "AIS Search Console data" (Drive: AIS Website Content). Runs weekly from
// .github/workflows/search-console.yml with the same keyless service account as the Drive sync.
// The data never goes into this repo, because the repo is public.
//
// Tabs written on every run (replaced): Summary, Queries, Pages, Countries, Devices, Daily.
// Tab appended on every run: History (one row per run, so week to week trends survive).
import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";

const SHEET_ID = process.env.SEARCH_CONSOLE_SHEET_ID || "1XQ7yvEfZViJocFXnbgDV03JTUQPUWwoeaSWxo4pMTRM";
const SITE_HINT = "escpais.com";
const ROW_LIMIT = 250;

const auth = new GoogleAuth({
  scopes: [
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});
const searchconsole = google.searchconsole({ version: "v1", auth });
const sheets = google.sheets({ version: "v4", auth });

const iso = (d) => d.toISOString().slice(0, 10);
const daysAgo = (n) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d;
};
const round = (x, n = 2) => Math.round(x * 10 ** n) / 10 ** n;

async function findSite() {
  const { data } = await searchconsole.sites.list();
  const sites = (data.siteEntry || []).filter((s) => s.siteUrl.includes(SITE_HINT));
  if (!sites.length) {
    const all = (data.siteEntry || []).map((s) => s.siteUrl).join(", ") || "none";
    throw new Error(`No Search Console property for ${SITE_HINT} is shared with the service account (it can see: ${all}). Add the service account as a user in Search Console.`);
  }
  // Prefer the domain property, it covers www and non-www.
  sites.sort((a, b) => Number(b.siteUrl.startsWith("sc-domain:")) - Number(a.siteUrl.startsWith("sc-domain:")));
  return sites[0].siteUrl;
}

async function query(siteUrl, startDate, endDate, dimensions, rowLimit = ROW_LIMIT) {
  const { data } = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: { startDate, endDate, dimensions, rowLimit, dataState: "final" },
  });
  return data.rows || [];
}

const metricCols = (r) => [r.clicks, r.impressions, round(r.ctr * 100), round(r.position, 1)];

async function ensureTabs(names) {
  const { data } = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const existing = new Set(data.sheets.map((s) => s.properties.title));
  const requests = names.filter((n) => !existing.has(n)).map((title) => ({ addSheet: { properties: { title } } }));
  if (requests.length) await sheets.spreadsheets.batchUpdate({ spreadsheetId: SHEET_ID, requestBody: { requests } });
}

async function writeTab(title, rows) {
  await sheets.spreadsheets.values.clear({ spreadsheetId: SHEET_ID, range: `'${title}'` });
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `'${title}'!A1`,
    valueInputOption: "RAW",
    requestBody: { values: rows },
  });
}

async function main() {
  const siteUrl = await findSite();
  // Search Console data lags about 2 to 3 days; end 3 days ago for complete days.
  const end = iso(daysAgo(3));
  const start28 = iso(daysAgo(30));
  const start90 = iso(daysAgo(92));
  const header = ["Clicks", "Impressions", "CTR %", "Avg position"];

  const [totals, queries, pages, countries, devices, daily] = await Promise.all([
    query(siteUrl, start28, end, []),
    query(siteUrl, start28, end, ["query"]),
    query(siteUrl, start28, end, ["page"]),
    query(siteUrl, start28, end, ["country"], 50),
    query(siteUrl, start28, end, ["device"], 10),
    query(siteUrl, start90, end, ["date"], 100),
  ]);
  const t = totals[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const runAt = new Date().toISOString();

  await ensureTabs(["Summary", "Queries", "Pages", "Countries", "Devices", "Daily", "History"]);
  await writeTab("Summary", [
    ["Property", siteUrl],
    ["Period", `${start28} to ${end} (last 28 complete days)`],
    ["Updated", runAt],
    ["Clicks", t.clicks],
    ["Impressions", t.impressions],
    ["CTR %", round(t.ctr * 100)],
    ["Avg position", round(t.position, 1)],
    ["Queries with impressions", queries.length >= ROW_LIMIT ? `${ROW_LIMIT}+` : queries.length],
    ["Note", "Written weekly by the AIS website repo (ops/search-console). Do not edit: every run replaces these tabs. History is appended."],
  ]);
  await writeTab("Queries", [["Query", ...header], ...queries.map((r) => [r.keys[0], ...metricCols(r)])]);
  await writeTab("Pages", [["Page", ...header], ...pages.map((r) => [r.keys[0], ...metricCols(r)])]);
  await writeTab("Countries", [["Country", ...header], ...countries.map((r) => [r.keys[0], ...metricCols(r)])]);
  await writeTab("Devices", [["Device", ...header], ...devices.map((r) => [r.keys[0], ...metricCols(r)])]);
  await writeTab("Daily", [["Date", ...header], ...daily.map((r) => [r.keys[0], ...metricCols(r)])]);

  const hist = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: "'History'!A1:A1" });
  if (!hist.data.values) {
    await writeTab("History", [["Run (UTC)", "Period start", "Period end", ...header, "Queries"]]);
  }
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "'History'!A1",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[runAt, start28, end, ...metricCols(t), queries.length]] },
  });

  console.log(`Search Console ${siteUrl}, ${start28} to ${end}: ${t.clicks} clicks, ${t.impressions} impressions, ${queries.length} queries, ${pages.length} pages.`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
