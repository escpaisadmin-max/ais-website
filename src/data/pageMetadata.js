import { events } from "./events.js";
import { divisionFor, isoDate, libraries } from "../lib/publications.js";

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

const kindDescriptions = {
  presentations: "an educational presentation",
  newsletters: "a newsletter",
  founderReports: "a Founder Report",
};

// The same PDF published in two libraries gets one canonical page (the first library).
const titleKey = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
function duplicateOf(libraryKey, item) {
  const order = Object.keys(libraries);
  for (const other of order.slice(0, order.indexOf(libraryKey))) {
    const match = libraries[other].items.find((candidate) => titleKey(candidate.title) === titleKey(item.title));
    if (match) return `${libraries[other].route}/${encodeURIComponent(match.id)}`;
  }
  return null;
}

const publicationPages = (libraryKey) => libraries[libraryKey].items.map((item) => {
  const division = divisionFor(item);
  const team = division && libraryKey !== "founderReports" ? ` by the ${division.name} team` : "";
  return {
    path: `${libraries[libraryKey].route}/${encodeURIComponent(item.id)}`,
    canonicalPath: duplicateOf(libraryKey, item),
    title: `${item.title} | AIS`,
    description: item.description || `${item.title}: ${kindDescriptions[libraryKey]}${team} of ${siteName}, with a full text version and PDF.`,
    type: "article",
    publication: { libraryKey, item },
  };
});

export const sitePages = [
  ...sections.map(([path, title, description]) => ({
    path,
    title: path === "/" ? title : `${title} | AIS`,
    description,
    type: "website",
  })),
  ...publicationPages("presentations"),
  ...publicationPages("newsletters"),
  ...publicationPages("founderReports"),
  ...events.map((event) => ({
    path: `/events/${encodeURIComponent(event.slug)}`,
    title: `${event.title} | AIS`,
    description: event.description || event.title,
    type: "website",
  })),
];

const organization = {
  "@type": "Organization",
  "@id": `${siteOrigin}/#organization`,
  name: siteName,
  alternateName: ["AIS", "ESCP AIS"],
  url: `${siteOrigin}/`,
  logo: { "@type": "ImageObject", url: `${siteOrigin}/ais-logo-512.png`, width: 512, height: 512 },
  description: "Student society at ESCP Business School focused on alternative investments: private equity, venture capital, hedge funds, real estate, private credit and infrastructure.",
  parentOrganization: { "@type": "CollegeOrUniversity", name: "ESCP Business School", url: "https://escp.eu/" },
  sameAs: ["https://www.linkedin.com/company/escpais/", "https://campuslife.escp.eu/ldnrealestate/home/"],
};

const jsonLd = (data) => ({ tag: "script", type: "application/ld+json", text: JSON.stringify(data) });

function publicationSchema(page) {
  const { libraryKey, item } = page.publication;
  const library = libraries[libraryKey];
  const url = `${siteOrigin}${page.path}`;
  const published = isoDate(item.date);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": libraryKey === "founderReports" ? "Report" : "Article",
        "@id": `${url}#publication`,
        headline: item.title,
        name: item.title,
        description: page.description,
        url,
        mainEntityOfPage: url,
        ...(published ? { datePublished: published } : {}),
        inLanguage: "en",
        author: organization,
        publisher: organization,
        isAccessibleForFree: true,
        ...(item.pageCount ? { numberOfPages: item.pageCount } : {}),
        encoding: { "@type": "MediaObject", contentUrl: `${siteOrigin}${item.pdfPath}`, encodingFormat: "application/pdf" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteOrigin}/` },
          { "@type": "ListItem", position: 2, name: library.listLabel, item: `${siteOrigin}${library.route}` },
          { "@type": "ListItem", position: 3, name: item.title, item: url },
        ],
      },
    ],
  };
}

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
      { tag: "link", rel: "canonical", href: `${siteOrigin}${page.canonicalPath || page.path}` },
      { tag: "meta", property: "og:url", content: `${siteOrigin}${page.canonicalPath || page.path}` },
    );
  }
  if (path === "/") {
    tags.push(jsonLd({
      "@context": "https://schema.org",
      "@graph": [organization, {
        "@type": "WebSite",
        "@id": `${siteOrigin}/#website`,
        name: siteName,
        alternateName: "AIS",
        url: `${siteOrigin}/`,
        publisher: { "@id": organization["@id"] },
        inLanguage: "en",
      }],
    }));
  }
  if (page?.publication) tags.push(jsonLd(publicationSchema(page)));
  return tags;
}
