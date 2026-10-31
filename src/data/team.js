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
 * BIO FORMAT (keep every bio in this shape, about 40 to 80 words):
 * 1. "[First name] is [AIS role] at AIS."
 * 2. One or two sentences on real work experience (internships, jobs, ventures founded):
 *    "During his/her time at the society, ..." or "Prior to joining the society, ..."
 *    Leave out virtual experience programmes, certificates, pre-college courses and shadowing.
 * 3. Optional: the next confirmed role, e.g. "He will join UBS in London as a Summer Analyst in summer 2027."
 * 4. "[First name] is a [nationality] national who speaks [languages]."
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
  bio: "Joschka is President of AIS and Head of Private Equity. During his time at the society, he gained experience at Bain & Company, where he worked as an Intern in Munich on the strategic transformation of a leading German semiconductor manufacturer. He will join UBS in London as a Global Banking Summer Analyst in summer 2027. Joschka is a German national who speaks German and English.",
};

const maxHenkes = {
  name: "Max Henkes",
  photo: "/team/max-henkes-2026.jpg",
  linkedin: null,
  email: null,
  bio: "Max is Vice President of AIS and a Hedge Funds Analyst. He gained venture capital experience at MätchVC, a deep tech pre-seed and seed fund in Stuttgart, where he worked on sourcing, due diligence and investment memos across quantum, photonics, robotics and AI infrastructure. Before that, he was a Business Intern at AnyDesk. Max is a German national who speaks German, English, Russian and French.",
};

const samuel = {
  name: "Samuel Barta",
  photo: "/team/samuel-barta.jpg",
  linkedin: "https://www.linkedin.com/in/samuel-barta-43b807339/",
  email: null,
  bio: "Samuel is Head of the Real Assets Group at AIS, leading the Real Estate and Infrastructure divisions, and is part of the Events team, where he runs Spring Week Insights. During his time at the society, he gained experience at Minor International as a Finance Intern in the Group CFO's Office in Thailand. Samuel is an Australian and Slovak national who speaks English, Czech and Slovak.",
};

