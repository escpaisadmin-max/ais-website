import ScrollReveal from "../ui/ScrollReveal";
import SectionHeading from "../ui/SectionHeading";

// Selectivity is stated once, here and in the FAQ, as a quiet fact rather than a headline.
// The 1 to 4 percent range was confirmed by the AIS VP, Max Henkes (Oct 2026); update it if a round falls outside it.
const steps = [
  { title: "Written application", text: "You apply online to the division you want to join." },
  { title: "Interview", text: "Shortlisted candidates are interviewed by members of that division." },
  { title: "Offer", text: "Successful candidates join their division as analysts and start working on its research." },
];

export default function RecruitmentSection() {
  return (
    <section id="join" className="py-20 bg-white scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            title="How we recruit"
            subtitle="AIS recruits at the start of each semester, and each division chooses its own analysts. Applications are announced in our newsletter and on LinkedIn."
          />
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-lg bg-ais-ice p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-ais-gray mb-2">Step {index + 1}</p>
                <h3 className="text-lg font-bold text-ais-navy mb-2">{step.title}</h3>
                <p className="text-sm text-ais-gray leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-t border-ais-silver/40 pt-6 text-sm text-ais-gray leading-relaxed text-center max-w-2xl mx-auto">
            Applications have historically been very competitive: between 1 and 4 percent of applicants
            receive an offer. If you are not selected, you are welcome to apply again in a later round.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
