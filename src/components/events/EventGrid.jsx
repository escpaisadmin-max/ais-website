import EventCard from "./EventCard";
import ScrollReveal from "../ui/ScrollReveal";

export default function EventGrid({ events }) {
  if (events.length === 0) {
    return (
      <p className="text-center text-ais-gray py-12">
        No events to display yet. Check back soon!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, i) => (
        <ScrollReveal key={event.slug} delay={i * 0.1}>
          <EventCard event={event} />
        </ScrollReveal>
      ))}
    </div>
  );
}
