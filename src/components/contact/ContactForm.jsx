import { useState } from "react";
import ScrollReveal from "../ui/ScrollReveal";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /**
     * FORM SUBMISSION
     * ===============
     * Currently logs to console. To connect to a backend:
     *
     * Option 1: Netlify Forms
     *   Add data-netlify="true" to the <form> element. Done.
     *
     * Option 2: Formspree
     *   Change form action to "https://formspree.io/f/YOUR_FORM_ID"
     *   and method to "POST". Remove the onSubmit handler.
     *
     * Option 3: Custom API
     *   fetch("/api/contact", { method: "POST", body: JSON.stringify(formData) })
     */
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <ScrollReveal>
        <div className="bg-ais-ice/50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-ais-navy mb-2">
            Message Sent!
          </h3>
          <p className="text-ais-gray">
            Thank you for reaching out. We'll get back to you soon.
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
            <option value="general">General Question</option>
            <option value="partnership">Partnership Inquiry</option>
            <option value="join">Join AIS</option>
            <option value="speaker">Guest Speaker Opportunity</option>
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

        <button
          type="submit"
          className="w-full px-6 py-3 bg-ais-ocean text-white font-semibold rounded hover:bg-ais-ocean/80 transition-colors"
        >
          Send Message
        </button>
      </form>
    </ScrollReveal>
  );
}
