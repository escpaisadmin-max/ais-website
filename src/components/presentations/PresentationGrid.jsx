import PresentationCard from "./PresentationCard";
import ScrollReveal from "../ui/ScrollReveal";

export default function PresentationGrid({ presentations }) {
  if (presentations.length === 0) {
    return (
      <p className="text-center text-ais-gray py-12">
        No presentations match the current filter.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {presentations.map((pres, i) => (
        <ScrollReveal key={pres.id} delay={i * 0.1}>
          <PresentationCard presentation={pres} />
        </ScrollReveal>
      ))}
    </div>
  );
}
