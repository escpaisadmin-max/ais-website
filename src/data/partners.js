/**
 * PARTNER & EMPLOYER LOGOS
 * ========================
 * Controls the scrolling logo banner on the homepage.
 *
 * TO ADD A NEW LOGO:
 * 1. Save the logo image (PNG or SVG, transparent background preferred) to /public/logos/
 * 2. Add a new entry to the array below
 *
 * FIELDS:
 * - id:        Unique identifier (use lowercase-kebab-case)
 * - name:      Company name (used for alt text / accessibility)
 * - logo:      Path to logo file in /public/logos/ (starts with /logos/)
 * - eventSlug: (Optional) If this company had an event, put the event's slug here.
 *              Clicking the logo navigates to /events/{eventSlug}.
 *              Set to null if no linked event.
 * - type:      "partner" or "employer"
 */
export const partners = [
  {
    id: "altor",
    name: "Altor",
    logo: "/logos/Altor.png",
    eventSlug: null,
    type: "partner",
  },
  {
    id: "ardian",
    name: "Ardian",
    logo: "/logos/Ardian.png",
    eventSlug: null,
    type: "partner",
  },
  {
    id: "bain",
    name: "Bain & Company",
    logo: "/logos/Bain.png",
    eventSlug: null,
    type: "partner",
  },
  {
    id: "bnp",
    name: "BNP Paribas",
    logo: "/logos/BNPpng.png",
    eventSlug: null,
    type: "partner",
  },
  {
    id: "eqt",
    name: "EQT",
    logo: "/logos/EQT.png",
    eventSlug: null,
    type: "partner",
  },
  {
    id: "ey-parthenon",
    name: "EY-Parthenon",
    logo: "/logos/EY_Parthenon.png",
    eventSlug: null,
    type: "partner",
  },
  {
    id: "kpmg",
    name: "KPMG",
    logo: "/logos/KPMG.png",
    eventSlug: null,
    type: "partner",
  },
  {
    id: "macquarie",
    name: "Macquarie",
    logo: "/logos/Macquarie.png",
    eventSlug: null,
    type: "partner",
  },
];
