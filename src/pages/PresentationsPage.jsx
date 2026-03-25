import { useState } from "react";
import { presentations } from "../data/presentations";
import { divisions } from "../data/divisions";
import PresentationGrid from "../components/presentations/PresentationGrid";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/ui/ScrollReveal";

export default function PresentationsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? [...presentations].reverse()
      : presentations.filter((p) => p.department === activeFilter).reverse();

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            title="Presentations"
            subtitle="Browse our library of educational presentations across all divisions."
          />
        </ScrollReveal>

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

        <PresentationGrid presentations={filtered} />
      </div>
    </section>
  );
}
