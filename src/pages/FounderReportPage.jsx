import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/ui/ScrollReveal";

export default function FounderReportPage() {
  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            title="Founder Report"
            subtitle="A reflection on AIS — our mission, milestones, and the road ahead."
          />
        </ScrollReveal>

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
      </div>
    </section>
  );
}
