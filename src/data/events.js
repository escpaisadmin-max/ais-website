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
    slug: "sample-workshop-2026",
    title: "Sample Case Workshop",
    date: "March 15, 2026",
    partnerLogo: "/logos/placeholder.svg",
    partnerName: "Partner Company",
    description:
      "An intensive case study workshop exploring real-world investment scenarios with industry professionals.",
    fullDescription:
      "This workshop brought together AIS members and professionals from Partner Company for an immersive afternoon of case study analysis. Participants worked in teams to evaluate a potential acquisition target, building financial models and presenting their investment theses to a panel of judges.\n\nThe event provided invaluable hands-on experience and networking opportunities with professionals in the field.",
    photo: "/events/placeholder.svg",
    photos: [],
    division: "general",
    type: "workshop",
    keyTakeaways: [
      "Hands-on experience with real-world case studies",
      "Networking with industry professionals",
      "Team-based analysis and presentation skills",
    ],
  },
  {
    slug: "sample-speaker-event",
    title: "Guest Speaker: Investment Strategies",
    date: "February 20, 2026",
    partnerLogo: "/logos/placeholder.svg",
    partnerName: "Partner Company",
    description:
      "A guest lecture on modern investment strategies from a senior portfolio manager.",
    fullDescription:
      "We welcomed a senior portfolio manager to discuss evolving investment strategies in the current macroeconomic environment. The session covered topics ranging from value investing principles to emerging market opportunities.\n\nThe Q&A session was particularly engaging, with members asking about career paths and industry trends.",
    photo: "/events/placeholder.svg",
    photos: [],
    division: "hf",
    type: "speaker",
    keyTakeaways: [
      "Insights into modern portfolio management",
      "Understanding macroeconomic impacts on investment decisions",
      "Career advice from an industry veteran",
    ],
  },
];
