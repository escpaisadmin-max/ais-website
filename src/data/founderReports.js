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
 * Entries are sorted newest-first by `date` automatically.
 */
export const founderReports = [
  {
    id: "2026-q1-founder-report",
    title: "Founder Report — Q1 2026",
    date: "April 2026",
    description:
      "The Q1 2026 edition — an updated look at ESCP's founders, startups, and investor network across the Blue Factory ecosystem.",
    pdfPath: "/founder-reports/pdf/2026-q1-founder-report.pdf",
    pageCount: 34,
  },
  {
    id: "2025-founder-report",
    title: "Founder Report 2025",
    date: "January 2026",
    description:
      "Our 2025 review of ESCP's entrepreneurial and alternative investment ecosystem — the founders, ventures, and investors across the network, prepared with ESCP Blue Factory.",
    pdfPath: "/founder-reports/pdf/2025-founder-report.pdf",
    pageCount: 43,
  },
];
