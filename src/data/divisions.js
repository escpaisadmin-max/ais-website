/**
 * DIVISIONS
 * =========
 * Department descriptions for the About page.
 *
 * FIELDS:
 * - id:          Unique key (used for filtering and URL params)
 * - name:        Full display name
 * - shortName:   Abbreviated name for tags/pills
 * - description: 2-3 sentence overview of the division's focus
 * - icon:        Emoji or icon identifier
 */
export const divisions = [
  {
    id: "pe",
    name: "Private Equity",
    shortName: "PE",
    description:
      "Our Private Equity division explores buyout strategies, LBO modeling, and value creation in portfolio companies. Members gain hands-on experience with deal analysis and due diligence processes.",
    icon: "briefcase",
  },
  {
    id: "vc",
    name: "Venture Capital",
    shortName: "VC",
    description:
      "The Venture Capital division focuses on startup ecosystems, early-stage investing, and emerging technology trends. Members learn to evaluate pitch decks, assess market opportunities, and understand VC fund mechanics.",
    icon: "rocket",
  },
  {
    id: "hf",
    name: "Hedge Funds",
    shortName: "HF",
    description:
      "Our Hedge Funds division covers quantitative and fundamental strategies across public markets. Members study market analysis, risk management, and portfolio construction techniques.",
    icon: "chart",
  },
  {
    id: "re",
    name: "Real Estate",
    shortName: "RE",
    description:
      "The Real Estate division examines property investment, REIT analysis, and real asset valuation. Members explore commercial and residential market dynamics across European markets.",
    icon: "building",
  },
  {
    id: "pc",
    name: "Private Credit",
    shortName: "PC",
    description:
      "The Private Credit division studies direct lending, debt advisory and credit analysis for European companies. Members learn to assess credit risk, structure financing and understand how private debt funds generate returns.",
    icon: "credit",
  },
  {
    id: "infra",
    name: "Infrastructure",
    shortName: "Infra",
    description:
      "The Infrastructure division covers energy, transport, digital and social infrastructure. Members analyse long-term contracted cash flows, project finance structures and the funds that invest in essential assets.",
    icon: "infrastructure",
  },
];

// Publication filters use the same departments as the About page.
export const publicationDepartments = divisions;
