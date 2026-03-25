import { FaLinkedin, FaInstagram, FaWhatsapp, FaDiscord } from "react-icons/fa";
import { socialLinks, communityLinks } from "../../data/siteConfig";
import ScrollReveal from "../ui/ScrollReveal";

const links = [
  {
    key: "linkedin",
    url: socialLinks.linkedin,
    icon: FaLinkedin,
    label: "LinkedIn",
    description: "Follow us for updates and industry insights",
  },
  {
    key: "instagram",
    url: socialLinks.instagram,
    icon: FaInstagram,
    label: "Instagram",
    description: "Behind-the-scenes and event highlights",
  },
  {
    key: "whatsapp",
    url: communityLinks.whatsapp,
    icon: FaWhatsapp,
    label: "WhatsApp",
    description: "Join our community group chat",
  },
  {
    key: "discord",
    url: communityLinks.discord,
    icon: FaDiscord,
    label: "Discord",
    description: "Real-time discussions and resources",
  },
].filter((link) => link.url);

export default function CommunityLinks() {
  if (links.length === 0) {
    return (
      <ScrollReveal>
        <div className="bg-ais-ice/50 rounded-lg p-8">
          <h3 className="text-xl font-bold text-ais-navy mb-4">
            Connect With Us
          </h3>
          <p className="text-ais-gray">
            More community channels coming soon. In the meantime, reach out
            using the contact form.
          </p>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal>
      <div>
        <h3 className="text-xl font-bold text-ais-navy mb-6">
          Connect With Us
        </h3>
        <div className="space-y-4">
          {links.map(({ key, url, icon: Icon, label, description }) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg border border-ais-silver/30 hover:border-ais-ocean/30 hover:shadow-md transition-all duration-200"
            >
              <Icon className="text-ais-ocean flex-shrink-0" size={28} />
              <div>
                <div className="font-semibold text-ais-navy">{label}</div>
                <div className="text-sm text-ais-gray">{description}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
