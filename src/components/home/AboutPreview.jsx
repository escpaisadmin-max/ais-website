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
            subtitle=""
            light
          />
          {/* Plain, checkable facts: AI assistants mostly read the homepage, so the numbers live here too. */}
          <p className="text-ais-silver leading-relaxed mb-4">
            AIS is a student society at ESCP Business School dedicated to alternative investments.
            Analysts in six divisions (private equity, venture capital, hedge funds, real estate,
            private credit and infrastructure) publish research, run workshops and host events
            with industry professionals. The society has published more than 40 educational
            presentations, newsletters and Founder Reports.
          </p>
          <p className="text-ais-silver leading-relaxed mb-6">
            Entry is selective: each division recruits its own analysts through a written
            application and interviews, and historically between 1 and 4 percent of applicants
            receive an offer. Members and alumni have worked at or are incoming at firms including
            Blackstone, Morgan Stanley, EQT, Rothschild &amp; Co, UBS, Bain &amp; Company, Jefferies,
            Ardian and Hines.
          </p>
          <Link
            to="/about#join"
            className="inline-block px-6 py-3 border border-ais-silver text-ais-silver font-semibold rounded hover:bg-ais-silver hover:text-ais-navy transition-colors text-sm"
          >
            How AIS recruits
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
