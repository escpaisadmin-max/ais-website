import { useParams, Link } from "react-router-dom";
import { events } from "../data/events";
import Tag from "../components/ui/Tag";
import { divisions } from "../data/divisions";

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

  const division = divisions.find((d) => d.id === event.division);

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

        {/* Hero image */}
        <div className="rounded-lg overflow-hidden mb-8">
          <img
            src={event.photo}
            alt={event.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          {event.partnerLogo && (
            <img
              src={event.partnerLogo}
              alt={event.partnerName}
              className="w-16 h-16 object-contain bg-white rounded border border-ais-silver/30 p-2"
            />
          )}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-ais-navy">
              {event.title}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-ais-gray">{event.date}</span>
              {division && <Tag label={division.name} type={event.division} />}
              <Tag label={event.type} type="general" />
            </div>
          </div>
        </div>

        {/* Partner */}
        {event.partnerName && (
          <p className="text-ais-gray mb-6">
            In partnership with <span className="font-semibold text-ais-navy">{event.partnerName}</span>
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