// ── Founding Team (max 5) ──────────────────────────────────────────
export const founders = [
  {
    name: "Noah Junger",
    role: "Co-Founder",
    photo: "/team/noah-junger.jpg",
    linkedin: "https://www.linkedin.com/in/noah-junger-b53b1620a",
    email: null,
    bio: "Noah is a Co-Founder and former President of AIS. During his time at the society, he gained experience at EQT Group, where he worked in the Real Estate Acquisitions team in London. Noah is a German national who speaks German and English.",
    division: "founders",
  },
  {
    name: "Julius Majowski",
    role: "Co-Founder & Former President",
    photo: "/team/julius-majowski.jpg",
    linkedin: "https://www.linkedin.com/in/juliusmajowski/",
    email: null,
    bio: "Julius is a Co-Founder and former President of AIS. During his time at the society, he gained M&A experience at Herax Partners and Lincoln International. He will join Jefferies, Rothschild & Co. and Qatalyst Partners for M&A internships. Julius is a German national who speaks English, German, Spanish and French.",
    division: "founders",
  },
  {
    name: "Lukas de La Trobe",
    role: "Co-Founder & Former Vice-President",
    photo: "/team/lukas-de-la-trobe.jpg",
    linkedin: "https://www.linkedin.com/in/lukas-de-la-trobe",
    email: null,
    bio: "Lukas is a Co-Founder and former Vice-President of AIS. During his time at the society, he gained experience across consulting and M&A at zeb and Herax Partners. He is currently a Private Equity Intern at Cathay Capital in Munich. Lukas is a German national who speaks German and English.",
    division: "founders",
  },
  {
    name: "David Reuther",
    role: "Co-Founder",
    photo: "/team/david-reuther.jpg",
    linkedin: "https://www.linkedin.com/in/reuther/",
    email: null,
    bio: "David is a Co-Founder and former Head of Private Equity at AIS. He has worked in M&A advisory and infrastructure private equity, and during his time at the society he gained experience in the Private Equity team at BNP Paribas. David is a German national who speaks German and English.",
    division: "founders",
  },
  {
    name: "David Nenning",
    role: "Co-Founder",
    photo: "/team/david-nenning.jpg",
    linkedin: "https://www.linkedin.com/in/david-nenning-7241b8277/",
    email: null,
    bio: "David is a Co-Founder and former Head of Venture Capital at AIS. During his time at the society, he gained experience at Stern & Stewart, where he worked in the strategy team in Munich. David is a German national who speaks English and German.",
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
        bio: "Pia-Marie is a Private Equity Analyst at AIS. During her time at the society, she gained experience in the Corporate Finance team at Fresenius in Germany, completed Deutsche Bank's Spring Week Programme in Frankfurt and previously interned at Ashurst. She will join Deutsche Bank as an Equity Research Intern in summer 2027. Pia-Marie is a German national who speaks German, English, French and Spanish.",
        division: "pe",
      },
      {
        name: "Faisal Abu Ghoush",
        role: "Analyst",
        photo: "/team/faisal-abu-ghoush.jpg",
        linkedin: "https://www.linkedin.com/in/faisalabughoush/",
        email: null,
        bio: "Faisal is a Private Equity Analyst at AIS. He is the founder of Intrivalo, an equity valuation platform launched in 2026, and in 2025 co-founded Ajyal Collective, a not-for-profit that publishes independent equity research across five sectors. Faisal is a Jordanian and Canadian national who speaks Arabic and English.",
        division: "pe",
      },
      {
        name: "Leanne Louise",
        role: "Analyst",
        photo: "/team/leanne-louise.jpg",
        linkedin: "https://www.linkedin.com/in/leannel7",
        email: null,
        bio: "Leanne is a Private Equity Analyst at AIS. Prior to joining the society, she took part in programmes at Big Four firms and volunteers at Private Equity Insights. Leanne speaks English and French.",
        division: "pe",
      },
      {
        name: "Ilian Rouibi",
        role: "Analyst",
        photo: "/team/ilian-rouibi.jpg",
        linkedin: "https://www.linkedin.com/in/iroubi75/",
        email: null,
        bio: "Ilian is a Private Equity Analyst at AIS. Since October 2026 he has been an M&A Analyst at Vantedge and MergerSight. Before that, he was a Private Equity Spring Analyst at Ardian, an M&A Analyst intern at KPMG Deal Advisory and a Financial Analyst intern at BYD Europe. Ilian is a French and Algerian national who speaks French and English.",
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
        bio: "Florian is Head of Venture Capital at AIS. Before joining the society, he co-founded Hoodit, a B2B platform digitising merchandise projects that was acquired in 2023. He gained venture capital experience at Elevator Ventures, worked in private credit at Allianz Global Investors, and since summer 2026 has been part of the go-to-market team at Plato, an Atomico-backed AI sales intelligence platform. Florian is an Austrian national who speaks German and English.",
        division: "vc",
      },
      {
        name: "Jasper Hadré",
        role: "Analyst",
        photo: "/team/jasper-hadre.jpg",
        linkedin: "https://www.linkedin.com/in/jasperhadre/",
        email: null,
        bio: "Jasper is a Venture Capital Analyst at AIS. From November 2025 to September 2026 he was Chief of Staff and Investor at Revent, a European impact VC fund. He previously worked in management consulting at e.venture, in go-to-market at Sequoia-backed Knowde in New York, and as a Founders Associate at the Berlin healthtech company Mirantus. Jasper is a German national who speaks German, English and Spanish.",
        division: "vc",
      },
      {
        name: "David Kindt",
        role: "Analyst",
        photo: "/team/david-kindt.jpg",
        linkedin: "https://www.linkedin.com/in/d-kindt/",
        email: null,
        bio: "David is a Venture Capital Analyst at AIS. During his time at the society, he gained experience in the Business Innovation & Ventures team at Axel Springer, working on venture evaluation and M&A due diligence. He is currently part of the START programme at Blue Factory, ESCP's incubator. David is a German national who speaks German and English.",
        division: "vc",
      },
      {
        name: "Kaspar Benedikt",
        role: "Analyst",
        photo: "/team/kaspar-benedikt.jpg",
        linkedin: "https://www.linkedin.com/in/kaspar-benedikt",
        email: null,
        bio: "Kaspar is a Venture Capital Analyst at AIS. Prior to joining the society, he interned in Deal Advisory (Valuation) at KPMG in Vienna. Kaspar is an Austrian national who speaks German, English and Spanish.",
        division: "vc",
      },
      {
        name: "Géraldine F. Beaud",
        role: "Analyst",
        photo: "/team/geraldine-beaud.jpg",
        linkedin: "https://www.linkedin.com/in/geraldine-beaud",
        email: null,
        bio: "Géraldine is a Venture Capital Analyst at AIS. Prior to joining the society, she interned at Atlantic VC in Berlin, where she supported the investment team and focused on university spinouts in the Swiss deep tech ecosystem. Géraldine is a Swiss national who speaks German, French, Spanish and English.",
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
        bio: "David is Head of Hedge Funds at AIS. During his time at the society, he gained experience at The Citco Group, where he worked as a Summer Intern in Private Markets Services in London. Previously, he was a Summer Intern in Portfolio Value Creation at Olaplex, backed by Advent International, in London. David is a Swiss and Irish national who speaks English and French.",
        division: "hf",
      },
      { ...maxHenkes, role: "Analyst", division: "hf" },
      {
        name: "Annabel Howard",
        role: "Analyst",
        photo: "/team/annabel-howard.jpg",
        linkedin: "https://www.linkedin.com/in/annabel-howard-040b53333/",
        email: null,
        bio: "Annabel is a Hedge Funds Analyst at AIS. From May to July 2026, she interned in the Industrials and Capital Goods Coverage team at Crédit Agricole CIB in Frankfurt. She will join Morgan Stanley's Investment Banking Division in London as a Summer Analyst in summer 2027. Annabel is a German and Canadian national who speaks English, German and French.",
        division: "hf",
      },
      {
        name: "Kian Adham",
        role: "Analyst",
        photo: "/team/kian-adham.jpg",
        linkedin: "https://www.linkedin.com/in/kianadham",
        email: null,
        bio: "Kian is a Hedge Funds Analyst at AIS. He completed a corporate finance internship at BlomInvest Saudi Arabia in Riyadh, working on financial models and pitch materials for M&A and financing mandates, and was a credit analysis intern at Banco BAI Cabo Verde, where he extended the bank's internal credit model. Kian is an Austrian national who speaks German and English.",
        division: "hf",
      },
      {
        name: "Linus Deecke",
        role: "Analyst",
        photo: "/team/linus-deecke.jpg",
        linkedin: "https://www.linkedin.com/in/linusdeecke",
        email: null,
        bio: "Linus is a Hedge Funds Analyst at AIS, focusing on equity research. Prior to joining the society, he took part in J.P. Morgan's Spring Week in London and gained experience in Portfolio Management at GLKB and in Finance at Novartis. He also has a background in professional volleyball. Linus is a Swiss and French national who speaks German, English and French.",
        division: "hf",
      },
      {
        name: "Cian Michael Broderick",
        role: "Analyst",
        photo: "/team/cian-michael-broderick.jpg",
        linkedin: "https://www.linkedin.com/in/cian-michael-broderick-687984349/",
        email: null,
        bio: "Cian is a Hedge Funds Analyst at AIS. Prior to joining the society, he completed a finance and accounting internship at DoubleTree by Hilton and a legal internship at BSP in Luxembourg. Cian is an Irish and Luxembourgish national who speaks English, French, German and Luxembourgish.",
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
        bio: "Hédi is a Real Estate Analyst at AIS. He was previously an Investment and Fund Management Analyst Intern at Principal Asset Management in Paris, a Hotel Investment Analyst Intern at Hova Hospitality, and an M&A Analyst Intern at B&B Hotels. Hédi is a French and Tunisian national who speaks French and English.",
        division: "re",
      },
      {
        name: "Max Bruel",
        role: "Analyst",
        photo: "/team/max-bruel.jpg",
        linkedin: "https://www.linkedin.com/in/max-bruel/",
        email: null,
        bio: "Max is a Real Estate Analyst at AIS. He was a Real Estate Private Equity Summer Analyst at Azora Capital, focusing on senior living, and worked in hotel investments and asset management at Westmont Hospitality Group. Max speaks French, English and Spanish.",
        division: "re",
      },
      {
        name: "Rafael Flaig",
        role: "Analyst",
        photo: "/team/rafael-flaig.jpg",
        linkedin: "https://www.linkedin.com/in/rafael-flaig1",
        email: null,
        bio: "Rafael is a Real Estate Analyst at AIS. In August 2025, he worked as a Finance & Investment Intern at RB Capital in Singapore, gaining experience in financial analysis, budgeting and real estate investments. Rafael is a German national who speaks German and English, with knowledge of Mandarin and French.",
        division: "re",
      },
      {
        name: "Solene Robinson",
        role: "Analyst",
        photo: "/team/solene-robinson.jpg",
        linkedin: "https://www.linkedin.com/in/solene-robinson",
        email: null,
        bio: "Solene is a Real Estate Analyst at AIS. In summer 2026, she took part in the Girls Who Invest Investment Management Summer Intensive Program, where she gained experience with the real estate team. Solene is an American, French and British national who speaks English and French.",
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
        bio: "Max is Head of Private Credit at AIS, having previously been part of the Venture Capital division from October 2025 to August 2026. From May to August 2026, he worked as a Debt Advisory Analyst at Kapitalförmedling in Stockholm. Max is a Swedish national who speaks Swedish and English.",
        division: "pc",
      },
      {
        name: "Gabriel Lustig",
        role: "Analyst",
        photo: "/team/gabriel-lustig.jpg",
        linkedin: "https://www.linkedin.com/in/gabriel-lustig-087986218",
        email: null,
        bio: "Gabriel is a Private Credit Analyst at AIS. In summer 2026, he interned as a Data Analyst at Quartr, working with financial data on listed companies, and he previously worked as a Lending Officer at Swedbank, focusing on mortgage assessments and credit risk. Gabriel is a Swedish national who speaks Swedish and English.",
        division: "pc",
      },
      {
        name: "Henry Mehring",
        role: "Analyst",
        photo: "/team/henry-mehring.jpg",
        linkedin: "https://www.linkedin.com/in/henry-mehring-4622b3422",
        email: null,
        bio: "Henry is a Private Credit Analyst at AIS. He joined the society in the first year of his Bachelor's programme and plans to intern at a German M&A boutique in summer 2027. Henry is a German and American national who speaks German, English and French.",
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
        bio: "Charles is an Infrastructure Analyst at AIS. Prior to joining the society, he gained experience in the Fundraising and Sales team at Ardian in Paris. In 2027, he will join Veolia in Dubai as an M&A Infrastructure Intern. Charles is a French national who speaks French, English and Italian.",
        division: "infra",
      },
      {
        name: "Timon Hever",
        role: "Analyst",
        photo: "/team/timon-hever.jpg",
        linkedin: "https://www.linkedin.com/in/timonhever/",
        email: null,
        bio: "Timon is an Infrastructure Analyst at AIS. Prior to joining the society, he was a Private Equity Intern at Calista Direct Investors, a Market Analyst at PwC's Asset & Wealth Management Research Centre, and an Investment Analyst at Haltra Group, a single family office in Luxembourg. Timon is a Luxembourgish national who speaks English, French, German and Luxembourgish.",
        division: "infra",
      },
      {
        name: "Edward Hope",
        role: "Analyst",
        photo: "/team/edward-hope.jpg",
        linkedin: "https://www.linkedin.com/in/edwardhope",
        email: null,
        bio: "Edward is an Infrastructure Analyst at AIS. He recently worked in the Energy Infrastructure team at Société Générale CIB in London. Edward is a British national who speaks English and French.",
        division: "infra",
      },
    ],
  },
  events: {
    name: "Events",
    members: [
      {
        name: "Theodor Kisslinger",
        role: "Head of Events",
        photo: "/team/theodor-kisslinger.jpeg",
        linkedin: "https://www.linkedin.com/in/theodor-kisslinger",
        email: "theodor.kisslinger@edu.escp.eu",
        bio: "Theodor is Head of Events at AIS. Prior to his time at the society, he gained experience at UBS and Macquarie, where he worked in M&A in Frankfurt. Theodor is a German national who speaks German and English.",
        division: "events",
      },
    ],
  },
};

export const adminStaff = [];
