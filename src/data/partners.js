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
 * - eventSlug: (Optional) Event slug — clicking the logo navigates there.
 * - scale:     (Optional) Height multiplier (default 1.0 = 40px).
 *
 * KNOWN ISSUES (logo files needing replacement):
 * - BNPpng.png: source file was missing the green BNP star icon.
 * - DartmouthPartners.png: source file is truncated, only shows "Dartmouth".
 */

/** Team & Alumni Track Record — where AIS members have worked */
export const trackRecord = [
  { id: "blackstone", name: "Blackstone", logo: "/logos/Blackstone.png", eventSlug: null },
  { id: "eqt", name: "EQT", logo: "/logos/EQT.png", eventSlug: null, scale: 1.1 },
  { id: "rothschild", name: "Rothschild", logo: "/logos/Rothschild.png", eventSlug: null },
  { id: "ubs", name: "UBS", logo: "/logos/UBS.png", eventSlug: null, scale: 1.2 },
  { id: "macquarie", name: "Macquarie", logo: "/logos/Macquarie.png", eventSlug: null },
  { id: "herax", name: "Herax Partners", logo: "/logos/Herax.png", eventSlug: null, scale: 1.3 },
  { id: "advent", name: "Advent", logo: "/logos/Advent.png", eventSlug: null, scale: 0.85 },
  { id: "clearwater", name: "Clearwater", logo: "/logos/Clearwater.png", eventSlug: null, scale: 1.15 },
  { id: "bcg", name: "BCG", logo: "/logos/BCG.png", eventSlug: null, scale: 1.15 },
  { id: "general-catalyst", name: "General Catalyst", logo: "/logos/GeneralCatalyst.png", eventSlug: null, scale: 1.1 },
  { id: "lincoln", name: "Lincoln International", logo: "/logos/LincolnInternational.png", eventSlug: null },
  { id: "hines", name: "Hines", logo: "/logos/Hines.png", eventSlug: null, scale: 1.05 },
  { id: "altor", name: "Altor", logo: "/logos/Altor.png", eventSlug: null, scale: 1.05 },
  { id: "ardian", name: "Ardian", logo: "/logos/Ardian.png", eventSlug: null },
  { id: "bnp", name: "BNP Paribas", logo: "/logos/BNPpng.png", eventSlug: null, scale: 0.9 },
  { id: "stern-stewart", name: "Stern & Stewart", logo: "/logos/Stern&Stewart.png", eventSlug: null },
  { id: "bain", name: "Bain & Company", logo: "/logos/Bain.png", eventSlug: null, scale: 0.95 },
  { id: "greenhill", name: "Greenhill", logo: "/logos/Greenhill.png", eventSlug: null },
  { id: "raymond-james", name: "Raymond James", logo: "/logos/RaymondJames.png", eventSlug: null, scale: 0.9 },
];

/** Industry Collaborators */
export const academicPartners = [
  { id: "wso", name: "Wall Street Oasis", logo: "/logos/WSO.png", eventSlug: null, scale: 1.1 },
  { id: "job-test-prep", name: "Job Test Prep", logo: "/logos/JobTestPrep.png", eventSlug: null, scale: 1.2 },
  { id: "eqt-real-estate", name: "EQT Real Estate", logo: "/logos/EQTRealEstate-white.svg", eventSlug: "eqt-real-estate-workshop" },
  { id: "ace-the-round", name: "AceTheRound", logo: "/logos/AceTheRound-white.png", eventSlug: "ace-the-round-workshop", scale: 1.3 },
  { id: "jobortunity-ai", name: "Jobortunity.AI", logo: "/logos/JobortunityAI-white.png", eventSlug: null },
  { id: "dartmouth-partners", name: "Dartmouth Partners", logo: "/logos/DartmouthPartners.png", eventSlug: null },
  { id: "plato", name: "Plato", logo: "/logos/Plato-white.png", eventSlug: "plato-event", scale: 1.1 },
  { id: "revent", name: "Revent", logo: "/logos/Revent-white.png", eventSlug: "revent-event", scale: 0.85 },
];
