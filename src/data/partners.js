/**
 * PARTNER & EMPLOYER LOGOS
 * ========================
 * Controls the two scrolling logo banners on the homepage.
 *
 * SIZING MODEL (src/components/home/LogoBanner.jsx, logoSize):
 * Optical sizing from the aspect ratio: wide wordmarks render shorter, square marks
 * taller, and nothing wider than 200px, so all logos carry similar visual weight.
 * The optional `scale` multiplies the result for a logo with unusual padding.
 *
 * FIELDS:
 * - id:        Unique identifier (lowercase-kebab-case)
 * - name:      Company name (used for alt text / accessibility)
 * - logo:      Path to logo file in /public/logos/
 * - logoWidth, logoHeight: Original aspect ratio, reserved before loading.
 * - eventSlug: (Optional) Event slug — clicking the logo navigates there.
 * - scale:     (Optional) Size multiplier on top of optical sizing (default 1).
 * Regenerate optimized assets/dimensions with scripts/optimize-partner-logos.py.
 *
 * KNOWN ISSUES (logo files needing replacement):
 * - BNPpng.png: source file was missing the green BNP star icon.
 * - DartmouthPartners.png: source file is truncated, only shows "Dartmouth".
 */

/**
 * Team & Alumni Track Record: where AIS members have worked or will work.
 * Mostly S-tier names plus a few hand-picked A-tier ones, and few overall (Max, Oct 2026): this is a
 * highlight reel, not a list of every employer. Logos come from the AIS logo library (navy versions, Desktop/AIS/Assets/Logos).
 */
export const trackRecord = [
  { id: "blackstone", name: "Blackstone", logo: "/logos/optimized/Blackstone.webp", logoWidth: 400, logoHeight: 64, eventSlug: null },
  { id: "jpmorgan", name: "J.P. Morgan", logo: "/logos/optimized/JPMorgan.webp", logoWidth: 1600, logoHeight: 373, eventSlug: null },
  { id: "eqt-re-track", name: "EQT Real Estate", logo: "/logos/EQTRealEstate.svg", logoWidth: 620, logoHeight: 160, eventSlug: null },
  { id: "morgan-stanley", name: "Morgan Stanley", logo: "/logos/optimized/MorganStanley.webp", logoWidth: 1560, logoHeight: 276, eventSlug: null },
  { id: "bain", name: "Bain & Company", logo: "/logos/optimized/Bain.webp", logoWidth: 480, logoHeight: 52, eventSlug: null },
  { id: "rothschild", name: "Rothschild", logo: "/logos/optimized/Rothschild.webp", logoWidth: 1000, logoHeight: 165, eventSlug: null },
  { id: "ardian", name: "Ardian", logo: "/logos/optimized/Ardian.webp", logoWidth: 400, logoHeight: 58, eventSlug: null },
  { id: "hines", name: "Hines", logo: "/logos/optimized/Hines.webp", logoWidth: 399, logoHeight: 120, eventSlug: null },
  { id: "ubs", name: "UBS", logo: "/logos/optimized/UBS.webp", logoWidth: 311, logoHeight: 120, eventSlug: null },
  { id: "general-catalyst", name: "General Catalyst", logo: "/logos/optimized/GeneralCatalyst.webp", logoWidth: 533, logoHeight: 187, eventSlug: null },
  { id: "deutsche-bank", name: "Deutsche Bank", logo: "/logos/optimized/DeutscheBank.webp", logoWidth: 1600, logoHeight: 364, eventSlug: null },
  { id: "jefferies", name: "Jefferies", logo: "/logos/optimized/Jefferies.webp", logoWidth: 1600, logoHeight: 392, eventSlug: null },
  { id: "lincoln", name: "Lincoln International", logo: "/logos/optimized/LincolnInternational.webp", logoWidth: 399, logoHeight: 70, eventSlug: null },
  { id: "bcg", name: "BCG", logo: "/logos/optimized/BCG.webp", logoWidth: 265, logoHeight: 108, eventSlug: null },
  { id: "advent", name: "Advent", logo: "/logos/optimized/Advent.webp", logoWidth: 400, logoHeight: 34, eventSlug: null },
  { id: "macquarie", name: "Macquarie", logo: "/logos/optimized/Macquarie.webp", logoWidth: 757, logoHeight: 155, eventSlug: null },
];

/** Industry Collaborators */
export const academicPartners = [
  { id: "wso", name: "Wall Street Oasis", logo: "/logos/optimized/WSO.webp", logoWidth: 286, logoHeight: 82, eventSlug: null },
  { id: "job-test-prep", name: "Job Test Prep", logo: "/logos/optimized/JobTestPrep.webp", logoWidth: 225, logoHeight: 120, eventSlug: null, scale: 1.6 },
  { id: "eqt-real-estate", name: "EQT Real Estate", logo: "/logos/EQTRealEstate.svg", logoWidth: 620, logoHeight: 160, eventSlug: "eqt-real-estate-workshop" },
  { id: "ace-the-round", name: "AceTheRound", logo: "/logos/optimized/AceTheRound.webp", logoWidth: 541, logoHeight: 224, eventSlug: "ace-the-round-workshop" },
  { id: "jobortunity-ai", name: "Jobortunity.AI", logo: "/logos/optimized/JobortunityAI.webp", logoWidth: 1000, logoHeight: 201, eventSlug: null },
  { id: "dartmouth-partners", name: "Dartmouth Partners", logo: "/logos/optimized/DartmouthPartners.webp", logoWidth: 400, logoHeight: 63, eventSlug: null },
  { id: "plato", name: "Plato", logo: "/logos/optimized/Plato.webp", logoWidth: 730, logoHeight: 216, eventSlug: "plato-event" },
  { id: "revent", name: "Revent", logo: "/logos/Revent.svg", logoWidth: 360, logoHeight: 70, eventSlug: "revent-event" },
];
