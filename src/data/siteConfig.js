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
  { label: "About & Team", path: "/about" },
  { label: "Events", path: "/events" },
  { label: "Presentations", path: "/presentations" },
  { label: "Newsletters", path: "/newsletters" },
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
