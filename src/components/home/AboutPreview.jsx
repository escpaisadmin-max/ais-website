import { Link } from "react-router-dom";
import ScrollReveal from "../ui/ScrollReveal";
import SectionHeading from "../ui/SectionHeading";

export default function AboutPreview() {
  return (
    <section className="py-20 bg-ais-navy">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <SectionHeading
            title="About AIS"
            subtitle="At ESCP — the world's oldest business school"
            light
          />
          <p className="text-ais-silver leading-relaxed mb-6">
            Our mission is to enhance education, promote professional
            development, and prepare students for successful careers in Private
            Equity, Venture Capital, Real Estate, and Hedge Funds. Through
            networking events, workshops, guest speakers, and in-depth research,
            we bridge the gap between academic finance and the real world of
            investing.
          </p>
          <Link
            to="/about"
            className="inline-block px-6 py-3 border border-ais-silver text-ais-silver font-semibold rounded hover:bg-ais-silver hover:text-ais-navy transition-colors text-sm"
          >
            Learn More
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
