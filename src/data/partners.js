/**
 * PARTNER & EMPLOYER LOGOS
 * ========================
 * Controls the two scrolling logo banners on the homepage.
 *
 * TO ADD A NEW LOGO:
 * 1. Save the logo image (PNG or SVG, transparent background preferred) to /public/logos/
 * 2. Add a new entry to the relevant array below
 *
 * FIELDS:
 * - id:        Unique identifier (use lowercase-kebab-case)
 * - name:      Company name (used for alt text / accessibility)
 * - logo:      Path to logo file in /public/logos/ (starts with /logos/)
 * - eventSlug: (Optional) If this company had an event, put the event's slug here.
 *              Clicking the logo navigates to /events/{eventSlug}.
 *              Set to null if no linked event.
 */

/** Team & Alumni Track Record — where AIS members have worked */
export const trackRecord = [
  { id: "blackstone", name: "Blackstone", logo: "/logos/Blackstone.png", eventSlug: null },
  { id: "eqt", name: "EQT", logo: "/logos/EQT.png", eventSlug: null },
  { id: "rothschild", name: "Rothschild", logo: "/logos/Rothschild.png", eventSlug: null },
  { id: "ubs", name: "UBS", logo: "/logos/UBS.png", eventSlug: null },
  { id: "macquarie", name: "Macquarie", logo: "/logos/Macquarie.png", eventSlug: null },
  { id: "herax", name: "Herax Partners", logo: "/logos/Herax.png", eventSlug: null },
  { id: "advent", name: "Advent", logo: "/logos/Advent.png", eventSlug: null },
  { id: "clearwater", name: "Clearwater", logo: "/logos/Clearwater.png", eventSlug: null },
  { id: "bcg", name: "BCG", logo: "/logos/BCG.png", eventSlug: null },
  { id: "general-catalyst", name: "General Catalyst", logo: "/logos/GeneralCatalyst.png", eventSlug: null },
  { id: "lincoln", name: "Lincoln International", logo: "/logos/LincolnInternational.png", eventSlug: null },
  { id: "hines", name: "Hines", logo: "/logos/Hines.png", eventSlug: null },
  { id: "altor", name: "Altor", logo: "/logos/Altor.png", eventSlug: null },
  { id: "ardian", name: "Ardian", logo: "/logos/Ardian.png", eventSlug: null },
  { id: "bnp", name: "BNP Paribas", logo: "/logos/BNPpng.png", eventSlug: null },
  { id: "stern-stewart", name: "Stern & Stewart", logo: "/logos/Stern&Stewart.png", eventSlug: null },
  { id: "bain", name: "Bain & Company", logo: "/logos/Bain.png", eventSlug: null },
  { id: "greenhill", name: "Greenhill", logo: "/logos/Greenhill.png", eventSlug: null },
  { id: "raymond-james", name: "Raymond James", logo: "/logos/RaymondJames.png", eventSlug: null },
  { id: "ey-parthenon", name: "EY-Parthenon", logo: "/logos/EY_Parthenon.png", eventSlug: null },
  { id: "kpmg", name: "KPMG", logo: "/logos/KPMG.png", eventSlug: null },
];

/** Professional & Academic Partners */
export const academicPartners = [
  { id: "eqt-partner", name: "EQT", logo: "/logos/EQT.png", eventSlug: null },
  { id: "tikehau", name: "Tikehau", logo: "/logos/Tikehau.png", eventSlug: null },
  { id: "job-test-prep", name: "Job Test Prep", logo: "/logos/JobTestPrep.png", eventSlug: null },
  { id: "trackr", name: "Trackr", logo: "/logos/Trackr.png", eventSlug: null },
  { id: "dartmouth-partners", name: "Dartmouth Partners", logo: "/logos/DartmouthPartners.png", eventSlug: null },
  { id: "wso", name: "Wall Street Oasis", logo: "/logos/WSO.png", eventSlug: null },
  { id: "financial-edge", name: "Financial Edge", logo: "/logos/FinancialEdge.png", eventSlug: null },
];
