import ContactForm from "../components/contact/ContactForm";
import CommunityLinks from "../components/contact/CommunityLinks";
import NewsletterSignup from "../components/home/NewsletterSignup";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/ui/ScrollReveal";

export default function ContactPage() {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <SectionHeading
              title="Get in Touch"
              subtitle="Interested in partnering with AIS, joining our community, or have a question? We'd love to hear from you."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <ContactForm />
            <CommunityLinks />
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
