/**
 * TEAM MEMBERS
 * ============
 * Controls the About & Team page.
 *
 * TO ADD A NEW TEAM MEMBER:
 * 1. Save their headshot photo to /public/team/ (square or portrait crop, min 400px wide recommended)
 * 2. Rename the file to lowercase-kebab-case (e.g., "jane-doe.jpg") — avoid spaces in filenames
 * 3. Add a new entry to the relevant section below
 *
 * NOTE: Within each division, the Head should always be the FIRST entry.
 */

// ── Founding Team (max 5) ──────────────────────────────────────────
export const founders = [
  {
    name: "Noah Junger",
    role: "Co-Founder",
    photo: "/team/noah-junger.jpg",
    linkedin: "https://www.linkedin.com/in/noah-junger-b53b1620a",
    email: null,
    bio: "Noah is a Co-Founder and former President at AIS. During his time at the society, he gained experience at EQT Group, where he worked in the Real Estate Acquisitions team in London. He will be joining Blackstone as a Real Estate Private Equity Intern this summer. Noah is a German national who speaks German and English.",
    division: "founders",
  },
  {
    name: "Julius Majowski",
    role: "Co-Founder & President",
    photo: "/team/julius-majowski.jpg",
    linkedin: "https://www.linkedin.com/in/juliusmajowski/",
    email: null,
    bio: "Julius is a Co-Founder, President and Head of Hedge Funds at AIS. During his time at the society, he gained experience at Herax Partners, where he worked in the M&A team in London. He will be joining Lincoln International as a Tech M&A Analyst this summer. Julius is a German national who speaks English, German, and Spanish.",
    division: "founders",
  },
  {
    name: "Lukas de La Trobe",
    role: "Co-Founder & Vice-President",
    photo: "/team/lukas-de-la-trobe.jpg",
    linkedin: "https://www.linkedin.com/in/lukas-de-la-trobe",
    email: null,
    bio: "Lukas is a Co-Founder and Vice-President at AIS. During his time at the society, he gained experience at zeb Consulting, working in the Strategy & Organization team in Frankfurt. He will be joining Herax Partners as an M&A Analyst this summer. Lukas is a German national who speaks German and English.",
    division: "founders",
  },
  {
    name: "David Reuther",
    role: "Co-Founder",
    photo: "/team/david-reuther.jpeg",
    linkedin: "https://www.linkedin.com/in/reuther/",
    email: null,
    bio: "David is a Co-Founder and former Head of Private Equity at AIS. During his time at the society, he gained experience at BNP Paribas, where he worked in the Private Equity team. David is a German national who speaks English and German.",
    division: "founders",
  },
  {
    name: "David Nenning",
    role: "Co-Founder & Head of Venture Capital",
    photo: "/team/david-nenning.jpg",
    linkedin: "https://www.linkedin.com/in/david-nenning-7241b8277/",
    email: null,
    bio: "David is a Co-Founder and Head of Venture Capital at AIS. During his time at the society, he gained experience at Stern & Stewart, working in the Strategy team in Munich. He will be joining Helsing, a leading European defense technology startup, this summer. David is a German national who speaks English and German.",
    division: "founders",
  },
];

