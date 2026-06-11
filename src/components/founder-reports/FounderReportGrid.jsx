import FounderReportCard from "./FounderReportCard";
import ScrollReveal from "../ui/ScrollReveal";

export default function FounderReportGrid({ reports }) {
  if (reports.length === 0) {
    return (
      <ScrollReveal>
        <div className="bg-ais-ice/50 rounded-lg p-8 md:p-12 text-center mt-8">
          <h3 className="text-xl md:text-2xl font-bold text-ais-navy mb-3">
            Coming Soon
          </h3>
          <p className="text-ais-gray max-w-xl mx-auto">
            The founders are putting together a formal report on AIS&apos;
            journey so far. Check back soon.
          </p>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report, i) => (
        <ScrollReveal key={report.id} delay={i * 0.1}>
          <FounderReportCard report={report} />
        </ScrollReveal>
      ))}
    </div>
  );
}
