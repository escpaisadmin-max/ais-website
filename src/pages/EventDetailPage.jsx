import { useParams, Link } from "react-router-dom";
import { events } from "../data/events";
import EventBanner from "../components/events/EventBanner";

export default function EventDetailPage() {
  const { slug } = useParams();
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <section className="py-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-ais-navy mb-4">Event Not Found</h1>
          <p className="text-ais-gray mb-8">
            The event you're looking for doesn't exist.
          </p>
          <Link
            to="/events"
            className="text-ais-ocean hover:underline font-semibold"
          >
            Back to Events
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back link */}
        <Link
          to="/events"
          className="inline-flex items-center text-ais-ocean hover:underline mb-8 text-sm font-semibold"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Events
        </Link>

        {/* Hero banner */}
        <div className="rounded-lg overflow-hidden mb-8 shadow-sm">
          <EventBanner event={event} variant="detail" />
        </div>

        {/* Partner */}
        {event.partnerName && (
          <p className="text-ais-gray mb-6">
            In partnership with{" "}
            {event.partnerUrl ? (
              <a
                href={event.partnerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ais-ocean hover:underline"
              >
                {event.partnerName}
              </a>
            ) : (
              <span className="font-semibold text-ais-navy">{event.partnerName}</span>
            )}
          </p>
        )}

        {/* Full description */}
        <div className="prose max-w-none mb-8">
          {event.fullDescription.split("\n").map((paragraph, i) => (
            <p key={i} className="text-ais-navy/80 mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Key takeaways */}
        {event.keyTakeaways && event.keyTakeaways.length > 0 && (
          <div className="bg-ais-ice/50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-ais-navy mb-4">Key Takeaways</h3>
            <ul className="space-y-2">
              {event.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2 text-ais-navy/80">
                  <span className="text-ais-ocean mt-1">&#8226;</span>
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Photo gallery */}
        {event.photos && event.photos.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-ais-navy mb-4">Photos</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {event.photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt={`${event.title} photo ${i + 1}`}
                  className="rounded-lg object-cover w-full h-48"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
