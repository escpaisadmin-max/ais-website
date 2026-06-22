import { founderReports } from "../data/founderReports";
import FounderReportGrid from "../components/founder-reports/FounderReportGrid";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/ui/ScrollReveal";

export default function FounderReportPage() {
  const sorted = [...founderReports].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            title="Founder Report"
            subtitle="Data-driven reports on ESCP's founders, startups, and investor ecosystem."
          />
        </ScrollReveal>

        <FounderReportGrid reports={sorted} />
      </div>
    </section>
  );
}
