import { newsletterConfig } from "../../data/siteConfig";
import ScrollReveal from "../ui/ScrollReveal";

export default function NewsletterCTA() {
  return (
    <ScrollReveal>
      <div className="bg-ais-navy rounded-lg p-8 md:p-10 text-center mb-12">
        <h3 className="text-xl md:text-2xl font-bold text-ais-white mb-3">
          Get Early Access
        </h3>
        <p className="text-ais-silver max-w-xl mx-auto mb-6">
          Email subscribers receive newsletters and presentations one week before
          they're published here. Subscribe to stay ahead.
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
            Email newsletter coming soon.
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
