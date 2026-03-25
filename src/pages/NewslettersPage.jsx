import { useState } from "react";
import { newsletters } from "../data/newsletters";
import { divisions } from "../data/divisions";
import NewsletterGrid from "../components/newsletters/NewsletterGrid";
import NewsletterCTA from "../components/newsletters/NewsletterCTA";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/ui/ScrollReveal";

export default function NewslettersPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? [...newsletters].reverse()
      : newsletters.filter((n) => n.department === activeFilter).reverse();

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            title="Newsletters"
            subtitle="In-depth research and analysis from our divisions."
          />
        </ScrollReveal>

        <NewsletterCTA />

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeFilter === "all"
                ? "bg-ais-ocean text-white"
                : "bg-ais-ice text-ais-navy hover:bg-ais-silver/30"
            }`}
          >
            All
          </button>
          {divisions.map((div) => (
            <button
              key={div.id}
              onClick={() => setActiveFilter(div.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === div.id
                  ? "bg-ais-ocean text-white"
                  : "bg-ais-ice text-ais-navy hover:bg-ais-silver/30"
              }`}
            >
              {div.shortName}
            </button>
          ))}
        </div>

        <NewsletterGrid newsletters={filtered} />
      </div>
    </section>
  );
}
