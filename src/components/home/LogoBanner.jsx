import { Link } from "react-router-dom";
import { partners } from "../../data/partners";
import SectionHeading from "../ui/SectionHeading";

export default function LogoBanner() {
  // Need at least a few logos for the animation to look good
  const logos = partners.length < 4
    ? [...partners, ...partners, ...partners, ...partners]
    : partners;

  return (
    <section className="py-16 bg-ais-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <SectionHeading
          title="Our Network"
          subtitle="Companies we've partnered with and where our members work."
          light
        />
      </div>

      {/* Scrolling banner */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-ais-navy to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-ais-navy to-transparent z-10" />

        <div className="flex animate-scroll-left" style={{ width: "fit-content" }}>
          {/* Render logos twice for seamless loop */}
          {[...logos, ...logos].map((partner, i) => {
            const logoElement = (
              <div
                key={`${partner.id}-${i}`}
                className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center h-16 w-36 md:w-44"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            );

            if (partner.eventSlug) {
              return (
                <Link
                  key={`${partner.id}-${i}`}
                  to={`/events/${partner.eventSlug}`}
                  className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center h-16 w-36 md:w-44"
                  title={`${partner.name} — View event`}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                </Link>
              );
            }

            return logoElement;
          })}
        </div>
      </div>
    </section>
  );
}
