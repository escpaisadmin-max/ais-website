import { contactConfig } from "../data/siteConfig";
import { events } from "../data/events";
import EventGrid from "../components/events/EventGrid";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/ui/ScrollReveal";
import { FaEnvelope } from "react-icons/fa";

// Newest first. Dates come from event.json in Drive: "2026-10-22", "October 2026" or "2026".
// Parsed by hand because browsers disagree on Date.parse("October 2026"). Unreadable dates sort last.
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const eventTime = ({ date = "" }) => {
  const iso = date.match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/);
  if (iso) return Date.UTC(+iso[1], (+iso[2] || 1) - 1, +iso[3] || 1);
  const named = date.trim().toLowerCase().match(/^(?:(\d{1,2}) )?([a-z]+) (\d{4})$/);
  const month = named ? MONTHS.indexOf(named[2]) : -1;
  return month >= 0 ? Date.UTC(+named[3], month, +named[1] || 1) : -Infinity;
};
const sortedEvents = [...events].sort((a, b) => eventTime(b) - eventTime(a));

export default function EventsPage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            as="h1"
            title="Events"
            subtitle="Speaker events, workshops, and industry discussions with finance professionals."
          />
        </ScrollReveal>

        <EventGrid events={sortedEvents} />

        <ScrollReveal>
          <div className="mt-16 bg-ais-navy text-white rounded-lg px-6 py-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Interested in an event with us?
            </h2>
            <p className="text-ais-ice mb-6">
              Reach out to our events team to discuss workshops, speaker sessions, and collaborations.
            </p>
            <a
              href={`mailto:${contactConfig.email}?subject=${encodeURIComponent("Event enquiry")}`}
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
