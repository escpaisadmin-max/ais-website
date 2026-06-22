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

  const eduNumbers = new Map(
    [...presentations]
      .sort((a, b) => parseDate(a.date) - parseDate(b.date) || b.id.localeCompare(a.id))
      .map((presentation, index) => [presentation.id, index + 1])
  );

  const sorted = [...presentations]
    .map((presentation) => ({
      ...presentation,
      eduNumber: eduNumbers.get(presentation.id),
    }))
    // Display in strict descending EDU-number order so the grid always counts
    // down cleanly. Sorting by date alone (without the same tie-breaker used to
    // assign the numbers) made same-month pairs render out of sequence.
    .sort((a, b) => b.eduNumber - a.eduNumber);

  const filtered =
    activeFilter === "all"
      ? sorted
      : sorted.filter((p) => p.department === activeFilter);

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            title="Publications & Educational Resources (EDUs)"
            subtitle="Educational resources, technical guides, and industry deep dives."
          />
        </ScrollReveal>

        <NewsletterCTA />

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
              activeFilter === "all"
                ? "bg-ais-navy text-white border-ais-navy"
                : "bg-white text-ais-navy border-ais-navy hover:bg-ais-navy/5"
            }`}
          >
            All
          </button>
          <span className="text-ais-silver/60">|</span>
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
