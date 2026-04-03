import { Link } from "react-router-dom";
import { trackRecord, academicPartners } from "../../data/partners";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";

function ScrollingRow({ logos, direction = "left" }) {
  // Duplicate for seamless loop
  const items = logos.length < 6 ? [...logos, ...logos, ...logos] : logos;
  const animClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";

  return (
    <div className="relative bg-ais-navy py-6">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-ais-navy to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-ais-navy to-transparent z-10" />

      <div className={`flex ${animClass}`} style={{ width: "fit-content" }}>
        {[...items, ...items].map((partner, i) => {
          const img = (
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300"
              loading="lazy"
            />
          );

          if (partner.eventSlug) {
            return (
              <Link
                key={`${partner.id}-${i}`}
                to={`/events/${partner.eventSlug}`}
                className="flex-shrink-0 mx-4 md:mx-8 flex items-center justify-center" style={{ width: 240, height: 50 }}
                title={`${partner.name} — View event`}
              >
                {img}
              </Link>
            );
          }

          return (
            <div
              key={`${partner.id}-${i}`}
              className="flex-shrink-0 mx-4 md:mx-8 flex items-center justify-center" style={{ width: 240, height: 50 }}
            >
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
            title="Professional & Academic Partners"
            subtitle="Companies and organizations we collaborate with."
            light
          />
        </ScrollReveal>
      </div>
      <ScrollingRow logos={academicPartners} direction="right" />
    </section>
  );
}
