import { events } from "../data/events";
import EventGrid from "../components/events/EventGrid";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/ui/ScrollReveal";

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

        <ScrollReveal>
          <div className="bg-ais-ice border border-ais-periwinkle/40 rounded-lg p-6 text-center mb-12">
            <p className="text-ais-navy font-semibold">
              This page is under construction — event recaps are being added soon.
            </p>
          </div>
        </ScrollReveal>

        <EventGrid events={events} />
      </div>
    </section>
  );
}
