import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

// Appended to photo URLs so browsers fetch replaced headshots instead of a cached copy.
// Photos are also served with a 5 minute cache (vercel.json), so this rarely needs a bump.
const PHOTO_VERSION = "2026-10-31";

function ExpandIcon({ expanded }) {
  return (
    <div className="relative w-3 h-3 flex items-center justify-center">
      {/* Horizontal line (always visible = minus) */}
      <span className="absolute w-3 h-0.5 bg-ais-ocean rounded-full" />
      {/* Vertical line (collapses to 0 when expanded = plus becomes minus) */}
      <motion.span
        className="absolute w-0.5 h-3 bg-ais-ocean rounded-full"
        animate={{ scaleY: expanded ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function TeamMemberCard({ member }) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <div className="group">
      {/* Photo */}
      <div className="relative overflow-hidden">
        <div className="h-1 bg-ais-ocean" />
        <img
          src={member.photo.startsWith("/") ? `${member.photo}?v=${PHOTO_VERSION}` : member.photo}
          alt={member.name}
          className="w-full aspect-[3/4] object-cover grayscale"
          loading="lazy"
        />
      </div>

      {/* Name + toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls={detailsId}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <div>
          <h3 className="text-sm font-bold text-ais-navy">{member.name}</h3>
          <p className="text-xs text-ais-gray">{member.role}</p>
        </div>
        <ExpandIcon expanded={expanded} />
      </button>

      {/* Details: always in the HTML (so search engines and AI crawlers can read the bios), collapsed visually */}
      <motion.div
        id={detailsId}
        initial={false}
        animate={expanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
        style={expanded ? undefined : { height: 0, opacity: 0 }}
        aria-hidden={!expanded}
        inert={!expanded}
      >
        <div className="pb-4">
          {member.bio && (
            <p className="text-xs text-ais-gray leading-relaxed mb-3">
              {member.bio}
            </p>
          )}
          <div className="flex items-center gap-3">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ais-navy hover:text-ais-ocean transition-colors"
                aria-label={`${member.name}'s LinkedIn`}
              >
                <FaLinkedin size={20} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
