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
    photo: "/team/placeholder.svg",
    linkedin: "https://linkedin.com/in/example",
    email: null,
    bio: "",
    division: "founders",
  },
  {
    name: "Julius Majowski",
    role: "Co-Founder & President",
    photo: "/team/julius-majowski.jpg",
    linkedin: "https://www.linkedin.com/in/juliusmajowski/",
    email: null,
    bio: "Julius is President and Head of Hedge Funds at AIS. During his time at the society he gained experience at Herax Partners, where he worked in the Generalist M&A Team. He will be joining Lincoln International as an M&A intern this summer. Julius is a German national and speaks English, German, and Spanish.",
    division: "founders",
  },
  {
    name: "Lukas de La Trobe",
    role: "Co-Founder & Vice-President",
    photo: "/team/lukas-de-la-trobe.jpg",
    linkedin: "https://www.linkedin.com/in/lukas-de-la-trobe",
    email: null,
    bio: "Lukas is a Co-Founder and Vice-President at AIS. During his time at the society, he gained experience at zeb Consulting, working in the Strategy & Organization team in Frankfurt. He will join Herax Partners as an Investment Banking Summer Analyst this summer. Lukas is a German national and speaks German and English.",
    division: "founders",
  },
  {
    name: "David Reuther",
    role: "Co-Founder",
    photo: "/team/david-reuther.jpeg",
    linkedin: "https://www.linkedin.com/in/reuther/",
    email: null,
    bio: "David is a Co-Founder and former Head of Private Equity at AIS. During his tenure, he gained experience at BNP Paribas, where he worked within the Private Equity team in 2025. He is a German national based in Luxembourg and is fluent in English and German.",
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
        bio: "Philipp Roselieb is Head of Private Equity at AIS. During his time at the society, he gained experience at KPMG, where he worked in the M&A team in Munich. He will be joining UBS as an Investment Banking Summer Analyst this summer. Philipp is a German national and speaks German and English.",
        division: "pe",
      },
      {
        name: "Joschka Feuerstein",
        role: "Analyst",
        photo: "/team/joschka-feuerstein.jpg",
        linkedin: "https://www.linkedin.com/in/joschka-feuerstein-68796b238/",
        email: null,
        bio: "Joschka Feuerstein is a Private Equity Analyst at AIS. During his time at the society, he gained experience at EY-Parthenon, where he worked in the Strategy and Transactions team in Germany. He will be joining Bain & Company this summer. Joschka is a German national and speaks German and English.",
        division: "pe",
      },
      {
        name: "Pia-Marie Kraus",
        role: "Analyst",
        photo: "/team/pia-marie-kraus.jpeg",
        linkedin: "https://www.linkedin.com/in/pia-marie-kraus",
        email: null,
        bio: "Pia-Marie Kraus is a Private Equity Analyst at AIS. She completed an internship at Ashurst in Frankfurt and participated in the Spring Week at Deutsche Bank, gaining insights into M&A, ECM, and Sales & Trading. Pia-Marie is a German national and speaks German, English, French, and Spanish.",
        division: "pe",
      },
    ],
  },
  vc: {
    name: "Venture Capital",
    members: [
      {
        name: "Max Söderman",
        role: "Analyst",
        photo: "/team/max-soderman.png",
        linkedin: "https://www.linkedin.com/in/maxsoederman",
        email: null,
        bio: "Max is a Venture Capital Analyst at AIS. Prior to joining the society, he gained experience at Wall Street Oasis, where he worked as a Financial Research Intern. This summer, he will be working in Debt Advisory. Max is a Swedish national and speaks Swedish and English.",
        division: "vc",
      },
      {
        name: "Richard Križan",
        role: "Analyst",
        photo: "/team/richard-krizan.jpeg",
        linkedin: "https://www.linkedin.com/in/richard-kri%C5%BEan-3aa53a252",
        email: null,
        bio: "Richard Križan is a Venture Capital Analyst at AIS. Prior to his time at the society, he gained experience at PurposeTech Capital where he worked in the investment team. He will be joining Inven Capital this summer. Richard is a Slovak national and speaks English, Slovak, and Czech.",
        division: "vc",
      },
      {
        name: "Florian Trepetschnigg",
        role: "Analyst",
        photo: "/team/florian-trepetschnigg.jpeg",
        linkedin: "https://www.linkedin.com/in/florian-trepetschnigg/",
        email: null,
        bio: "Florian Trepetschnigg is a Venture Capital Analyst at AIS. Prior to joining ESCP, he co-founded Hoodit, a B2B SaaS platform for merchandise. He has since gained experience in VC at Elevator Ventures and in private credit at Allianz Global Investors. Florian is Austrian and speaks German and English.",
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
        bio: "Julius is President and Head of Hedge Funds at AIS. During his time at the society he gained experience at Herax Partners, where he worked in the Generalist M&A Team. He will be joining Lincoln International as an M&A intern this summer. Julius is a German national and speaks English, German, and Spanish.",
        division: "hf",
      },
      {
        name: "Max Henkes",
        role: "Analyst",
        photo: "/team/placeholder.svg",
        linkedin: "https://linkedin.com/in/example",
        email: null,
        bio: "Max Henkes is an Analyst in the Hedge Funds division at AIS. Max is a German national and speaks German, English, and Russian.",
        division: "hf",
      },
      {
        name: "David Kindt",
        role: "Analyst",
        photo: "/team/david-kindt.jpeg",
        linkedin: "https://www.linkedin.com/in/d-kindt/",
        email: null,
        bio: "David is a Hedge Fund Analyst at AIS. Prior to joining the society, he founded BLK, an online shop for vintage clothing. This summer, he will be joining the Ventures team at Axel Springer SE. David is a German national and speaks German and English.",
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
        bio: "Gustav is Head of Real Estate at AIS. During his time at the society, he gained experience at Sagax AB, where he worked in the Real Estate investment team in Paris. He will be joining EQT this summer. Gustav is a Swedish national and speaks English, Swedish, and French.",
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
        bio: "Theodor is Head of Events at AIS. Prior to his time at the society, he gained experience at UBS and Macquarie, where he worked in the M&A team in Frankfurt. He will be joining Altor Equity Partners and Ardian Secondaries this Fall. Theodor is a German national and speaks German and English.",
        division: "events",
      },
    ],
  },
  marketing: {
    name: "Marketing",
    members: [
      {
        name: "Elisa Alessandri",
        role: "Marketing",
        photo: "/team/elisa-alessandri.jpg",
        linkedin: "https://www.linkedin.com/in/elisaalessandri7",
        email: null,
        bio: "Elisa is a Marketing Team Member at AIS. Prior to joining the society, she gained experience at an accounting firm in accounting and financial reporting. She will be joining DLVentures, a Milan-based VC firm, this summer as a Venture Analyst. Elisa is an Italian national and speaks Italian, English, French, and Spanish.",
        division: "marketing",
      },
      {
        name: "Laura Ceccarelli",
        role: "Marketing",
        photo: "/team/laura-ceccarelli.jpeg",
        linkedin: "https://www.linkedin.com/in/laura-ceccarelli-b07130287",
        email: null,
        bio: "Laura Ceccarelli is a Marketing member at AIS, responsible for shaping and maintaining the society's external presence and ensuring a consistent, professional brand image. Laura is a German national and speaks English and Spanish fluently.",
        division: "marketing",
      },
    ],
  },
};

export const adminStaff = [];
