import ScrollReveal from "../ui/ScrollReveal";

export default function MissionSection() {
  return (
    <section className="py-20 bg-ais-navy">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-bold text-ais-white mb-8">
            About AIS
          </h1>
          <p className="text-lg text-ais-silver leading-relaxed mb-6">
            Our mission at the Alternative Investment Society (AIS) is to enhance
            education, promote professional development, and prepare students for
            successful careers in Private Equity, Venture Capital, Real Estate,
            and Hedge Funds.
          </p>
          <p className="text-lg text-ais-silver leading-relaxed mb-6">
            We achieve this by hosting networking events, interactive workshops,
            and guest speakers, while providing resources to support the
            application and interview process.
          </p>
          <p className="text-lg text-ais-silver leading-relaxed">
            Our four specialized divisions ensure deep, focused learning across
            the full spectrum of alternative investment strategies — combining
            educational enrichment, professional development, and applied
            learning through case studies and real-world experiences.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
