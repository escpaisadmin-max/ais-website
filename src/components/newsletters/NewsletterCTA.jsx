import { newsletterConfig } from "../../data/siteConfig";
import ScrollReveal from "../ui/ScrollReveal";

export default function NewsletterCTA() {
  return (
    <ScrollReveal>
      <div className="bg-ais-navy rounded-lg p-8 md:p-10 text-center mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-ais-white mb-3">
          Stay Updated
        </h2>
        <p className="text-ais-silver max-w-xl mx-auto mb-6">
          Explore our published newsletters and educational resources for investment
          insights and industry analysis.
        </p>
        {newsletterConfig.beehiivUrl ? (
          <a
            href={newsletterConfig.beehiivUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-ais-ocean text-white font-semibold rounded hover:bg-ais-ocean/80 transition-colors"
          >
            Subscribe Now
          </a>
        ) : (
          <p className="text-ais-periwinkle text-sm font-semibold">
            Follow us on{" "}
            <a
              href="https://www.linkedin.com/company/escpais/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-ais-white transition-colors"
            >
              LinkedIn
            </a>{" "}
            for the latest issues while email updates are being prepared.
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
