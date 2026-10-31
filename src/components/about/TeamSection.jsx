import { founders, leadership, divisions, adminStaff } from "../../data/team";
import TeamMemberCard from "./TeamMemberCard";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";

const DEFAULT_GRID = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-2";
// Six people in a five-column grid leave one card alone on a second row (Hedge Funds, Oct 2026).
// Six go on one row from lg up, and split evenly (3+3, 2+2+2) on smaller screens.
const SIX_GRID = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-2";
const gridFor = (count) => (count === 6 ? SIX_GRID : DEFAULT_GRID);

export default function TeamSection() {
  const allDivisions = Object.entries(divisions);

  return (
    <section id="team" className="py-20 bg-white scroll-mt-24">
      <div className="max-w-[90rem] mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            title="Our Team"
            subtitle="The people behind AIS."
          />
        </ScrollReveal>

        {/* Founding Team */}
        {founders.length > 0 && (
          <div className="mb-16">
            <ScrollReveal>
              <h3 className="text-lg font-bold text-ais-navy mb-6 uppercase tracking-wider">
                Founding Team
              </h3>
            </ScrollReveal>
            <div className={gridFor(founders.length)}>
              {founders.map((member, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <TeamMemberCard member={member} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Society leadership */}
        {leadership.length > 0 && (
          <div className="mb-16">
            <ScrollReveal>
              <h3 className="text-lg font-bold text-ais-navy mb-6 uppercase tracking-wider">
                Leadership
              </h3>
            </ScrollReveal>
            <div className={gridFor(leadership.length)}>
              {leadership.map((member, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <TeamMemberCard member={member} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Divisions (head is always first) */}
        {allDivisions.map(([key, division]) => (
          division.members.length > 0 && (
            <div key={key} className="mb-16">
              <ScrollReveal>
                <h3 className="text-lg font-bold text-ais-navy mb-6 uppercase tracking-wider">
                  {division.name}
                </h3>
              </ScrollReveal>
              <div className={gridFor(division.members.length)}>
                {division.members.map((member, i) => (
                  <ScrollReveal key={i} delay={i * 0.05}>
                    <TeamMemberCard member={member} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )
        ))}

        {/* Admin staff */}
        {adminStaff.length > 0 && (
          <div>
            <ScrollReveal>
              <h3 className="text-lg font-bold text-ais-navy mb-6 uppercase tracking-wider">
                Operations
              </h3>
            </ScrollReveal>
            <div className={gridFor(adminStaff.length)}>
              {adminStaff.map((member, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <TeamMemberCard member={member} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
