import SectionHeading from "../ui/SectionHeading";
import { socialLinks } from "../../data/siteConfig";

const linkClassName = "font-semibold text-ais-ocean underline underline-offset-4 hover:text-ais-navy";

const questions = [
  {
    question: "What is the ESCP Alternative Investment Society?",
    answer: (
      <>
        The ESCP Alternative Investment Society (AIS) is an officially recognised
        student society at <a href="https://escp.eu/" className={linkClassName}>ESCP Business School</a> focused
        on alternative investments. We bring together students interested in
        finance through research, educational publications, workshops and
        exchanges with industry professionals.
      </>
    ),
  },
  {
    question: "Which investment areas does AIS cover?",
    answer: (
      <>
        AIS has <a href="#divisions" className={linkClassName}>four divisions</a>:
        Private Equity, Venture Capital, Hedge Funds and Real Estate. Their work
        covers topics including leveraged buyouts, startup investing,
        public-market investment strategies and property markets. Explore our{" "}
        <a href="/presentations" className={linkClassName}>publications</a> to
        discover research and educational resources from each division.
      </>
    ),
  },
  {
    question: "Who produces AIS’s research and publications?",
    answer: (
      <>
        Our publications are produced by <a href="#team" className={linkClassName}>student teams</a> across
        AIS’s four investment divisions. They include market commentary,
        industry research and educational guides. We also collaborate on
        selected projects with organisations within the ESCP community,
        including the <a href="/founder-report" className={linkClassName}>Founder Report</a>,
        developed with <a href="https://www.blue-factory.eu/" className={linkClassName}>ESCP Blue Factory</a>.
      </>
    ),
  },
  {
    question: "Can people outside ESCP read the research and subscribe?",
    answer: (
      <>
        Yes. Our <a href="/presentations" className={linkClassName}>published research</a> and{" "}
        <a href="/newsletters" className={linkClassName}>newsletter archive</a> are
        freely accessible to students, alumni, finance professionals and other
        interested readers. You can also <a href="/contact#newsletter" className={linkClassName}>register
        for future AIS newsletter updates</a> through our website.
      </>
    ),
  },
  {
    question: "How can finance professionals and organisations collaborate with AIS?",
    answer: (
      <>
        We welcome conversations about guest speaker sessions, workshops,
        research collaborations and partnerships. If you would like to share
        your expertise or explore working with the society, <a href="/contact" className={linkClassName}>contact
        us</a> with a short introduction and your idea.
      </>
    ),
  },
  {
    question: "Who can join AIS, and how does recruitment work?",
    answer: (
      <>
        AIS recruits ESCP students interested in alternative investments and
        contributing to the society’s activities. Interested in joining?{" "}
        <a href="/contact#newsletter" className={linkClassName}>Register for our newsletter</a> for
        research updates and future recruitment announcements. We plan to email
        interested students whenever applications open. You can also follow our{" "}
        <a href={socialLinks.linkedin} className={linkClassName}>LinkedIn page</a> for
        announcements or <a href="/contact" className={linkClassName}>contact us</a> to
        ask about opportunities and the application process.
      </>
    ),
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-ais-ice scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Questions about AIS" />
        <div className="divide-y divide-ais-silver/50">
          {questions.map(({ question, answer }) => (
            <div key={question} className="py-6 first:pt-0 last:pb-0">
              <h3 className="text-xl font-bold text-ais-navy mb-3">{question}</h3>
              <p className="text-ais-gray leading-relaxed">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
