/**
 * PARTNER & EMPLOYER LOGOS
 * ========================
 * Controls the two scrolling logo banners on the homepage.
 *
 * TO ADD A NEW LOGO:
 * 1. Save the logo image (PNG, transparent background) to /public/logos/
 * 2. Add a new entry to the relevant array below
 * 3. Preview on the homepage and add a `scale` if it appears too big or small
 *    relative to the others (e.g., 1.2 makes a thin logo 20% larger,
 *    0.8 shrinks an oversized icon by 20%).
 *
 * FIELDS:
 * - id:        Unique identifier (use lowercase-kebab-case)
 * - name:      Company name (used for alt text / accessibility)
 * - logo:      Path to logo file in /public/logos/
 * - eventSlug: (Optional) Event slug — clicking the logo navigates there.
 * - scale:     (Optional) Per-logo CSS scale factor to balance visual weight.
 *              Wide/thin logos generally need >1, square icons need <1.
 *
 * KNOWN ISSUES (logo files needing replacement):
 * - BNPpng.png: source file was missing the green BNP star icon (placeholder
 *   block); currently trimmed to "BNP PARIBAS" text only.
 * - DartmouthPartners.png: source file is truncated, only shows "Dartmouth"
 *   instead of "Dartmouth Partners".
 */

/** Team & Alumni Track Record — where AIS members have worked */
export const trackRecord = [
  { id: "blackstone", name: "Blackstone", logo: "/logos/Blackstone.png", eventSlug: null, scale: 1.1 },
  { id: "eqt", name: "EQT", logo: "/logos/EQT.png", eventSlug: null },
  { id: "rothschild", name: "Rothschild", logo: "/logos/Rothschild.png", eventSlug: null },
  { id: "ubs", name: "UBS", logo: "/logos/UBS.png", eventSlug: null },
  { id: "macquarie", name: "Macquarie", logo: "/logos/Macquarie.png", eventSlug: null, scale: 1.1 },
  { id: "herax", name: "Herax Partners", logo: "/logos/Herax.png", eventSlug: null, scale: 0.7 },
  { id: "advent", name: "Advent", logo: "/logos/Advent.png", eventSlug: null, scale: 1.3 },
  { id: "clearwater", name: "Clearwater", logo: "/logos/Clearwater.png", eventSlug: null },
  { id: "bcg", name: "BCG", logo: "/logos/BCG.png", eventSlug: null, scale: 0.9 },
  { id: "general-catalyst", name: "General Catalyst", logo: "/logos/GeneralCatalyst.png", eventSlug: null },
  { id: "lincoln", name: "Lincoln International", logo: "/logos/LincolnInternational.png", eventSlug: null, scale: 1.15 },
  { id: "hines", name: "Hines", logo: "/logos/Hines.png", eventSlug: null },
  { id: "altor", name: "Altor", logo: "/logos/Altor.png", eventSlug: null },
  { id: "ardian", name: "Ardian", logo: "/logos/Ardian.png", eventSlug: null, scale: 1.25 },
  { id: "bnp", name: "BNP Paribas", logo: "/logos/BNPpng.png", eventSlug: null, scale: 1.2 },
  { id: "stern-stewart", name: "Stern & Stewart", logo: "/logos/Stern&Stewart.png", eventSlug: null, scale: 1.2 },
  { id: "bain", name: "Bain & Company", logo: "/logos/Bain.png", eventSlug: null, scale: 1.4 },
  { id: "greenhill", name: "Greenhill", logo: "/logos/Greenhill.png", eventSlug: null, scale: 1.05 },
  { id: "raymond-james", name: "Raymond James", logo: "/logos/RaymondJames.png", eventSlug: null, scale: 1.5 },
  { id: "ey-parthenon", name: "EY-Parthenon", logo: "/logos/EY_Parthenon.png", eventSlug: null },
  { id: "kpmg", name: "KPMG", logo: "/logos/KPMG.png", eventSlug: null },
];

/** Industry Collaborators */
export const academicPartners = [
  { id: "eqt-partner", name: "EQT", logo: "/logos/EQT.png", eventSlug: null },
  { id: "tikehau", name: "Tikehau", logo: "/logos/Tikehau.png", eventSlug: null, scale: 1.15 },
  { id: "job-test-prep", name: "Job Test Prep", logo: "/logos/JobTestPrep.png", eventSlug: null, scale: 0.9 },
  { id: "trackr", name: "Trackr", logo: "/logos/Trackr.png", eventSlug: null, scale: 0.65 },
  { id: "dartmouth-partners", name: "Dartmouth Partners", logo: "/logos/DartmouthPartners.png", eventSlug: null, scale: 1.2 },
  { id: "wso", name: "Wall Street Oasis", logo: "/logos/WSO.png", eventSlug: null },
  { id: "financial-edge", name: "Financial Edge", logo: "/logos/FinancialEdge.png", eventSlug: null, scale: 1.25 },
];
