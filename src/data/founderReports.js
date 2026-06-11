/**
 * FOUNDER REPORTS
 * ===============
 * Controls the Founder Report page — org-wide reflections from the founders
 * (not tied to a single division).
 *
 * TO ADD A NEW FOUNDER REPORT:
 * 1. Export the final report as PDF.
 * 2. Save it to /public/founder-reports/pdf/ using the naming convention:
 *    {year}-founder-report.pdf  (e.g., "2025-founder-report.pdf")
 * 3. Add a new entry to the array below.
 *
 * FIELDS:
 * - id:          Unique identifier (use lowercase-kebab-case)
 * - title:       Report title
 * - date:        Date published (e.g., "March 2026")
 * - description: Short summary (1-2 sentences)
 * - pdfPath:     Path to PDF in /public/founder-reports/pdf/
 * - pageCount:   Number of pages
 *
 * Until the first report is added, the page shows a "coming soon" state.
 *
 * Example entry (uncomment and fill in once a PDF is in place):
 * {
 *   id: "2025-founder-report",
 *   title: "AIS Founder Report 2025",
 *   date: "March 2026",
 *   description:
 *     "A reflection on AIS — our mission, milestones, and the road ahead.",
 *   pdfPath: "/founder-reports/pdf/2025-founder-report.pdf",
 *   pageCount: 0,
 * },
 */
export const founderReports = [];
