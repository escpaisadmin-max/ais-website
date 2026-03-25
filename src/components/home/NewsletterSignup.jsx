import { useState } from "react";
import { newsletterConfig } from "../../data/siteConfig";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!newsletterConfig.enabled) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newsletterConfig.beehiivUrl) {
      // When Beehiiv is configured, submit to their API
      // For now this is a placeholder
      console.log("Subscribing to Beehiiv:", email);
    } else {
      console.log("Newsletter signup (no provider configured):", email);
    }

    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-20 bg-ais-navy">
      <div className="max-w-xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            title={newsletterConfig.heading}
            subtitle={newsletterConfig.subheading}
            light
          />

          {submitted ? (
            <div className="text-center">
              <p className="text-ais-periwinkle text-lg font-semibold">
                Thanks for subscribing!
              </p>
              <p className="text-ais-silver text-sm mt-2">
                You'll hear from us soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded bg-ais-slate/50 border border-ais-slate text-ais-white placeholder-ais-gray focus:outline-none focus:border-ais-ocean transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-ais-ocean text-white font-semibold rounded hover:bg-ais-ocean/80 transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
