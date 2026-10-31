/**
 * TEAM MEMBERS
 * ============
 * Controls the About & Team page. Updated from the AIS Member Profile Update form (2026–27).
 *
 * TO ADD A NEW TEAM MEMBER:
 * 1. Save their headshot photo to /public/team/ (portrait crop, about 900px wide; see scripts/process-headshots.py)
 * 2. Name the file in lowercase-kebab-case (e.g., "jane-doe.jpg"); avoid spaces in filenames
 * 3. Add a new entry to the relevant section below
 *
 * BIO FORMAT (keep every bio in this shape, about 35 to 60 words; check LinkedIn when updating):
 * 1. "[First name] is [AIS role] at AIS." Founders: "[First name] is a Co-Founder and former [role] of AIS."
 * 2. Current role, if any: "He works in [team] at [firm] in [city]." / "She is a [role] at [firm]."
 * 3. Past experience as plain facts, most relevant first, at most three firms:
 *    "He interned in [team] at [firm] in [city], ... and ..." or "He previously worked in ..."
 *    No "during his time at the society" or "prior to joining the society", no descriptions of
 *    individual projects, no virtual programmes, certificates, pre-college courses or shadowing.
 * 4. Optional: the next confirmed role, e.g. "He will join UBS in London as a Summer Analyst in summer 2027."
 * 5. "[First name] is a [nationality] national who speaks [languages]."
 *
 * NOTE: Within each division, the Head should always be the FIRST entry.
 *
 * photoPosition: (Optional) CSS object-position value to adjust the vertical
 *   crop of the headshot. Higher Y% crops more from the top (for photos with
 *   too much space above the head). Lower Y% preserves the top (for photos
 *   where the head is near the top edge). Default is "center 50%".
 */

const joschka = {
  name: "Joschka Feuerstein",
  photo: "/team/joschka-feuerstein.jpg",
  linkedin: "https://www.linkedin.com/in/joschka-feuerstein-68796b238/",
  email: null,
  bio: "Joschka is President of AIS and Head of Private Equity. He interned in strategy consulting at Bain & Company in Munich, in Strategy & Transactions at EY-Parthenon in Frankfurt and at KPMG. He will join UBS in London as a Global Banking Summer Analyst in summer 2027. Joschka is a German national who speaks German and English.",
};

const maxHenkes = {
  name: "Max Henkes",
  photo: "/team/max-henkes-2026.jpg",
  linkedin: "https://www.linkedin.com/in/maxhenkeshireme/",
  email: null,
  bio: "Max is Vice President of AIS and a Hedge Funds Analyst. He was a Venture Capital Analyst Intern at MätchVC, a deep tech pre-seed and seed fund in Stuttgart, and before that a Business Intern at AnyDesk. Max is a German national who speaks German, English, Russian and French.",
};

const samuel = {
  name: "Samuel Barta",
  photo: "/team/samuel-barta.jpg",
  linkedin: "https://www.linkedin.com/in/samuel-barta-43b807339/",
  email: null,
  bio: "Samuel is Head of the Real Assets Group at AIS, leading the Real Estate and Infrastructure divisions, and runs Spring Week Insights. He interned in the Group CFO's Office at Minor International in Bangkok and co-founded MRstrategies. Samuel is an Australian and Slovak national who speaks English, Czech and Slovak.",
};

// ── Founding Team (max 5) ──────────────────────────────────────────
export const founders = [
  {
    name: "Noah Junger",
    role: "Co-Founder",
    photo: "/team/noah-junger.jpg",
    linkedin: "https://www.linkedin.com/in/noah-junger-b53b1620a",
    email: null,
    bio: "Noah is a Co-Founder and former President of AIS. He works in Private Equity Real Estate at Blackstone in London. He previously worked in Private Equity Real Estate at EQT and Hines, and in Tech M&A at GP Bullhound. Noah is a German national who speaks German and English.",
    division: "founders",
  },
  {
    name: "Julius Majowski",
    role: "Co-Founder & Former President",
    photo: "/team/julius-majowski.jpg",
    linkedin: "https://www.linkedin.com/in/juliusmajowski/",
    email: null,
    bio: "Julius is a Co-Founder and former President of AIS. He interned in Tech M&A at Lincoln International, in M&A at Herax Partners in London and in the CEO Office at Enpal. He will join Jefferies, Rothschild & Co. and Qatalyst Partners for M&A internships. Julius is a German national who speaks English, German, Spanish and French.",
    division: "founders",
  },
  {
    name: "Lukas de La Trobe",
    role: "Co-Founder & Former Vice-President",
    photo: "/team/lukas-de-la-trobe.jpg",
    linkedin: "https://www.linkedin.com/in/lukas-de-la-trobe",
    email: null,
    bio: "Lukas is a Co-Founder and former Vice-President of AIS. He is a Private Equity Intern in Tech Growth & Buyout at Cathay Capital in Munich. He previously interned in M&A at Herax Partners in London and in strategy consulting at zeb. Lukas is a German national who speaks German and English.",
    division: "founders",
  },
  {
    name: "David Reuther",
    role: "Co-Founder",
    photo: "/team/david-reuther.jpg",
    linkedin: "https://www.linkedin.com/in/reuther/",
    email: null,
    bio: "David is a Co-Founder and former Head of Private Equity at AIS. He worked in private equity at Habanero Networks, R3 Asset Management Partners and BNP Paribas Asset Management, and in M&A advisory at Belgravia & Co. David is a German national who speaks German and English.",
    division: "founders",
  },
  {
    name: "David Nenning",
    role: "Co-Founder",
    photo: "/team/david-nenning.jpg",
    linkedin: "https://www.linkedin.com/in/david-nenning-7241b8277/",
    email: null,
    bio: "David is a Co-Founder and former Head of Venture Capital at AIS. He works as a Programme Analyst at Helsing in Munich. He previously worked in strategy consulting at Stern Stewart & Co., in M&A at Transfer Partners and as a VC Analyst at Innovis VC. David is a German national who speaks English and German.",
    division: "founders",
  },
];

