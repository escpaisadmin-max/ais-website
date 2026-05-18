import { useState } from "react";
import { Link } from "react-router-dom";
import { trackRecord, academicPartners } from "../../data/partners";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";

const BASE_HEIGHT = 40; // px — base rendered height for all logos

function LogoContent({ partner }) {
  const [failed, setFailed] = useState(false);

  if (partner.logo && !failed) {
    const h = (partner.scale || 1) * BASE_HEIGHT;
    return (
      <img
        src={partner.logo}
        alt={partner.name}
        className="w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
        style={{ height: `${h}px` }}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span className="px-4 text-center text-sm md:text-base font-semibold text-ais-white/85">
      {partner.name}
    </span>
  );
}

function ScrollingRow({ logos, direction = "left" }) {
  // Duplicate for seamless loop
  const items = logos.length < 6 ? [...logos, ...logos, ...logos] : logos;
  const animClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";

  return (
    <div className="relative bg-ais-navy py-6">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-ais-navy to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-ais-navy to-transparent z-10" />

      <div className={`flex items-center ${animClass}`} style={{ width: "fit-content" }}>
        {[...items, ...items].map((partner, i) => {
          const img = <LogoContent partner={partner} />;
          const wrapperClass =
            "flex-shrink-0 mx-7 md:mx-10 flex items-center justify-center h-16";

          if (partner.eventSlug) {
            return (
              <Link
                key={`${partner.id}-${i}`}
                to={`/events/${partner.eventSlug}`}
                className={wrapperClass}
                title={`${partner.name} — View event`}
              >
                {img}
              </Link>
            );
          }

          return (
            <div key={`${partner.id}-${i}`} className={wrapperClass}>
              {img}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function LogoBanner() {
  return (
    <section className="py-16 bg-ais-navy overflow-hidden">
      {/* Track Record */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <ScrollReveal>
          <SectionHeading
            title="Team & Alumni Track Record"
            subtitle="Where our members have gained experience."
            light
          />
        </ScrollReveal>
      </div>
      <div className="mb-16">
        <ScrollingRow logos={trackRecord} direction="left" />
      </div>

      {/* Academic Partners */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <ScrollReveal>
          <SectionHeading
            title="Industry Collaborators"
            subtitle="Companies and organizations we collaborate with."
            light
          />
        </ScrollReveal>
      </div>
      <ScrollingRow logos={academicPartners} direction="right" />
    </section>
  );
}
