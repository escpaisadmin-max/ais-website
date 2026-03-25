/**
 * PRESENTATIONS
 * =============
 * Controls the Presentations library page.
 *
 * TO ADD A NEW PRESENTATION:
 * 1. Export the final version as PDF
 * 2. Save the PDF to /public/presentations/pdf/ using the naming convention:
 *    {department}-{number}-{short-title}.pdf  (e.g., "pe-06-distressed-debt.pdf")
 * 3. Add a new entry to the array below
 *
 * FIELDS:
 * - id:          Unique identifier (use lowercase-kebab-case)
 * - title:       Presentation title
 * - date:        Date published (e.g., "February 2026")
 * - department:  Department key ("pe", "vc", "hf", "re")
 * - topic:       Topic description (e.g., "LBO Modeling", "VC Due Diligence")
 * - description: Short description (1-2 sentences)
 * - pdfPath:     Path to PDF in /public/presentations/pdf/
 * - pageCount:   Number of pages (shown in UI, helps users know what to expect)
 */
export const presentations = [
  // ── Private Equity ───────────────────────────────────────────────
  {
    id: "pe-01-intro-lbo",
    title: "Introduction to the LBO",
    date: "November 2024",
    department: "pe",
    topic: "LBO Fundamentals",
    description:
      "An introduction to leveraged buyouts covering deal structures, financing, and value creation mechanics.",
    pdfPath: "/presentations/pdf/pe-01-intro-lbo.pdf",
    pageCount: 31,
  },
  {
    id: "pe-02-guide-lbo-modeling",
    title: "Guide to LBO Modeling",
    date: "February 2025",
    department: "pe",
    topic: "LBO Modeling",
    description:
      "Step-by-step guide to building a leveraged buyout model from scratch, with an attached LBO model template.",
    pdfPath: "/presentations/pdf/pe-02-guide-lbo-modeling.pdf",
    pageCount: 27,
  },
  {
    id: "pe-03-deal-syndication",
    title: "Deal Syndication in Private Equity",
    date: "March 2025",
    department: "pe",
    topic: "Deal Syndication",
    description:
      "An overview of deal syndication in private equity — how firms co-invest, structure syndicates, and share risk on large transactions.",
    pdfPath: "/presentations/pdf/pe-03-deal-syndication.pdf",
    pageCount: 23,
  },
  {
    id: "pe-04-buy-and-build",
    title: "Buy & Build Strategies in Private Equity",
    date: "October 2025",
    department: "pe",
    topic: "Buy & Build",
    description:
      "How PE firms use platform acquisitions and add-on strategies to create value through consolidation.",
    pdfPath: "/presentations/pdf/pe-04-buy-and-build.pdf",
    pageCount: 24,
  },
  {
    id: "pe-05-private-credit",
    title: "Private Credit & Its Role in Modern Buyouts",
    date: "January 2026",
    department: "pe",
    topic: "Private Credit",
    description:
      "Exploring the rise of private credit and its growing role in financing leveraged buyouts and PE-backed transactions.",
    pdfPath: "/presentations/pdf/pe-05-private-credit.pdf",
    pageCount: 31,
  },

  // ── Venture Capital ──────────────────────────────────────────────
  {
    id: "vc-01-main-players",
    title: "Main Players in Venture Capital",
    date: "November 2024",
    department: "vc",
    topic: "Industry Overview",
    description:
      "A landscape overview of the major venture capital firms — their strategies, portfolio highlights, and positioning across stages.",
    pdfPath: "/presentations/pdf/vc-01-main-players.pdf",
    pageCount: 22,
  },
  {
    id: "vc-02-term-sheets",
    title: "Term Sheets in VC",
    date: "February 2025",
    department: "vc",
    topic: "Term Sheets",
    description:
      "A comprehensive overview of term sheets in venture capital, covering key clauses, cap tables, liquidation preferences, and negotiation strategies.",
    pdfPath: "/presentations/pdf/vc-02-term-sheets.pdf",
    pageCount: 30,
  },
  {
    id: "vc-03-saas-investing",
    title: "Introduction to SaaS Investing",
    date: "March 2025",
    department: "vc",
    topic: "SaaS Valuation",
    description:
      "An introduction to Software as a Service investing — key metrics, valuation approaches, and what makes a compelling SaaS business.",
    pdfPath: "/presentations/pdf/vc-03-saas-investing.pdf",
    pageCount: 34,
  },

  // ── Hedge Funds ──────────────────────────────────────────────────
  {
    id: "hf-01-strategies",
    title: "Introduction to Hedge Fund Strategies",
    date: "October 2024",
    department: "hf",
    topic: "HF Strategies",
    description:
      "An introduction to the major hedge fund strategies — long/short equity, global macro, event-driven, and quantitative approaches.",
    pdfPath: "/presentations/pdf/hf-01-strategies.pdf",
    pageCount: 18,
  },
  {
    id: "hf-02-valuation",
    title: "Valuation",
    date: "January 2025",
    department: "hf",
    topic: "Valuation Methods",
    description:
      "Core valuation methodologies used in public markets — DCF, comparable companies, precedent transactions, and more.",
    pdfPath: "/presentations/pdf/hf-02-valuation.pdf",
    pageCount: 26,
  },
  {
    id: "hf-03-main-players",
    title: "Main Players in Hedge Funds",
    date: "March 2025",
    department: "hf",
    topic: "Industry Overview",
    description:
      "A landscape overview of the major hedge funds — their strategies, AUM, track records, and key figures.",
    pdfPath: "/presentations/pdf/hf-03-main-players.pdf",
    pageCount: 24,
  },
  {
    id: "hf-04-distressed-investing",
    title: "Distressed Investing",
    date: "October 2025",
    department: "hf",
    topic: "Distressed Debt",
    description:
      "A joint presentation with TU Investment Club exploring distressed investing — credit analysis, restructuring, and opportunities in financial distress.",
    pdfPath: "/presentations/pdf/hf-04-distressed-investing.pdf",
    pageCount: 32,
  },
  {
    id: "hf-05-activist",
    title: "Deep Dive: Activist Hedge Funds",
    date: "February 2026",
    department: "hf",
    topic: "Activist Investing",
    description:
      "A deep dive into activist hedge funds — how they identify targets, build positions, and drive corporate change.",
    pdfPath: "/presentations/pdf/hf-05-activist.pdf",
    pageCount: 27,
  },

  // ── Real Estate ──────────────────────────────────────────────────
  {
    id: "re-01-main-players",
    title: "Main Players in Real Estate",
    date: "November 2024",
    department: "re",
    topic: "Industry Overview",
    description:
      "A landscape overview of the major players in real estate investing, covering leading firms and their strategies.",
    pdfPath: "/presentations/pdf/re-01-main-players.pdf",
    pageCount: 24,
  },
  {
    id: "re-02-cap-rates",
    title: "Understanding Cap Rates",
    date: "January 2025",
    department: "re",
    topic: "Cap Rates",
    description:
      "A deep dive into capitalization rates — how they work, what drives them, and how to use them in real estate valuation.",
    pdfPath: "/presentations/pdf/re-02-cap-rates.pdf",
    pageCount: 33,
  },
  {
    id: "re-03-debt",
    title: "Debt in Real Estate",
    date: "March 2025",
    department: "re",
    topic: "Real Estate Debt",
    description:
      "An exploration of debt structures in real estate — senior lending, mezzanine, and how leverage impacts returns.",
    pdfPath: "/presentations/pdf/re-03-debt.pdf",
    pageCount: 43,
  },
  {
    id: "re-04-private-debt",
    title: "Private Debt in Real Estate",
    date: "November 2025",
    department: "re",
    topic: "Private Debt",
    description:
      "How private debt is deployed in real estate transactions, covering direct lending, bridge financing, and risk considerations.",
    pdfPath: "/presentations/pdf/re-04-private-debt.pdf",
    pageCount: 33,
  },
  {
    id: "re-05-interview-prep",
    title: "Interview Prep: Real Estate",
    date: "February 2026",
    department: "re",
    topic: "Interview Preparation",
    description:
      "Technical and behavioural interview preparation for real estate roles, with common questions and frameworks.",
    pdfPath: "/presentations/pdf/re-05-interview-prep.pdf",
    pageCount: 32,
  },
];
