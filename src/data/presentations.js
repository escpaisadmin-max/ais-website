/**
 * PRESENTATIONS
 * =============
 * Controls the Presentations library page.
 *
 * TO ADD A NEW PRESENTATION:
 * 1. Save the PDF file to /public/presentations/
 * 2. Add a new entry to the array below
 *
 * FIELDS:
 * - id:          Unique identifier (use lowercase-kebab-case)
 * - title:       Presentation title
 * - date:        Date published (e.g., "February 2026")
 * - department:  Department key ("pe", "vc", "hf", "re", "markets")
 * - topic:       Topic description (e.g., "LBO Modeling", "VC Due Diligence")
 * - description: Short description (1-2 sentences)
 * - pdfPath:     Path to PDF in /public/presentations/ (starts with /presentations/)
 * - pageCount:   Number of pages (shown in UI, helps users know what to expect)
 */
export const presentations = [
  {
    id: "vc-edupost-8",
    title: "Venture Capital Educational Post #8",
    date: "February 2026",
    department: "vc",
    topic: "Term Sheets in VC",
    description:
      "A comprehensive overview of term sheets in venture capital, covering key clauses and negotiation strategies.",
    pdfPath: "/presentations/sample.pdf",
    pageCount: 29,
  },
  {
    id: "pe-lbo-intro",
    title: "Introduction to LBO Modeling",
    date: "January 2026",
    department: "pe",
    topic: "LBO Modeling",
    description:
      "Step-by-step guide to building a leveraged buyout model from scratch.",
    pdfPath: "/presentations/sample.pdf",
    pageCount: 35,
  },
  {
    id: "hf-macro-outlook",
    title: "Macro Outlook Q1 2026",
    date: "January 2026",
    department: "hf",
    topic: "Macroeconomics",
    description:
      "Analysis of global macroeconomic trends and their implications for hedge fund strategies.",
    pdfPath: "/presentations/sample.pdf",
    pageCount: 22,
  },
  {
    id: "re-european-reits",
    title: "European REIT Landscape",
    date: "December 2025",
    department: "re",
    topic: "REITs",
    description:
      "An exploration of the European REIT market, covering key players and investment opportunities.",
    pdfPath: "/presentations/sample.pdf",
    pageCount: 18,
  },
];
