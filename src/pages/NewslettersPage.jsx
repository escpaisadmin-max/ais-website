import { useState } from "react";
import { newsletters } from "../data/newsletters";
import { divisions } from "../data/divisions";
import NewsletterGrid from "../components/newsletters/NewsletterGrid";
import NewsletterCTA from "../components/newsletters/NewsletterCTA";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/ui/ScrollReveal";

export default function NewslettersPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const sorted = [...newsletters].sort((a, b) => b.issue - a.issue);

  const filtered =
    activeFilter === "all"
      ? sorted
      : sorted.filter((n) => n.department === activeFilter);

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            title="Newsletters"
            subtitle="Market trends, investment insights, and industry case studies across alternative assets."
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

        <NewsletterGrid newsletters={filtered} />
      </div>
    </section>
  );
}
