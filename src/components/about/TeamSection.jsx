import { leadership, divisions, adminStaff } from "../../data/team";
import TeamMemberCard from "./TeamMemberCard";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";

export default function TeamSection() {
  const allDivisionMembers = Object.entries(divisions);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            title="Our Team"
            subtitle="The people behind AIS."
          />
        </ScrollReveal>

        {/* Leadership */}
        {leadership.length > 0 && (
          <div className="mb-16">
            <ScrollReveal>
              <h3 className="text-lg font-bold text-ais-navy mb-6 uppercase tracking-wider">
                Leadership
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2">
              {leadership.map((member, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <TeamMemberCard member={member} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Division teams */}
        {allDivisionMembers.map(([key, division]) => (
          <div key={key} className="mb-16">
            <ScrollReveal>
              <h3 className="text-lg font-bold text-ais-navy mb-6 uppercase tracking-wider">
                {division.name}
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2">
              {division.members.map((member, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <TeamMemberCard member={member} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}

        {/* Admin staff */}
        {adminStaff.length > 0 && (
          <div>
            <ScrollReveal>
              <h3 className="text-lg font-bold text-ais-navy mb-6 uppercase tracking-wider">
                Operations
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2">
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
