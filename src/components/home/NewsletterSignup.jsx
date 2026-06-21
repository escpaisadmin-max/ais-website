import { useState } from "react";
import { newsletterConfig, contactConfig } from "../../data/siteConfig";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [botcheck, setBotcheck] = useState(""); // honeypot
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  if (!newsletterConfig.enabled) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (botcheck) return; // honeypot tripped

    // Future: when a dedicated newsletter provider URL is set, send them there.
    if (newsletterConfig.beehiivUrl) {
      window.open(newsletterConfig.beehiivUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // Interim: capture interested addresses in the contact inbox via Web3Forms,
    // so the pre-launch period builds a list to import into the ESP later.
    if (!contactConfig.web3formsAccessKey) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: contactConfig.web3formsAccessKey,
          subject: "[Newsletter Signup]",
          from_name: "AIS Newsletter Signup",
          email,
          message: `Newsletter signup request: ${email}`,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
      if (data.success) setEmail("");
    } catch {
      setStatus("error");
    }
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

          {status === "sent" ? (
            <div className="text-center">
              <p className="text-ais-periwinkle text-lg font-semibold">
                You&apos;re on the list!
              </p>
              <p className="text-ais-silver text-sm mt-2">
                We&apos;ll email you when the first newsletter goes out.
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
              {/* Honeypot: hidden from humans, tempting to bots */}
              <input
                type="text"
                name="botcheck"
                value={botcheck}
                onChange={(e) => setBotcheck(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="px-6 py-3 bg-ais-ocean text-white font-semibold rounded hover:bg-ais-ocean/80 transition-colors disabled:opacity-60"
              >
                {status === "sending" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-center text-ais-periwinkle text-sm mt-3">
              Something went wrong — please email us at{" "}
              <a
                href={`mailto:${contactConfig.email}`}
                className="underline font-semibold hover:text-ais-white transition-colors"
              >
                {contactConfig.email}
              </a>
              .
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
