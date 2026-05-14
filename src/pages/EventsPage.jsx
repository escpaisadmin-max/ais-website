import { events } from "../data/events";
import EventGrid from "../components/events/EventGrid";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/ui/ScrollReveal";
import { FaEnvelope } from "react-icons/fa";

export default function EventsPage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            title="Events"
            subtitle="Explore our past events and workshops with leading finance professionals."
          />
        </ScrollReveal>

        <EventGrid events={events} />

        <ScrollReveal>
          <div className="mt-16 bg-ais-navy text-white rounded-lg px-6 py-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Interested in an event with us?
            </h2>
            <p className="text-ais-ice mb-6">
              Reach out to our events team to discuss workshops, speaker sessions, and collaborations.
            </p>
            <a
              href="mailto:theodor.kisslinger@edu.escp.eu"
              className="inline-flex items-center gap-2 rounded bg-white px-5 py-3 text-sm font-semibold text-ais-navy transition-colors hover:bg-ais-ice"
            >
              <FaEnvelope aria-hidden="true" />
              Contact Events Team
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
