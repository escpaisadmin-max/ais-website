import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

export default function TeamMemberCard({ member }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group">
      {/* Photo */}
      <div className="relative overflow-hidden">
        <div className="h-1 bg-ais-ocean" />
        <img
          src={member.photo}
          alt={member.name}
          className="w-full aspect-[3/4] object-cover grayscale"
          loading="lazy"
        />
      </div>

      {/* Name + toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <div>
          <h3 className="text-sm font-bold text-ais-navy">{member.name}</h3>
          <p className="text-xs text-ais-gray">{member.role}</p>
        </div>
        <span className="text-ais-ocean text-xl font-light leading-none select-none">
          {expanded ? "\u2212" : "+"}
        </span>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
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
        )}
      </AnimatePresence>
    </div>
  );
}
