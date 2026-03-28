import { useState } from "react";
import { presentations } from "../data/presentations";
import { divisions } from "../data/divisions";
import PresentationGrid from "../components/presentations/PresentationGrid";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/ui/ScrollReveal";
import NewsletterCTA from "../components/newsletters/NewsletterCTA";

export default function PresentationsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const parseDate = (d) => {
    const [month, year] = d.split(" ");
    const months = { January:0, February:1, March:2, April:3, May:4, June:5, July:6, August:7, September:8, October:9, November:10, December:11 };
    return new Date(parseInt(year), months[month] || 0);
  };

  const sorted = [...presentations].sort((a, b) => parseDate(b.date) - parseDate(a.date));

  const filtered =
    activeFilter === "all"
      ? sorted
      : sorted.filter((p) => p.department === activeFilter);

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            title="Presentations"
            subtitle="Browse our library of educational presentations across all divisions."
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

        <PresentationGrid presentations={filtered} />
      </div>
    </section>
  );
}
