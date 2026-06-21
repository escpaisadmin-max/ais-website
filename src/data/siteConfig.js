/**
 * SITE CONFIGURATION
 * ==================
 * Central config for navigation, social links, and community channels.
 * Update URLs here when new accounts are created.
 */

export const socialLinks = {
  linkedin: "https://www.linkedin.com/company/escpais/",
  instagram: null, // Add URL when available, e.g., "https://instagram.com/escpais"
};

export const communityLinks = {
  whatsapp: null, // Add WhatsApp group invite link
  discord: null, // Add Discord server invite link
};

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Newsletters", path: "/newsletters" },
  { label: "EDUs", path: "/presentations" },
  { label: "Founder Report", path: "/founder-report" },
  { label: "Events", path: "/events" },
  { label: "About & Team", path: "/about" },
  { label: "Contact", path: "/contact" },
];

/**
 * NEWSLETTER (Beehiiv)
 * When you have your Beehiiv publication, update the URL below.
 * The form will POST to this URL to subscribe users.
 */
export const newsletterConfig = {
  enabled: true,
  beehiivUrl: null, // e.g., "https://app.beehiiv.com/subscribe/your-publication-id"
  heading: "Stay in the Loop",
  subheading: "Subscribe to our newsletter for investment insights, event announcements, and more.",
};

/**
 * CONTACT
 * =======
 * `email` is where the contact form and the "email us directly" link send to.
 * When you move to a Google Workspace address, just change it here.
 *
 * `web3formsAccessKey`: optional. Leave null and the form opens the visitor's
 * email app (mailto) — messages still reach `email`. To enable a seamless
 * in-page submit that hides the address, create a free key at
 * https://web3forms.com (enter the `email` below as the destination) and paste
 * the access key here.
 */
export const contactConfig = {
  email: "contact@escpais.com",
  web3formsAccessKey: "3a292908-0b33-4399-b8a0-14aa58c716d8",
};
