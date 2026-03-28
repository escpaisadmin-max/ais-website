import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { navLinks, socialLinks } from "../../data/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-ais-navy text-ais-silver">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img src="/ais-logo.svg" alt="AIS" className="h-12 w-auto mb-3" />
            <p className="text-sm text-ais-white">
              ESCP Alternative Investment Society
            </p>
            <p className="text-sm text-ais-silver mt-2">
              The premier student investment society at ESCP Business School — the world's oldest business school.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-ais-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-ais-silver hover:text-ais-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-ais-white uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ais-white hover:text-ais-periwinkle transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ais-white hover:text-ais-periwinkle transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-ais-slate/30 text-center text-sm text-ais-silver">
          &copy; {new Date().getFullYear()} ESCP Alternative Investment Society. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
