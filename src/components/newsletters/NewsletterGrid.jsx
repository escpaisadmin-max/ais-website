import NewsletterCard from "./NewsletterCard";
import ScrollReveal from "../ui/ScrollReveal";

export default function NewsletterGrid({ newsletters }) {
  if (newsletters.length === 0) {
    return (
      <p className="text-center text-ais-gray py-12">
        No newsletters match the current filter.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsletters.map((nl, i) => (
        <ScrollReveal key={nl.id} delay={i * 0.1}>
          <NewsletterCard newsletter={nl} />
        </ScrollReveal>
      ))}
    </div>
  );
}
