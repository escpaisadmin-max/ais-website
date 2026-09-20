import { presentations } from "./presentations.js";
import { newsletters } from "./newsletters.js";
import { founderReports } from "./founderReports.js";
import { events } from "./events.js";

export const siteOrigin = "https://www.escpais.com";
const siteName = "ESCP Alternative Investment Society";
const image = `${siteOrigin}/social-preview.png`;

const sections = [
  ["/", "AIS | ESCP Alternative Investment Society", "Explore ESCP's Alternative Investment Society: educational publications, investment insights, industry events, and our student community."],
  ["/newsletters", "Newsletters", "Market trends, investment insights, and industry case studies across alternative assets from ESCP's Alternative Investment Society."],
  ["/presentations", "Publications & Educational Resources", "Educational resources, technical guides, and industry deep dives covering private equity, venture capital, hedge funds, and real estate."],
  ["/founder-report", "Founder Report", "Data-driven reports on ESCP's founders, startups, and investor ecosystem from the Alternative Investment Society."],
  ["/events", "Events", "Explore AIS speaker events, workshops, and industry discussions with finance professionals."],
  ["/about", "About & Team", "Meet the people and four investment divisions behind ESCP's Alternative Investment Society, and learn about our educational mission."],
  ["/contact", "Contact", "Contact AIS about partnerships, membership, guest speakers, and events at ESCP's Alternative Investment Society."],
  ["/privacy-policy", "Privacy Policy", "Read the privacy information for the ESCP Alternative Investment Society website and find our contact details."],
  ["/impressum", "Legal Notice", "Website operator and contact information for ESCP Alternative Investment Society."],
];

const publicationPages = (items, section) => items.map((item) => ({
  path: `/${section}/${encodeURIComponent(item.id)}`,
  title: `${item.title} | AIS`,
  description: item.description || `Read ${item.title}, a publication from ${siteName}.`,
  type: "article",
}));

export const sitePages = [
  ...sections.map(([path, title, description]) => ({
    path,
    title: path === "/" ? title : `${title} | AIS`,
    description,
    type: "website",
  })),
  ...publicationPages(presentations, "presentations"),
  ...publicationPages(newsletters, "newsletters"),
  ...publicationPages(founderReports, "founder-report"),
  ...events.map((event) => ({
    path: `/events/${encodeURIComponent(event.slug)}`,
    title: `${event.title} | AIS`,
    description: event.description || event.title,
    type: "website",
  })),
];

// Shared by static HTML generation and client-side navigation.
export function getHeadTags(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const page = sitePages.find((entry) => entry.path === path);
  const title = page?.title || "Page Not Found | AIS";
  const description = page?.description || "This page could not be found. Return to the AIS homepage to explore publications, events, and our team.";
  const tags = [
    { tag: "title", text: title },
    { tag: "meta", name: "description", content: description },
    { tag: "meta", name: "robots", content: page ? "index, follow" : "noindex, follow" },
    { tag: "meta", property: "og:title", content: title },
    { tag: "meta", property: "og:description", content: description },
    { tag: "meta", property: "og:type", content: page?.type || "website" },
    { tag: "meta", property: "og:site_name", content: siteName },
    { tag: "meta", property: "og:image", content: image },
    { tag: "meta", property: "og:image:width", content: "1200" },
    { tag: "meta", property: "og:image:height", content: "630" },
    { tag: "meta", property: "og:image:alt", content: "ESCP Alternative Investment Society — Publications, Events, Community" },
    { tag: "meta", name: "twitter:card", content: "summary_large_image" },
    { tag: "meta", name: "twitter:title", content: title },
    { tag: "meta", name: "twitter:description", content: description },
    { tag: "meta", name: "twitter:image", content: image },
    { tag: "meta", name: "twitter:image:alt", content: "ESCP Alternative Investment Society" },
  ];
  if (page) {
    tags.push(
      { tag: "link", rel: "canonical", href: `${siteOrigin}${page.path}` },
      { tag: "meta", property: "og:url", content: `${siteOrigin}${page.path}` },
    );
  }
  if (path === "/") {
    tags.push({
      tag: "script",
      type: "application/ld+json",
      text: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${siteOrigin}/#organization`,
        name: siteName,
        alternateName: "AIS",
        url: `${siteOrigin}/`,
        logo: `${siteOrigin}/ais-logo-dark.svg`,
      }),
    });
  }
  return tags;
}
