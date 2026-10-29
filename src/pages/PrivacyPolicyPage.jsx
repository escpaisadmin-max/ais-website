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
          <Section title="Website Contact">
            <p>
              This is the website of {legalMetadata.organizationName}, a student-led society at ESCP
              Business School. For questions about the website or your personal data, contact AIS below.
            </p>
            <p>Society contact address:</p>
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
              The contact form sends your name, email address, selected subject and message through
              Web3Forms to the society's configured contact inbox. The newsletter form sends your email
              address and subscription request through the same service. Web3Forms also processes technical
              information needed to deliver submissions and prevent abuse. You can contact us directly by
              email instead of using a form.
            </p>
            <p>
              Newsletter requests are currently collected by email; there is no automated newsletter
              delivery service connected to this website. Signing up asks AIS to send you newsletter
              updates. You can withdraw that request by contacting us.
            </p>
            <p>
              The website publishes member names, roles, biographies and photographs to present
              the society and its work. Members can contact us to request a correction or removal.
            </p>
          </Section>

          <Section title="Purposes And Legal Bases">
            <p>
              We process technical access data to make the website available, maintain security, diagnose
              errors, and prevent misuse. The legal basis is our legitimate interest in operating a secure
              public website.
            </p>
            <p>
              We use contact submissions to respond to your request, based on our legitimate interest in
              handling enquiries. Newsletter updates, analytics cookies and session recordings rely on your
              consent. Anonymous, cookieless counting of visits and completed actions after you reject cookies
              relies on our legitimate interest in understanding how the website is used as a whole; you can
              object by contacting us. Declining analytics cookies does not prevent you from using the
              website, forms or publications.
            </p>
          </Section>

          <Section title="Hosting And Service Providers">
            <p>
              Vercel hosts the website and processes technical access data. Web3Forms processes form
              submissions and forwards them by email. PostHog provides website analytics from its EU cloud,
              hosted in Frankfurt. These providers and their infrastructure may process data outside the
              European Economic Area, including in the United States; Web3Forms also operates in India. Their
              privacy and data-processing information is linked below.
            </p>
            <p>
              Publications and images are served as public website files. When you open an embedded PDF,
              your browser also requests the PDF viewer software from UNPKG, which receives the technical
              information associated with that request. Public publications originate from the society's
              Google Drive folders; website visitors are not asked to sign in to Drive.
            </p>
            <p>
              Public links to LinkedIn or other third-party websites are external services. When you follow
              those links, the privacy policies of the respective provider apply.
            </p>
          </Section>

          <Section title="Optional Analytics And Your Choice">
            <p>
              We use PostHog for analytics. PostHog is not loaded and nothing is measured until you choose
              Accept analytics or Reject cookies in the privacy banner.
            </p>
            <p>
              If you select Accept analytics, PostHog stores a visitor identifier in a first-party cookie and
              in your browser's local and session storage, so it can recognise returning visits. It measures
              page visits, referral sources, clicks and page interactions, browser and device information,
              approximate location derived from your IP address, page performance, and successful contact or
              newsletter requests and publication download clicks. It also records how you use the pages
              (session recordings), with all form field contents masked. Your IP address is used to derive
              approximate location and is not stored with the events.
            </p>
            <p>
              If you select Reject cookies, PostHog sets no cookies, stores no identifier in your browser (only a
              record of your choice) and records no clicks and no session recordings. It only counts page visits, referral sources, and successful contact or
              newsletter requests and publication download clicks. To count unique visitors without cookies,
              PostHog computes a hash on its servers from your IP address, browser user agent, our website's
              address and a value that changes daily; the IP address is then discarded and no location is
              derived. The same visitor therefore appears as a new visitor each day. If your browser sends a
              Do Not Track or Global Privacy Control signal, we treat it as a rejection of cookies and do not
              show the banner.
            </p>
            <p>
              Analytics events never include your name, email address, message or other form contents; the
              custom fields on download events include only the public publication type and identifier.
            </p>
            <p>
              You can change or withdraw your choice through Privacy settings in the footer at any time.
              Withdrawing acceptance stops session recordings, deletes the PostHog identifiers stored by this
              site in your browser and switches to cookieless counting. It does not automatically erase
              information already received by PostHog or affect the lawfulness of earlier processing.
            </p>
            <p>
              We remember your choice in local storage for 180 days, then ask again. After acceptance,
              PostHog's cookie has a lifetime of up to 365 days. We do not use advertising cookies or embedded
              social-media tracking widgets.
            </p>
          </Section>

          <Section title="Retention">
            <p>
              We retain correspondence while needed to handle your request and any continuing society
              relationship, subject to applicable legal obligations. Newsletter requests are kept while
              you wish to receive updates. You may ask us to remove your request or correspondence.
            </p>
            <p>
              Web3Forms' published privacy policy allows storage of submissions for up to three years,
              subject to account settings and deletion requests. Copies delivered to the society's inbox
              are separate from that provider storage. Vercel's technical logs follow its service retention
              practices. Our PostHog project keeps analytics events for up to one year and session recordings
              for 30 days. The browser-storage lifetimes above do not describe how long providers retain
              server-side records.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>
              If GDPR or French data protection law applies to your data, you may have rights to access,
              rectification, erasure, restriction, objection, and portability. You can contact us using the
              email above.
            </p>
            <p>
              You may withdraw consent at any time. For analytics, use Privacy settings; for newsletter
              requests or member information, contact AIS using the email above. You may also complain to{" "}
              <a href={legalMetadata.supervisoryAuthorityUrl} target="_blank" rel="noopener noreferrer" className="text-ais-ocean underline">
                CNIL
              </a>{" "}
              or your local data protection authority.
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
