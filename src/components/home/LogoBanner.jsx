import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { trackRecord, academicPartners } from "../../data/partners";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";

// Optical sizing: wide wordmarks get shorter and square marks taller, so every logo
// carries similar visual weight. Height follows aspect ratio to the power -0.45,
// clamped, and no logo gets wider than MAX_WIDTH. `scale` on a partner fine tunes it.
const BASE_HEIGHT = 52;
const MIN_HEIGHT = 16;
const MAX_HEIGHT = 52;
const MAX_WIDTH = 200;
const SPEED = 55; // px per second, the same for both rows

function logoSize(partner) {
  const aspect = partner.logoWidth / partner.logoHeight;
  let height = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, BASE_HEIGHT * aspect ** -0.45)) * (partner.scale || 1);
  let width = height * aspect;
  if (width > MAX_WIDTH) {
    width = MAX_WIDTH;
    height = width / aspect;
  }
  return { width: Math.round(width), height: Math.round(height) };
}

function LogoContent({ partner }) {
  const [failed, setFailed] = useState(false);

  if (partner.logo && !failed) {
    const { width, height } = logoSize(partner);
    return (
      <img
        src={partner.logo}
        alt={partner.name}
        width={width}
        height={height}
        className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
        style={{ width: `${width}px`, height: `${height}px` }}
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span className="px-4 text-center text-sm md:text-base font-semibold text-ais-navy/85">
      {partner.name}
    </span>
  );
}

function ScrollingRow({ logos, direction = "left" }) {
  const items = logos.length < 6 ? [...logos, ...logos, ...logos] : logos;
  const animClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";
  const track = useRef(null);
  const [distance, setDistance] = useState(0);

  // Loop by the exact distance between the first logo and its repeat. Animating to
  // -50% of the track left a 20px snap at every loop. Measuring in the browser also
  // keeps the prerendered HTML still, so the row does not restart once the app loads.
  useEffect(() => {
    const node = track.current;
    if (!node) return undefined;
    const measure = () => {
      const children = node.children;
      const half = children.length / 2;
      if (!half) return;
      const gap = children[half].getBoundingClientRect().left - children[0].getBoundingClientRect().left;
      if (gap > 0) setDistance(gap);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [logos]);

  return (
    <div className="logo-row relative bg-white py-6">
      {/* Fade edges */}
      <div aria-hidden="true" className="logo-fade pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div aria-hidden="true" className="logo-fade pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

      <div
        ref={track}
        className={`logo-track flex items-center ${distance ? animClass : ""}`}
        style={distance ? { "--loop-distance": `${distance}px`, animationDuration: `${(distance / SPEED).toFixed(2)}s` } : undefined}
      >
        {[...items, ...items].map((partner, i) => {
          const img = <LogoContent partner={partner} />;
          const duplicate = i >= logos.length;
          const wrapperClass =
            "flex-shrink-0 mx-7 md:mx-10 flex items-center justify-center h-16";

          if (partner.eventSlug) {
            return (
              <Link
                key={`${partner.id}-${i}`}
                to={`/events/${partner.eventSlug}`}
                className={wrapperClass}
                title={`${partner.name} — View event`}
                tabIndex={duplicate ? -1 : undefined}
                aria-hidden={duplicate || undefined}
                data-logo-duplicate={duplicate || undefined}
              >
                {img}
              </Link>
            );
          }

          return (
            <div key={`${partner.id}-${i}`} className={wrapperClass} aria-hidden={duplicate || undefined} data-logo-duplicate={duplicate || undefined}>
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
    <section className="py-16 bg-white overflow-hidden">
      {/* Track Record */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <ScrollReveal>
          <SectionHeading
            title="Team & Alumni Track Record"
            subtitle="Where our members have gained experience."
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
          />
        </ScrollReveal>
      </div>
      <ScrollingRow logos={academicPartners} direction="right" />
    </section>
  );
}