// ── Society Leadership ─────────────────────────────────────────────
export const leadership = [
  { ...joschka, role: "President", division: "leadership" },
  { ...maxHenkes, role: "Vice President", division: "leadership" },
];

// ── Divisions (Head is always first entry) ─────────────────────────
export const divisions = {
  pe: {
    name: "Private Equity",
    members: [
      { ...joschka, role: "Head of Private Equity", division: "pe" },
      {
        name: "Pia-Marie Kraus",
        role: "Analyst",
        photo: "/team/pia-marie-kraus.jpg",
        linkedin: "https://www.linkedin.com/in/pia-marie-kraus",
        email: null,
        bio: "Pia-Marie is a Private Equity Analyst at AIS. She interned in Corporate Finance at Fresenius, completed Deutsche Bank's investment banking Spring Internship in Frankfurt and interned at Ashurst. She will join Deutsche Bank as an Equity Research Intern in summer 2027. Pia-Marie is a German national who speaks German, English, French and Spanish.",
        division: "pe",
      },
      {
        name: "Faisal Abu Ghoush",
        role: "Analyst",
        photo: "/team/faisal-abu-ghoush.jpg",
        linkedin: "https://www.linkedin.com/in/faisalabughoush/",
        email: null,
        bio: "Faisal is a Private Equity Analyst at AIS. He founded Intrivalo, an equity valuation platform, and co-founded Ajyal Collective, a not-for-profit that publishes independent equity research. Faisal is a Jordanian and Canadian national who speaks Arabic and English.",
        division: "pe",
      },
      {
        name: "Leanne Louise",
        role: "Analyst",
        photo: "/team/leanne-louise.jpg",
        linkedin: "https://www.linkedin.com/in/leannel7",
        email: null,
        bio: "Leanne is a Private Equity Analyst at AIS. She was a Research Assistant at Cambridge Judge Business School and took part in programmes at Big Four firms. Leanne speaks English and French.",
        division: "pe",
      },
      {
        name: "Ilian Rouibi",
        role: "Analyst",
        photo: "/team/ilian-rouibi.jpg",
        linkedin: "https://www.linkedin.com/in/iroubi75/",
        email: null,
        bio: "Ilian is a Private Equity Analyst at AIS. He is an M&A Analyst at Vantedge and MergerSight. Before that, he was a Spring Intern at Ardian, an M&A Analyst Intern in Deal Advisory at KPMG and a Financial Analyst Intern at BYD. Ilian is a French and Algerian national who speaks French and English.",
        division: "pe",
      },
    ],
  },
  vc: {
    name: "Venture Capital",
    members: [
      {
        name: "Florian Trepetschnigg",
        role: "Head of Venture Capital",
        photo: "/team/florian-trepetschnigg.jpg",
        linkedin: "https://www.linkedin.com/in/florian-trepetschnigg/",
        email: null,
        bio: "Florian is Head of Venture Capital at AIS. He works in go-to-market at Plato, an AI sales intelligence platform in Berlin. He previously worked in private credit at Allianz Global Investors and in venture capital at Elevator Ventures, and co-founded Hoodit, a merchandise platform acquired in 2023. Florian is an Austrian national who speaks German and English.",
        division: "vc",
      },
      {
        name: "Jasper Hadré",
        role: "Analyst",
        photo: "/team/jasper-hadre.jpg",
        linkedin: "https://www.linkedin.com/in/jasperhadre/",
        email: null,
        bio: "Jasper is a Venture Capital Analyst at AIS. He was Chief of Staff at Revent, a European impact VC fund in Berlin. He previously worked in go-to-market at Knowde in New York, in consulting at e.venture and as a Founders Associate at Mirantus Health. Jasper is a German national who speaks German, English and Spanish.",
        division: "vc",
      },
      {
        name: "David Kindt",
        role: "Analyst",
        photo: "/team/david-kindt.jpg",
        linkedin: "https://www.linkedin.com/in/d-kindt/",
        email: null,
        bio: "David is a Venture Capital Analyst at AIS. He interned in business innovation and corporate venture capital at Axel Springer in Berlin and is part of the START programme at Blue Factory, ESCP's incubator. David is a German national who speaks German and English.",
        division: "vc",
      },
      {
        name: "Kaspar Benedikt",
        role: "Analyst",
        photo: "/team/kaspar-benedikt.jpg",
        linkedin: "https://www.linkedin.com/in/kaspar-benedikt",
        email: null,
        bio: "Kaspar is a Venture Capital Analyst at AIS. He interned in Valuation at KPMG in Vienna, was a trainee at Innovis VC in Berlin and worked as a consultant at 180 Degrees Consulting. Kaspar is an Austrian national who speaks German, English and Spanish.",
        division: "vc",
      },
      {
        name: "Géraldine F. Beaud",
        role: "Analyst",
        photo: "/team/geraldine-beaud.jpg",
        linkedin: "https://www.linkedin.com/in/geraldine-beaud",
        email: null,
        bio: "Géraldine is a Venture Capital Analyst at AIS. She was a Visiting Analyst at Atlantic, a venture capital fund in Berlin, where she focused on university spinouts in the Swiss deep tech ecosystem. At 16 she co-founded a consumer goods brand, which she ran as COO. Géraldine is a Swiss national who speaks German, French, Spanish and English.",
        division: "vc",
      },
    ],
  },
  hf: {
    name: "Hedge Funds",
    members: [
      {
        name: "David Billiet",
        role: "Head of Hedge Funds",
        photo: "/team/david-billiet.jpg",
        linkedin: "https://www.linkedin.com/in/david-billiet/",
        email: null,
        bio: "David is Head of Hedge Funds at AIS. He interned in Private Markets at The Citco Group in London and in Portfolio Value Creation at Olaplex, an Advent International portfolio company. David is a Swiss and Irish national who speaks English and French.",
        division: "hf",
      },
      { ...maxHenkes, role: "Analyst", division: "hf" },
      {
        name: "Annabel Howard",
        role: "Analyst",
        photo: "/team/annabel-howard.jpg",
        linkedin: "https://www.linkedin.com/in/annabel-howard-040b53333/",
        email: null,
        bio: "Annabel is a Hedge Funds Analyst at AIS. She interned in Coverage and Investment Banking at Crédit Agricole CIB in Frankfurt and in operations at start-ups in Paris and London. She will join Morgan Stanley's Investment Banking Division in London as a Summer Analyst in summer 2027. Annabel is a German and Canadian national who speaks English, German and French.",
        division: "hf",
      },
      {
        name: "Kian Adham",
        role: "Analyst",
        photo: "/team/kian-adham.jpg",
        linkedin: "https://www.linkedin.com/in/kianadham",
        email: null,
        bio: "Kian is a Hedge Funds Analyst at AIS. He interned in corporate finance at BlomInvest Saudi Arabia in Riyadh and in credit analysis at Banco BAI Cabo Verde. Kian is an Austrian national who speaks German and English.",
        division: "hf",
      },
      {
        name: "Linus Deecke",
        role: "Analyst",
        photo: "/team/linus-deecke.jpg",
        linkedin: "https://www.linkedin.com/in/linusdeecke",
        email: null,
        bio: "Linus is a Hedge Funds Analyst at AIS. He was a Spring Intern at J.P. Morgan in London and interned in Portfolio Management at Glarner Kantonalbank and in Finance at Novartis. He also played volleyball professionally in Switzerland. Linus is a Swiss and French national who speaks German, English and French.",
        division: "hf",
      },
      {
        name: "Cian Michael Broderick",
        role: "Analyst",
        photo: "/team/cian-michael-broderick.jpg",
        linkedin: "https://www.linkedin.com/in/cian-michael-broderick-687984349/",
        email: null,
        bio: "Cian is a Hedge Funds Analyst at AIS. He interned in corporate finance at DoubleTree by Hilton and in investment funds and corporate law at BSP in Luxembourg. Cian is an Irish and Luxembourgish national who speaks English, French, German and Luxembourgish.",
        division: "hf",
      },
    ],
  },
  re: {
    name: "Real Estate",
    members: [
      { ...samuel, role: "Head of Real Estate", division: "re" },
      {
        name: "Hédi Zanzouri",
        role: "Analyst",
        photo: "/team/hedi-zanzouri.jpg",
        linkedin: "https://www.linkedin.com/in/hedizanzouri/",
        email: null,
        bio: "Hédi is a Real Estate Analyst at AIS. He interned in Investment and Fund Management at Principal Asset Management in Paris, in hotel investment at Hova Hospitality and in M&A at B&B Hotels. Hédi is a French and Tunisian national who speaks French and English.",
        division: "re",
      },
      {
        name: "Max Bruel",
        role: "Analyst",
        photo: "/team/max-bruel.jpg",
        linkedin: "https://www.linkedin.com/in/max-bruel/",
        email: null,
        bio: "Max is a Real Estate Analyst at AIS. He was a Real Estate Investments Summer Analyst at Azora in Madrid and interned in acquisitions and asset management at Westmont Hospitality Group in London. He also led the alternatives team of the UCL Investment Fund. Max speaks French, English and Spanish.",
        division: "re",
      },
      {
        name: "Solene Robinson",
        role: "Analyst",
        photo: "/team/solene-robinson.jpg",
        linkedin: "https://www.linkedin.com/in/solene-robinson",
        email: null,
        bio: "Solene is a Real Estate Analyst at AIS. She is a Girls Who Invest scholar and gained experience with the real estate team during its Investment Management Summer Intensive. She was also a Program Associate intern at HEC Paris. Solene is an American, French and British national who speaks English and French.",
        division: "re",
      },
    ],
  },
  pc: {
    name: "Private Credit",
    members: [
      {
        name: "Max Söderman",
        role: "Head of Private Credit",
        photo: "/team/max-soderman.jpg",
        linkedin: "https://www.linkedin.com/in/maxsoederman",
        email: null,
        bio: "Max is Head of Private Credit at AIS, after a year in the Venture Capital division. He worked in debt advisory at Kapitalförmedling in Stockholm. Max is a Swedish national who speaks Swedish and English.",
        division: "pc",
      },
      {
        name: "Gabriel Lustig",
        role: "Analyst",
        photo: "/team/gabriel-lustig.jpg",
        linkedin: "https://www.linkedin.com/in/gabriel-lustig-087986218",
        email: null,
        bio: "Gabriel is a Private Credit Analyst at AIS. He worked on the data team at Quartr for two years alongside his studies and was a Lending Officer at Swedbank in Stockholm, focusing on mortgage assessments and credit risk. Gabriel is a Swedish national who speaks Swedish and English.",
        division: "pc",
      },
      {
        name: "Henry Mehring",
        role: "Analyst",
        photo: "/team/henry-mehring.jpg",
        linkedin: "https://www.linkedin.com/in/henry-mehring-4622b3422",
        email: null,
        bio: "Henry is a Private Credit Analyst at AIS. He interned in strategy and operations at Rent.Group in Frankfurt and has run his own business since 2023. Henry is a German and American national who speaks German, English and French.",
        division: "pc",
      },
    ],
  },
  infra: {
    name: "Infrastructure",
    members: [
      { ...samuel, role: "Head of Infrastructure", division: "infra" },
      {
        name: "Charles Lemercier",
        role: "Analyst",
        photo: "/team/charles-lemercier.jpg",
        linkedin: "https://www.linkedin.com/in/charles-lemercier-05001b228",
        email: null,
        bio: "Charles is an Infrastructure Analyst at AIS. He was a Private Equity Summer Analyst in Fundraising and Sales at Ardian in Paris. He will join Veolia in Dubai as an M&A Infrastructure Intern in 2027. Charles is a French national who speaks French, English and Italian.",
        division: "infra",
      },
      {
        name: "Timon Hever",
        role: "Analyst",
        photo: "/team/timon-hever.jpg",
        linkedin: "https://www.linkedin.com/in/timonhever/",
        email: null,
        bio: "Timon is an Infrastructure Analyst at AIS. He was an Investment Analyst at Haltra Group, a single family office in Luxembourg, a Market Analyst at PwC's Asset & Wealth Management Research Centre and a Private Equity Intern at Calista Direct Investors. Timon is a Luxembourgish national who speaks English, French, German and Luxembourgish.",
        division: "infra",
      },
      {
        name: "Edward Hope",
        role: "Analyst",
        photo: "/team/edward-hope.jpg",
        linkedin: "https://www.linkedin.com/in/edwardhope",
        email: null,
        bio: "Edward is an Infrastructure Analyst at AIS. He interned in Energy Infrastructure Finance & Advisory at Société Générale CIB, with the pension fund team at Crédit Agricole Assurances in Paris and in real estate at Knight Frank in London. Edward is a British national who speaks English and French.",
        division: "infra",
      },
    ],
  },
  events: {
    name: "Events",
    members: [
    ],
  },
};

export const adminStaff = [];
