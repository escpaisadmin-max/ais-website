import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Tag from "../ui/Tag";
import { divisions } from "../../data/divisions";

export default function EventCard({ event }) {
  const division = divisions.find((d) => d.id === event.division);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/events/${event.slug}`}
        className="block rounded-lg overflow-hidden border border-ais-silver/30 hover:border-ais-ocean/30 hover:shadow-lg transition-shadow duration-300 bg-white"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.photo}
            alt={event.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Partner logo overlay */}
          {event.partnerLogo && (
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded p-1.5">
              <img
                src={event.partnerLogo}
                alt={event.partnerName}
                className="h-8 w-auto object-contain"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-ais-gray">{event.date}</span>
            {division && <Tag label={division.shortName} type={event.division} />}
          </div>
          <h3 className="text-lg font-bold text-ais-navy mb-2">
            {event.title}
          </h3>
          <p className="text-sm text-ais-gray line-clamp-2">
            {event.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
