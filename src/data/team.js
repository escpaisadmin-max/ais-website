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
 * FIELDS:
 * - name:      Full name
 * - role:      Title (e.g., "President", "Analyst")
 * - photo:     Path to photo in /public/team/ (starts with /team/)
 * - linkedin:  Full LinkedIn profile URL
 * - email:     Email address (optional, shown in expanded card)
 * - bio:       Short bio (2-3 sentences, shown when card is expanded)
 * - division:  Division key ("pe", "vc", "hf", "re", "admin", "leadership")
 */

export const leadership = [
  {
    name: "Max Söderman",
    role: "President",
    photo: "/team/max-soderman.png",
    linkedin: "https://linkedin.com/in/example",
    email: null,
    bio: "",
    division: "leadership",
  },
  {
    name: "David Reuther",
    role: "Treasurer",
    photo: "/team/david-reuther.jpeg",
    linkedin: "https://linkedin.com/in/example",
    email: null,
    bio: "",
    division: "leadership",
  },
  {
    name: "Theodor Kisslinger",
    role: "Head of Events",
    photo: "/team/theodor-kisslinger.jpeg",
    linkedin: "https://linkedin.com/in/example",
    email: "theodor.kisslinger@edu.escp.eu",
    bio: "",
    division: "leadership",
  },
];

export const divisions = {
  pe: {
    name: "Private Equity",
    members: [
      {
        name: "Philipp Roselieb",
        role: "Division President",
        photo: "/team/philipp-roselieb.jpeg",
        linkedin: "https://linkedin.com/in/example",
        email: null,
        bio: "",
        division: "pe",
      },
    ],
  },
  vc: {
    name: "Venture Capital",
    members: [],
  },
  hf: {
    name: "Hedge Funds",
    members: [
      {
        name: "Joschka Feuerstein",
        role: "Division President",
        photo: "/team/joschka-feuerstein.jpg",
        linkedin: "https://linkedin.com/in/example",
        email: null,
        bio: "",
        division: "hf",
      },
    ],
  },
  re: {
    name: "Real Estate",
    members: [],
  },
};

export const adminStaff = [];
