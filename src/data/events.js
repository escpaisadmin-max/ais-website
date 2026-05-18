/**
 * EVENTS
 * ======
 * Controls the Events page grid and individual event detail pages.
 *
 * TO ADD A NEW EVENT:
 * 1. Save event photos to /public/events/
 * 2. Ensure the partner logo exists in /public/logos/
 * 3. Add a new entry to the array below
 *
 * FIELDS:
 * - slug:            URL-friendly identifier (used in /events/{slug}). Use lowercase-kebab-case.
 * - title:           Event name
 * - date:            Date string (e.g., "March 15, 2026")
 * - partnerLogo:     Path to partner company logo in /public/logos/
 * - partnerName:     Partner company name
 * - description:     Short description (shown on card, 1-2 sentences)
 * - fullDescription: Full event recap (shown on detail page, can be multiple paragraphs)
 * - photo:           Path to main event photo in /public/events/
 * - photos:          Array of additional photo paths (for detail page gallery)
 * - division:        Which division hosted ("pe", "vc", "hf", "re", "general")
 * - type:            Event type ("workshop", "speaker", "networking", "trip")
 * - keyTakeaways:    Array of strings (bullet points for detail page)
 */
export const events = [
  {
    slug: "eqt-real-estate-workshop",
    title: "EQT Real Estate Workshop",
    date: "2026",
    partnerLogo: "/logos/EQTRealEstate.svg",
    partnerName: "EQT Real Estate",
    description:
      "A real estate investing session with EQT Real Estate, focused on market dynamics, transaction thinking, and career insights.",
    fullDescription:
      "AIS welcomed EQT Real Estate for a dedicated workshop with members interested in real estate investing. The session covered practical perspectives on the asset class, how investors evaluate opportunities, and what students should understand before entering the sector.\n\nEvent photos will be added once the final images are selected.",
    photo: "/logos/EQTRealEstate-white.svg",
    photoFit: "contain",
    photos: [],
    division: "re",
    type: "workshop",
    keyTakeaways: [
      "Real estate investment perspectives from an active market participant",
      "Discussion of transaction evaluation and sector dynamics",
      "Career insights for students interested in real estate investing",
    ],
  },
  {
    slug: "revent-event",
    title: "Revent Event",
    date: "2026",
    partnerLogo: "/logos/Revent.png",
    partnerName: "Revent",
    description:
      "An event with Revent exploring venture investing, founder evaluation, and the European startup ecosystem.",
    fullDescription:
      "AIS hosted Revent for a session on venture capital and the European startup ecosystem. Members discussed how early-stage investors assess founders, markets, and long-term company-building potential.\n\nEvent photos will be added once the final images are selected.",
    photo: "/logos/Revent-white.png",
    photoFit: "contain",
    photos: [],
    division: "vc",
    type: "speaker",
    keyTakeaways: [
      "Early-stage investment criteria and founder evaluation",
      "Perspectives on European venture capital",
      "Career discussion with investors in the startup ecosystem",
    ],
  },
  {
    slug: "plato-event",
    title: "Plato Event",
    date: "2026",
    partnerLogo: "/logos/Plato.png",
    partnerName: "Plato",
    description:
      "A session with Plato on company building, growth, and the operational side of scaling a business.",
    fullDescription:
      "AIS hosted Plato for a discussion on company building and the practical challenges of scaling a business. The event gave members a closer look at operating perspectives that complement investment analysis.\n\nEvent photos will be added once the final images are selected.",
    photo: "/logos/Plato-white.png",
    photoFit: "contain",
    photos: [],
    division: "vc",
    type: "speaker",
    keyTakeaways: [
      "Company-building insights from an operating perspective",
      "Discussion of growth, execution, and market positioning",
      "Practical context for venture and growth investing",
    ],
  },
  {
    slug: "ace-the-round-workshop",
    title: "AceTheRound Workshop",
    date: "2026",
    partnerLogo: "/logos/AceTheRound.png",
    partnerName: "AceTheRound",
    description:
      "A recruiting-focused workshop helping members prepare for finance interviews and technical selection processes.",
    fullDescription:
      "AIS worked with AceTheRound on a recruiting preparation session for members. The workshop focused on interview readiness, technical preparation, and practical advice for competitive finance processes.",
    photo: "/logos/AceTheRound-white.png",
    photoFit: "contain",
    photos: [],
    division: "general",
    type: "workshop",
    keyTakeaways: [
      "Structured interview preparation for finance roles",
      "Technical and behavioural recruiting guidance",
      "Practical advice for competitive application processes",
    ],
  },
  {
    slug: "alexandre-casin-speaker-event",
    title: "Guest Speaker: Alexandre Casin",
    date: "2026",
    partnerLogo: "/logos/placeholder.svg",
    partnerName: "Alexandre Casin",
    description:
      "A speaker event with Alexandre Casin covering investment perspectives, career lessons, and member Q&A.",
    fullDescription:
      "AIS welcomed Alexandre Casin for a speaker session with members. The event combined industry perspectives, career reflections, and an open Q&A format for students interested in investing.",
    photo: "/events/placeholder.svg",
    photoFit: "cover",
    photos: [],
    division: "general",
    type: "speaker",
    keyTakeaways: [
      "Industry and career perspectives from an experienced speaker",
      "Open Q&A with AIS members",
      "Practical advice for students pursuing investment careers",
    ],
  },
  {
    slug: "dartmouth-partners-careers-event",
    title: "Dartmouth Partners Careers Event",
    date: "2026",
    partnerLogo: "/logos/DartmouthPartners.png",
    partnerName: "Dartmouth Partners",
    description:
      "A careers-focused event with Dartmouth Partners on recruiting strategy and finance career paths.",
    fullDescription:
      "AIS hosted Dartmouth Partners for a session focused on recruiting strategy and career paths in finance. Members received guidance on positioning, applications, and preparing for selective processes.",
    photo: "/logos/DartmouthPartners.png",
    photoFit: "contain",
    photos: [],
    division: "general",
    type: "speaker",
    keyTakeaways: [
      "Finance recruiting and application strategy",
      "Career path insights for students targeting investment roles",
      "Practical preparation advice from recruiting specialists",
    ],
  },
];
