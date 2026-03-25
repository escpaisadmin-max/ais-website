/**
 * NEWSLETTERS
 * ===========
 * Controls the Newsletters page.
 *
 * TO ADD A NEW NEWSLETTER:
 * 1. Drop the .docx file into /public/newsletters/incoming/
 * 2. Convert it to PDF (or ask Claude to do it)
 * 3. Save the PDF to /public/newsletters/pdf/ using the naming convention:
 *    {department}-{issue number}-{short-title}.pdf  (e.g., "re-24-logistics.pdf")
 * 4. Add a new entry to the array below
 *
 * FIELDS:
 * - id:          Unique identifier (use lowercase-kebab-case)
 * - title:       Newsletter title
 * - issue:       Issue number
 * - date:        Date published (e.g., "March 2026")
 * - department:  Department key ("pe", "vc", "hf", "re")
 * - topic:       Topic / subject
 * - description: Short summary (1-2 sentences)
 * - pdfPath:     Path to PDF in /public/newsletters/pdf/
 * - pageCount:   Number of pages
 */
export const newsletters = [
  // ── Issue #1 — VC ────────────────────────────────────────────────
  {
    id: "vc-01-ai-boom",
    title: "The AI Boom",
    issue: 1,
    date: "October 2024",
    department: "vc",
    topic: "Artificial Intelligence",
    description:
      "Exploring the rise of AI — how this transformative technology is reshaping industries, investment opportunities, and everyday life.",
    pdfPath: "/newsletters/pdf/vc-01-ai-boom.pdf",
    pageCount: 3,
  },
  // ── Issue #3 — RE ────────────────────────────────────────────────
  {
    id: "re-03-megatrends",
    title: "Megatrends in Real Estate",
    issue: 3,
    date: "November 2024",
    department: "re",
    topic: "Megatrends",
    description:
      "Exploring the structural megatrends reshaping the real estate industry — supply-demand imbalances, demographic shifts, and new investment themes.",
    pdfPath: "/newsletters/pdf/re-03-megatrends.pdf",
    pageCount: 3,
  },
  // ── Issue #4 — HF ────────────────────────────────────────────────
  {
    id: "hf-04-citadel",
    title: "Citadel: The Most Successful Hedge Fund of All Time",
    issue: 4,
    date: "November 2024",
    department: "hf",
    topic: "Citadel",
    description:
      "A deep dive into Citadel — from Ken Griffin's founding in 1990 to becoming the leader in net gains in the hedge fund industry.",
    pdfPath: "/newsletters/pdf/hf-04-citadel.pdf",
    pageCount: 3,
  },
  // ── Issue #5 — PE ────────────────────────────────────────────────
  {
    id: "pe-05-exit-strategies",
    title: "Exit Strategies in Private Equity",
    issue: 5,
    date: "January 2025",
    department: "pe",
    topic: "Exit Strategies",
    description:
      "A closer look at key exit strategies for PE portfolio companies and how GPs are navigating today's challenging exit environment.",
    pdfPath: "/newsletters/pdf/pe-05-exit-strategies.pdf",
    pageCount: 3,
  },
  // ── Issue #6 — VC ────────────────────────────────────────────────
  {
    id: "vc-06-european-tech",
    title: "European Tech Ascendency",
    issue: 6,
    date: "January 2025",
    department: "vc",
    topic: "European VC",
    description:
      "Exploring the state of Europe's venture capital landscape — is the region lagging behind or building a prosperous future?",
    pdfPath: "/newsletters/pdf/vc-06-european-tech.pdf",
    pageCount: 4,
  },
  // ── Issue #7 — RE ────────────────────────────────────────────────
  {
    id: "re-07-data-centers",
    title: "The Data Center Boom",
    issue: 7,
    date: "January 2025",
    department: "re",
    topic: "Data Centers",
    description:
      "The rise of data centers as a real estate and infrastructure asset class, driven by AI growth and surging digital demand.",
    pdfPath: "/newsletters/pdf/re-07-data-centers.pdf",
    pageCount: 3,
  },
  // ── Issue #8 — HF ────────────────────────────────────────────────
  {
    id: "hf-08-evolution",
    title: "Evolution of Hedge Funds",
    issue: 8,
    date: "February 2025",
    department: "hf",
    topic: "Industry History",
    description:
      "How hedge funds evolved from experimental investment vehicles into some of the most influential financial institutions in the world.",
    pdfPath: "/newsletters/pdf/hf-08-evolution.pdf",
    pageCount: 3,
  },
  // ── Issue #9 — PE ────────────────────────────────────────────────
  {
    id: "pe-09-restructuring",
    title: "Restructuring in Private Equity",
    issue: 9,
    date: "March 2025",
    department: "pe",
    topic: "Restructuring",
    description:
      "Restructuring strategies in PE — how firms restructure out of necessity, to create value, or both.",
    pdfPath: "/newsletters/pdf/pe-09-restructuring.pdf",
    pageCount: 3,
  },
  // ── Issue #10 — VC ───────────────────────────────────────────────
  {
    id: "vc-10-defense-innovation",
    title: "Can Europe Sustain Its Defense Innovation Momentum?",
    issue: 10,
    date: "March 2025",
    department: "vc",
    topic: "Defense Tech",
    description:
      "Examining the evolving landscape of Europe's defense, security and resilience sector and the surge in venture capital interest.",
    pdfPath: "/newsletters/pdf/vc-10-defense-innovation.pdf",
    pageCount: 3,
  },
  // ── Issue #11 — RE ───────────────────────────────────────────────
  {
    id: "re-11-logistics",
    title: "Logistics Real Estate",
    issue: 11,
    date: "March 2025",
    department: "re",
    topic: "Logistics",
    description:
      "Industrial real estate amid shifting market conditions — changing demand dynamics and declining construction starts.",
    pdfPath: "/newsletters/pdf/re-11-logistics.pdf",
    pageCount: 3,
  },
  // ── Issue #12 — HF ───────────────────────────────────────────────
  {
    id: "hf-12-renaissance",
    title: "Jim Simons' Renaissance: Revolutionizing the Hedge Fund Industry",
    issue: 12,
    date: "April 2025",
    department: "hf",
    topic: "Renaissance Technologies",
    description:
      "How mathematician Jim Simons built Renaissance Technologies into one of the most successful hedge funds in history.",
    pdfPath: "/newsletters/pdf/hf-12-renaissance.pdf",
    pageCount: 3,
  },
  // ── Issue #13 — PE ───────────────────────────────────────────────
  {
    id: "pe-13-secondaries",
    title: "The Rise of Secondaries in Private Equity",
    issue: 13,
    date: "October 2025",
    department: "pe",
    topic: "Secondaries",
    description:
      "The expanding role of secondary transactions in PE as exit markets remain subdued and holding periods extend.",
    pdfPath: "/newsletters/pdf/pe-13-secondaries.pdf",
    pageCount: 3,
  },
  // ── Issue #14 — RE ───────────────────────────────────────────────
  {
    id: "re-14-office",
    title: "Office Real Estate",
    issue: 14,
    date: "November 2025",
    department: "re",
    topic: "Office Market",
    description:
      "The state of office real estate — selective revitalisation after years of post-pandemic disruption.",
    pdfPath: "/newsletters/pdf/re-14-office.pdf",
    pageCount: 3,
  },
  // ── Issue #15 — HF ───────────────────────────────────────────────
  {
    id: "hf-15-bridgewater",
    title: "Bridgewater Associates",
    issue: 15,
    date: "November 2025",
    department: "hf",
    topic: "Bridgewater",
    description:
      "Bridgewater's Pure Alpha flagship delivers one of the strongest performances in the industry — a look at the firm's strategy and revival.",
    pdfPath: "/newsletters/pdf/hf-15-bridgewater.pdf",
    pageCount: 3,
  },
  // ── Issue #16 — VC ───────────────────────────────────────────────
  {
    id: "vc-16-dual-use-defense",
    title: "Dual Use in Defense",
    issue: 16,
    date: "December 2025",
    department: "vc",
    topic: "Dual-Use Technology",
    description:
      "How dual-use innovation is redefining Europe's defense landscape — the blending of civilian and military technologies.",
    pdfPath: "/newsletters/pdf/vc-16-dual-use-defense.pdf",
    pageCount: 3,
  },
  // ── Issue #17 — HF ───────────────────────────────────────────────
  {
    id: "hf-17-tiger-management",
    title: "Tiger Management",
    issue: 17,
    date: "January 2026",
    department: "hf",
    topic: "Tiger Management",
    description:
      "The story of Julian Robertson's Tiger Management — one of the most influential hedge funds of the 1980s and 1990s.",
    pdfPath: "/newsletters/pdf/hf-17-tiger-management.pdf",
    pageCount: 3,
  },
  // ── Issue #18 — RE ───────────────────────────────────────────────
  {
    id: "re-18-structural-forces",
    title: "Structural Forces in Real Estate",
    issue: 18,
    date: "January 2026",
    department: "re",
    topic: "Market Outlook",
    description:
      "Structural forces shaping the commercial real estate market — refinancing demands, interest rates, and sector divergence.",
    pdfPath: "/newsletters/pdf/re-18-structural-forces.pdf",
    pageCount: 3,
  },
  // ── Issue #19 — VC ───────────────────────────────────────────────
  {
    id: "vc-19-voice-ai",
    title: "Voice AI",
    issue: 19,
    date: "February 2026",
    department: "vc",
    topic: "Voice AI",
    description:
      "The technology behind Voice AI — how companies like ElevenLabs are building and scaling systems that generate, recognize, and interact through spoken language.",
    pdfPath: "/newsletters/pdf/vc-19-voice-ai.pdf",
    pageCount: 3,
  },
  // ── Issue #20 — PE ───────────────────────────────────────────────
  {
    id: "pe-20-democratization",
    title: "Democratization of Private Equity",
    issue: 20,
    date: "February 2026",
    department: "pe",
    topic: "Democratization",
    description:
      "The process of making private markets more accessible to non-institutional investors — trends, vehicles, and implications.",
    pdfPath: "/newsletters/pdf/pe-20-democratization.pdf",
    pageCount: 3,
  },
  // ── Issue #22 — RE ───────────────────────────────────────────────
  {
    id: "re-22-student-housing",
    title: "Student Housing",
    issue: 22,
    date: "March 2026",
    department: "re",
    topic: "Student Housing",
    description:
      "An in-depth look at the student housing asset class — demand drivers, supply bottlenecks, key risks, and current institutional trends.",
    pdfPath: "/newsletters/pdf/re-22-student-housing.pdf",
    pageCount: 4,
  },
  // ── Issue #23 — PE ───────────────────────────────────────────────
  {
    id: "pe-23-ai-in-pe",
    title: "Artificial Intelligence in Private Equity",
    issue: 23,
    date: "March 2026",
    department: "pe",
    topic: "AI in PE",
    description:
      "The growing role of AI across the private equity lifecycle — from deal sourcing and due diligence to portfolio management.",
    pdfPath: "/newsletters/pdf/pe-23-ai-in-pe.pdf",
    pageCount: 3,
  },
];
