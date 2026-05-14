import { legalMetadata, legalSources } from "../data/legal";

export default function ImpressumPage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-sm uppercase tracking-wider text-ais-gray mb-3">
          Last updated {legalMetadata.lastUpdated}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-ais-navy mb-8">
          Impressum / Legal Notice
        </h1>

        <div className="space-y-10 text-ais-navy/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-ais-navy mb-4">Website Operator</h2>
            <p>{legalMetadata.organizationName}</p>
            <p>{legalMetadata.organizationType}</p>
            <address className="not-italic mt-3">
              {legalMetadata.addressLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </address>
          </section>

          <section className="border-t border-ais-silver/40 pt-8">
            <h2 className="text-2xl font-bold text-ais-navy mb-4">Contact</h2>
            <p>
              Email:{" "}
              <a href={`mailto:${legalMetadata.contactEmail}`} className="text-ais-ocean underline">
                {legalMetadata.contactEmail}
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a href={legalMetadata.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-ais-ocean underline">
                ESCP Alternative Investment Society
              </a>
            </p>
          </section>

          <section className="border-t border-ais-silver/40 pt-8">
            <h2 className="text-2xl font-bold text-ais-navy mb-4">Responsible For Content</h2>
            <p>
              The website content is maintained by the operating team of {legalMetadata.organizationName}.
              Public society information is based on AIS's public profiles and society materials.
            </p>
          </section>

          <section className="border-t border-ais-silver/40 pt-8">
            <h2 className="text-2xl font-bold text-ais-navy mb-4">External Links</h2>
            <p>
              This website may link to third-party websites, social media profiles, partner pages, and PDF
              resources. We are not responsible for third-party content or privacy practices after you leave
              this website.
            </p>
          </section>

          <section className="border-t border-ais-silver/40 pt-8">
            <h2 className="text-2xl font-bold text-ais-navy mb-4">Source Notes</h2>
            <p>
              The society description, nonprofit status, Paris headquarters, and campus addresses are taken
              from public AIS profiles. ESCP data protection contact details are taken from ESCP's public
              personal data protection policy.
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              {legalSources.slice(0, 2).map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-ais-ocean underline">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
