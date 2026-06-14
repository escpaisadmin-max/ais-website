import { useState } from "react";
import ScrollReveal from "../ui/ScrollReveal";
import { contactConfig } from "../../data/siteConfig";

const SUBJECTS = {
  general: "General Question",
  partnership: "Partnership Inquiry",
  event: "Event Inquiry",
  join: "Join AIS",
  speaker: "Guest Speaker Opportunity",
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
    botcheck: "", // honeypot; bots fill it, humans don't
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | mailto | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subjectLabel = SUBJECTS[formData.subject] || "General Question";

  const openMailto = () => {
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
    const href = `mailto:${contactConfig.email}?subject=${encodeURIComponent(
      `[AIS Website] ${subjectLabel}`
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus("mailto");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.botcheck) return; // honeypot tripped

    // No form service configured → fall back to the visitor's email app.
    if (!contactConfig.web3formsAccessKey) {
      openMailto();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: contactConfig.web3formsAccessKey,
          subject: `[AIS Website] ${subjectLabel}`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: "AIS Website Contact Form",
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <ScrollReveal>
        <div className="bg-ais-ice/50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-ais-navy mb-2">Message Sent!</h3>
          <p className="text-ais-gray">
            Thank you for reaching out. We&apos;ll get back to you soon.
          </p>
        </div>
      </ScrollReveal>
    );
  }

  if (status === "mailto") {
    return (
      <ScrollReveal>
        <div className="bg-ais-ice/50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-ais-navy mb-2">Almost there!</h3>
          <p className="text-ais-gray">
            Your email app should have opened with your message — just press send.
            If it didn&apos;t, email us directly at{" "}
            <a
              href={`mailto:${contactConfig.email}`}
              className="text-ais-ocean font-semibold hover:underline"
            >
              {contactConfig.email}
            </a>
            .
          </p>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-ais-navy mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded border border-ais-silver focus:border-ais-ocean focus:outline-none transition-colors text-ais-navy"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ais-navy mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded border border-ais-silver focus:border-ais-ocean focus:outline-none transition-colors text-ais-navy"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-ais-navy mb-1">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded border border-ais-silver focus:border-ais-ocean focus:outline-none transition-colors text-ais-navy bg-white"
          >
            {Object.entries(SUBJECTS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-ais-navy mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded border border-ais-silver focus:border-ais-ocean focus:outline-none transition-colors text-ais-navy resize-vertical"
          />
        </div>

        {/* Honeypot: hidden from humans, tempting to bots */}
        <input
          type="text"
          name="botcheck"
          value={formData.botcheck}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {status === "error" && (
          <p className="text-sm text-red-600">
            Something went wrong. Please email us directly at{" "}
            <a href={`mailto:${contactConfig.email}`} className="font-semibold underline">
              {contactConfig.email}
            </a>
            .
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full px-6 py-3 bg-ais-ocean text-white font-semibold rounded hover:bg-ais-ocean/80 transition-colors disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
      </form>
    </ScrollReveal>
  );
}