// ── Divisions (Head is always first entry) ─────────────────────────
export const divisions = {
  pe: {
    name: "Private Equity",
    members: [
      {
        name: "Philipp Roselieb",
        role: "Head of Private Equity",
        photo: "/team/philipp-roselieb.jpeg",
        linkedin: "https://www.linkedin.com/in/philipp-r-6824b922b",
        email: null,
        bio: "Philipp is Head of Private Equity at AIS. During his time at the society, he gained experience at KPMG, where he worked in the M&A team in Munich. He will be joining UBS as an M&A Analyst this summer. Philipp is a German national who speaks German and English.",
        division: "pe",
      },
      {
        name: "Joschka Feuerstein",
        role: "Analyst",
        photo: "/team/joschka-feuerstein.jpg",
        linkedin: "https://www.linkedin.com/in/joschka-feuerstein-68796b238/",
        email: null,
        bio: "Joschka is a Private Equity Analyst at AIS. During his time at the society, he gained experience at EY-Parthenon, where he worked in the Strategy and Transactions team in Germany. He will be joining Bain & Company as an Associate Consultant Intern this summer. Joschka is a German national who speaks German and English.",
        division: "pe",
      },
      {
        name: "Pia-Marie Kraus",
        role: "Analyst",
        photo: "/team/pia-marie-kraus.jpeg",
        linkedin: "https://www.linkedin.com/in/pia-marie-kraus",
        email: null,
        bio: "Pia-Marie is a Private Equity Analyst at AIS. Prior to joining the society, she completed an internship at the law practice Ashurst in Frankfurt. She has since participated in the Spring Week Program at Deutsche Bank in Frankfurt. Pia-Marie is a German national who speaks German, English, French, and Spanish.",
        division: "pe",
      },
      {
        name: "Joséphine Schroeder",
        role: "Analyst",
        photo: "/team/josephine-schroeder.jpeg",
        linkedin: "https://www.linkedin.com/in/josephine-schroeder/",
        email: null,
        bio: "Joséphine is a Private Equity Analyst at AIS. Prior to her time at the society, she gained experience at Rothschild & Co and at Ardian, where she worked in the Expansion team in Frankfurt. She will be joining Triton as a Private Equity Intern this summer. Joséphine is a German and French national who speaks English, German, and French.",
        division: "pe",
      },
      {
        name: "Eloah Brummund",
        role: "Analyst",
        photo: "/team/eloah-brummund.jpg",
        linkedin: "https://www.linkedin.com/in/eloah-b-130766220",
        email: null,
        bio: "Eloah is a Private Equity Analyst at AIS. Prior to his time at the society, he gained experience at DBAG and at Ardian, where he worked in the Buyout team in Frankfurt. He is currently a Visiting Analyst at CMAR Ventures. Eloah is a German national who speaks German, English, and French.",
        division: "pe",
      },
    ],
  },
  vc: {
    name: "Venture Capital",
    members: [
      {
        name: "David Nenning",
        role: "Head of Venture Capital",
        photo: "/team/david-nenning.jpg",
        linkedin: "https://www.linkedin.com/in/david-nenning-7241b8277/",
        email: null,
        bio: "David is a Co-Founder and Head of Venture Capital at AIS. During his time at the society, he gained experience at Stern & Stewart, working in the Strategy team in Munich. He will be joining Helsing, a leading European defense technology startup, this summer. David is a German national who speaks English and German.",
        division: "vc",
      },
      {
        name: "Max Söderman",
        role: "Analyst",
        photo: "/team/max-soderman.png",
        linkedin: "https://www.linkedin.com/in/maxsoederman",
        email: null,
        bio: "Max is a Venture Capital Analyst at AIS. Prior to joining the society, he gained experience at Wall Street Oasis, where he worked in the Financial Research team. He will be joining Kapital Förmedling as a Debt Advisory Intern this summer. Max is a Swedish national who speaks Swedish and English.",
        division: "vc",
      },
      {
        name: "Richard Križan",
        role: "Analyst",
        photo: "/team/richard-krizan.jpeg",
        linkedin: "https://www.linkedin.com/in/richard-kri%C5%BEan-3aa53a252",
        email: null,
        bio: "Richard is a Venture Capital Analyst at AIS. Prior to his time at the society, he gained experience at PurposeTech Capital, where he worked in the Investment team. He will be joining Inven Capital as a Venture Analyst this summer. Richard is a Slovak national who speaks English, Slovak, and Czech.",
        division: "vc",
      },
      {
        name: "Florian Trepetschnigg",
        role: "Analyst",
        photo: "/team/florian-trepetschnigg.jpeg",
        linkedin: "https://www.linkedin.com/in/florian-trepetschnigg/",
        email: null,
        bio: "Florian is a Venture Capital Analyst at AIS. Prior to joining the society, he co-founded Hoodit, a B2B SaaS platform for merchandise. He has since gained experience in VC at Elevator Ventures and in Private Credit at Allianz Global Investors. He will be joining Plato, an early-stage software company building for wholesale distributors, this summer. Florian is an Austrian national who speaks German and English.",
        division: "vc",
      },
      {
        name: "Thomas Longuet",
        role: "Analyst",
        photo: "/team/thomas-longuet.jpeg",
        linkedin: "https://www.linkedin.com/in/thomas-longuet-8101431b0/",
        email: null,
        bio: "Thomas is a Venture Capital Analyst at AIS. Prior to joining the society, he gained experience at several investment funds in San Francisco (G Squared and Mach49) as a Venture Capital Analyst, as well as at the investment arm of a CAC 40 company, Capgemini. He will be joining Avolta Partners as a Tech M&A Analyst this summer. Thomas is a French national who speaks French, English, and Spanish.",
        division: "vc",
      },
      {
        name: "Simon Putzer",
        role: "Analyst",
        photo: "/team/simon-putzer.jpg",
        linkedin: "https://www.linkedin.com/in/simon-putzer-867026255/",
        email: null,
        bio: "Simon is a Venture Capital Analyst at AIS. During his time at the society, he gained experience at Clearwater International, where he worked in the Industrials and Consumer team in Frankfurt. Simon is a German national who speaks English and French.",
        division: "vc",
      },
      {
        name: "Antonio Trenn",
        role: "Analyst",
        photo: "/team/antonio-trenn.jpg",
        linkedin: "https://www.linkedin.com/in/antonio-trenn-b349b9299/",
        email: null,
        bio: "Antonio is a Venture Capital Analyst at AIS. During his time at the society, he gained experience at Fortlane Partners, where he worked in the Private Equity Consulting team. He will be joining Noteus Partners as a Growth Equity Intern this summer. Antonio is a German national who speaks German and English.",
        division: "vc",
      },
    ],
  },
  hf: {
    name: "Hedge Funds",
    members: [
      {
        name: "Julius Majowski",
        role: "Head of Hedge Funds",
        photo: "/team/julius-majowski.jpg",
        linkedin: "https://www.linkedin.com/in/juliusmajowski/",
        email: null,
        bio: "Julius is a Co-Founder, President and Head of Hedge Funds at AIS. During his time at the society, he gained experience at Herax Partners, where he worked in the M&A team in London. He will be joining Lincoln International as a Tech M&A Analyst this summer. Julius is a German national who speaks English, German, and Spanish.",
        division: "hf",
      },
      {
        name: "Max Henkes",
        role: "Analyst",
        photo: "/team/placeholder.svg",
        linkedin: "https://linkedin.com/in/example",
        email: null,
        bio: "Max is a Hedge Fund Analyst at AIS. Prior to his time at AIS, he gained experience at a German family office and at a deep tech venture capital fund, focusing on healthcare and technology. Max is a German national who speaks German, English, and Russian.",
        division: "hf",
      },
      {
        name: "David Kindt",
        role: "Analyst",
        photo: "/team/david-kindt.jpeg",
        linkedin: "https://www.linkedin.com/in/d-kindt/",
        email: null,
        bio: "David is a Hedge Fund Analyst at AIS. Prior to joining the society, he founded BLK, an online shop for vintage clothing. He will be joining the Ventures team at Axel Springer this summer. David is a German national who speaks German and English.",
        division: "hf",
      },
      {
        name: "David Billiet",
        role: "Analyst",
        photo: "/team/david-billiet.jpg",
        linkedin: "https://www.linkedin.com/in/david-billiet/",
        email: null,
        bio: "David is a Hedge Fund Analyst at AIS. Prior to joining the society, he gained experience at Olaplex, backed by private equity firm Advent International, where he worked in the Sales and Finance team in London. David is a Swiss national who speaks English and French.",
        division: "hf",
      },
    ],
  },
  re: {
    name: "Real Estate",
    members: [
      {
        name: "Gustav Graner",
        role: "Head of Real Estate",
        photo: "/team/gustav-graner.jpeg",
        linkedin: "https://www.linkedin.com/in/gustavgraner",
        email: null,
        bio: "Gustav is Head of Real Estate at AIS. During his time at the society, he gained experience at Sagax AB, where he worked in the Real Estate Investment team in Paris. He will be joining EQT as a Real Estate Private Equity Intern this summer. Gustav is a Swedish national who speaks English, Swedish, and French.",
        division: "re",
      },
      {
        name: "Samuel Barta",
        role: "Analyst",
        photo: "/team/samuel-barta.jpg",
        linkedin: "https://www.linkedin.com/in/samuel-barta-43b807339",
        email: null,
        bio: "Samuel is a Real Estate Analyst at AIS. During his time at the society, he participated in the Spring Week Program at Blackstone and will be joining Minor Hotels as a Finance Intern this summer. Samuel is an Australian and Slovak national who speaks English, Czech, and Slovak.",
        division: "re",
      },
      {
        name: "Solene Robinson",
        role: "Analyst",
        photo: "/team/solene-robinson.jpeg",
        linkedin: "https://www.linkedin.com/in/solene-robinson",
        email: null,
        bio: "Solene is a Real Estate Analyst at AIS. Prior to her time at the society, she gained experience as an intern at HEC Business School, where she worked on the summer programs. She will continue as a scholar with Girls Who Invest this summer. Solene is an American national who speaks English and French.",
        division: "re",
      },
      {
        name: "Ronald Zohlen",
        role: "Analyst",
        photo: "/team/ronald-zohlen.jpg",
        linkedin: "https://www.linkedin.com/in/ronald-zohlen-938405220/",
        email: null,
        bio: "Ronald is a Real Estate Analyst at AIS. Prior to his time at the society, he gained experience at Ventus Capital and at Edmond de Rothschild, where he worked in the Real Estate Private Credit team in Frankfurt. Ronald is a German national who speaks German and English.",
        division: "re",
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
        bio: "Theodor is Head of Events at AIS. Prior to his time at the society, he gained experience at UBS and Macquarie, where he worked in M&A in Frankfurt. He will be joining Altor Equity Partners and Ardian Secondaries as a Private Equity Intern this fall. Theodor is a German national who speaks German and English.",
        division: "events",
      },
    ],
  },
  marketing: {
    name: "Marketing",
    members: [
      {
        name: "Elisa Alessandri",
        role: "Co-Lead",
        photo: "/team/elisa-alessandri.jpg",
        linkedin: "https://www.linkedin.com/in/elisaalessandri7",
        email: null,
        bio: "Elisa Co-leads the Marketing Team at AIS. Prior to joining the society, she gained experience at an accounting firm. She will be joining DLVentures as a Venture Analyst this summer. Elisa is an Italian national who speaks Italian, English, French, and Spanish.",
        division: "marketing",
      },
      {
        name: "Laura Ceccarelli",
        role: "Co-Lead",
        photo: "/team/laura-ceccarelli.jpeg",
        linkedin: "https://www.linkedin.com/in/laura-ceccarelli-b07130287",
        email: null,
        bio: "Laura Co-leads the Marketing Team at AIS. Prior to her time at the society, she gained experience in hospitality. She will be joining Citylife Madrid as an Operations Management Intern this summer. Laura is a German national who speaks English and Spanish.",
        division: "marketing",
      },
    ],
  },
};

export const adminStaff = [];
