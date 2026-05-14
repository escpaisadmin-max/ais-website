import { legalMetadata, legalSources } from "../data/legal";

const Section = ({ title, children }) => (
  <section className="border-t border-ais-silver/40 pt-8">
    <h2 className="text-2xl font-bold text-ais-navy mb-4">{title}</h2>
    <div className="space-y-4 text-ais-navy/80 leading-relaxed">{children}</div>
  </section>
);

export default function PrivacyPolicyPage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-wider text-ais-gray mb-3">
            Last updated {legalMetadata.lastUpdated}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-ais-navy mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-ais-gray">
            This policy explains how {legalMetadata.organizationName} handles personal data on this website.
          </p>
        </div>

        <div className="space-y-10">
          <Section title="Controller">
            <p>
              The website is operated by {legalMetadata.organizationName}, a nonprofit student society
              headquartered in Paris.
            </p>
            <address className="not-italic">
              {legalMetadata.addressLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </address>
            <p>
              Contact:{" "}
              <a href={`mailto:${legalMetadata.contactEmail}`} className="text-ais-ocean underline">
                {legalMetadata.contactEmail}
              </a>
            </p>
          </Section>

          <Section title="Data We Process">
            <p>
              When you visit this site, technical access data may be processed by our hosting provider,
              Vercel. This can include IP address, approximate location derived from IP address, browser
              and device information, request information, timestamps, and service logs needed to deliver
              and secure the website.
            </p>
            <p>
              If you contact us by email or through future connected forms, we process the information you
              choose to provide, such as your name, email address, subject, message, and any context needed
              to answer your request.
            </p>
            <p>
              The current contact and newsletter components in this source code do not send form data to a
              production backend unless a provider is configured later. If newsletter or form providers are
              connected in the future, this policy should be updated before launch of those integrations.
            </p>
          </Section>

          <Section title="Purposes And Legal Bases">
            <p>
              We process technical access data to make the website available, maintain security, diagnose
              errors, and prevent misuse. The legal basis is our legitimate interest in operating a secure
              public website.
            </p>
            <p>
              We process messages and event inquiries to respond to requests and manage potential
              collaborations or membership-related communication. The legal basis is consent or legitimate
              interest, depending on the nature of the request.
            </p>
          </Section>

          <Section title="Hosting And Service Providers">
            <p>
              This website is hosted on Vercel. Vercel states that it processes customer website traffic
              data such as end-user IP address, IP-derived location, request data, and service-generated
              logs. Vercel also provides GDPR-related data processing terms for customers.
            </p>
            <p>
              Public links to LinkedIn or other third-party websites are external services. When you follow
              those links, the privacy policies of the respective provider apply.
            </p>
          </Section>

          <Section title="Cookies And Local Storage">
            <p>
              We do not currently use analytics, advertising, or social-media tracking cookies on this
              website. The cookie notice stores a small preference in your browser's local storage so the
              notice does not reappear after you acknowledge it.
            </p>
            <p>
              Under CNIL guidance, consent is generally required for trackers unless they are strictly
              necessary for a service requested by the user or serve purposes such as remembering a user's
              tracker choice.
            </p>
          </Section>

          <Section title="Retention">
            <p>
              Technical logs are retained according to Vercel's platform practices. Email or inquiry
              messages are retained only as long as needed to answer the request, manage the relationship,
              or comply with applicable obligations.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>
              If GDPR or French data protection law applies to your data, you may have rights to access,
              rectification, erasure, restriction, objection, and portability. You can contact us using the
              email above.
            </p>
            <p>
              ESCP's public data protection policy lists the ESCP Data Protection Officer contact as{" "}
              <a href={`mailto:${legalMetadata.dpoEmail}`} className="text-ais-ocean underline">
                {legalMetadata.dpoEmail}
              </a>{" "}
              and {legalMetadata.dpoPostalAddress}. You may also contact CNIL if you are not satisfied with
              the handling of a data protection request.
            </p>
          </Section>

          <Section title="Sources">
            <ul className="list-disc pl-6 space-y-2">
              {legalSources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-ais-ocean underline">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </section>
  );
}
