/**
 * PARTNER & EMPLOYER LOGOS
 * ========================
 * Controls the two scrolling logo banners on the homepage.
 *
 * SIZING MODEL:
 * All logos render at a base height of 40px with width auto (aspect preserved).
 * The optional `scale` multiplies that base height — useful for square or
 * icon-only marks that look too small at 40px.
 *
 * FIELDS:
 * - id:        Unique identifier (lowercase-kebab-case)
 * - name:      Company name (used for alt text / accessibility)
 * - logo:      Path to logo file in /public/logos/
 * - logoWidth, logoHeight: Original aspect ratio, reserved before loading.
 * - eventSlug: (Optional) Event slug — clicking the logo navigates there.
 * - scale:     (Optional) Height multiplier (default 1.0 = 40px).
 * Regenerate optimized assets/dimensions with scripts/optimize-partner-logos.py.
 *
 * KNOWN ISSUES (logo files needing replacement):
 * - BNPpng.png: source file was missing the green BNP star icon.
 * - DartmouthPartners.png: source file is truncated, only shows "Dartmouth".
 */

/** Team & Alumni Track Record — where AIS members have worked */
export const trackRecord = [
  { id: "blackstone", name: "Blackstone", logo: "/logos/optimized/Blackstone.webp", logoWidth: 400, logoHeight: 64, eventSlug: null },
  { id: "eqt-re-track", name: "EQT Real Estate", logo: "/logos/EQTRealEstate.svg", logoWidth: 620, logoHeight: 160, eventSlug: null },
  { id: "rothschild", name: "Rothschild", logo: "/logos/optimized/Rothschild.webp", logoWidth: 1000, logoHeight: 165, eventSlug: null },
  { id: "ubs", name: "UBS", logo: "/logos/optimized/UBS.webp", logoWidth: 311, logoHeight: 120, eventSlug: null, scale: 1.2 },
  { id: "macquarie", name: "Macquarie", logo: "/logos/optimized/Macquarie.webp", logoWidth: 757, logoHeight: 155, eventSlug: null },
  { id: "herax", name: "Herax Partners", logo: "/logos/optimized/Herax.webp", logoWidth: 123, logoHeight: 120, eventSlug: null, scale: 1.3 },
  { id: "advent", name: "Advent", logo: "/logos/optimized/Advent.webp", logoWidth: 400, logoHeight: 34, eventSlug: null, scale: 0.85 },
  { id: "clearwater", name: "Clearwater", logo: "/logos/optimized/Clearwater.webp", logoWidth: 252, logoHeight: 120, eventSlug: null, scale: 1.15 },
  { id: "bcg", name: "BCG", logo: "/logos/optimized/BCG.webp", logoWidth: 265, logoHeight: 108, eventSlug: null, scale: 1.15 },
  { id: "general-catalyst", name: "General Catalyst", logo: "/logos/optimized/GeneralCatalyst.webp", logoWidth: 533, logoHeight: 187, eventSlug: null, scale: 1.1 },
  { id: "lincoln", name: "Lincoln International", logo: "/logos/optimized/LincolnInternational.webp", logoWidth: 399, logoHeight: 70, eventSlug: null },
  { id: "hines", name: "Hines", logo: "/logos/optimized/Hines.webp", logoWidth: 399, logoHeight: 120, eventSlug: null, scale: 1.05 },
  { id: "altor", name: "Altor", logo: "/logos/optimized/Altor.webp", logoWidth: 400, logoHeight: 112, eventSlug: null, scale: 1.05 },
  { id: "ardian", name: "Ardian", logo: "/logos/optimized/Ardian.webp", logoWidth: 400, logoHeight: 58, eventSlug: null },
  { id: "bnp", name: "BNP Paribas", logo: "/logos/optimized/BNPpng.webp", logoWidth: 297, logoHeight: 31, eventSlug: null, scale: 0.9 },
  { id: "stern-stewart", name: "Stern & Stewart", logo: "/logos/optimized/Stern&Stewart.webp", logoWidth: 480, logoHeight: 90, eventSlug: null },
  { id: "bain", name: "Bain & Company", logo: "/logos/optimized/Bain.webp", logoWidth: 480, logoHeight: 52, eventSlug: null, scale: 0.95 },
  { id: "greenhill", name: "Greenhill", logo: "/logos/optimized/Greenhill.webp", logoWidth: 397, logoHeight: 81, eventSlug: null },
  { id: "raymond-james", name: "Raymond James", logo: "/logos/optimized/RaymondJames.webp", logoWidth: 400, logoHeight: 35, eventSlug: null, scale: 0.9 },
];

/** Industry Collaborators */
export const academicPartners = [
  { id: "wso", name: "Wall Street Oasis", logo: "/logos/optimized/WSO.webp", logoWidth: 286, logoHeight: 82, eventSlug: null, scale: 1.1 },
  { id: "job-test-prep", name: "Job Test Prep", logo: "/logos/optimized/JobTestPrep.webp", logoWidth: 225, logoHeight: 120, eventSlug: null, scale: 1.4 },
  { id: "eqt-real-estate", name: "EQT Real Estate", logo: "/logos/EQTRealEstate.svg", logoWidth: 620, logoHeight: 160, eventSlug: "eqt-real-estate-workshop" },
  { id: "ace-the-round", name: "AceTheRound", logo: "/logos/optimized/AceTheRound.webp", logoWidth: 541, logoHeight: 224, eventSlug: "ace-the-round-workshop", scale: 1.3 },
  { id: "jobortunity-ai", name: "Jobortunity.AI", logo: "/logos/optimized/JobortunityAI.webp", logoWidth: 1000, logoHeight: 201, eventSlug: null },
  { id: "dartmouth-partners", name: "Dartmouth Partners", logo: "/logos/optimized/DartmouthPartners.webp", logoWidth: 400, logoHeight: 63, eventSlug: null },
  { id: "plato", name: "Plato", logo: "/logos/optimized/Plato.webp", logoWidth: 730, logoHeight: 216, eventSlug: "plato-event", scale: 1.1 },
  { id: "revent", name: "Revent", logo: "/logos/Revent.svg", logoWidth: 360, logoHeight: 70, eventSlug: "revent-event", scale: 0.9 },
];
