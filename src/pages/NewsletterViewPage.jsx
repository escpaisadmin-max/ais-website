import { lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { newsletters } from "../data/newsletters";
import Button from "../components/ui/Button";
import NewsletterCTA from "../components/newsletters/NewsletterCTA";

const PdfViewer = lazy(() => import("../components/presentations/PdfViewer"));

export default function NewsletterViewPage() {
  const { id } = useParams();
  const newsletter = newsletters.find((n) => n.id === id);

  if (!newsletter) {
    return (
      <section className="py-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-ais-navy mb-4">
            Newsletter Not Found
          </h1>
          <Link
            to="/newsletters"
            className="text-ais-ocean hover:underline font-semibold"
          >
            Back to Newsletters
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Link
              to="/newsletters"
              className="inline-flex items-center text-ais-ocean hover:underline mb-2 text-sm font-semibold"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Newsletters
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-ais-navy">
              {newsletter.title}
            </h1>
            <p className="text-ais-gray mt-1">
              Issue #{newsletter.issue} &middot; {newsletter.date} &middot; {newsletter.pageCount} pages
            </p>
          </div>
          <Button
            href={newsletter.pdfPath}
            variant="primary"
            download
          >
            Download PDF
          </Button>
        </div>

        {/* PDF Viewer */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-96 bg-ais-ice rounded-lg">
              <p className="text-ais-gray">Loading viewer...</p>
            </div>
          }
        >
          <PdfViewer pdfPath={newsletter.pdfPath} />
        </Suspense>

        {/* CTA below the viewer */}
        <div className="mt-12">
          <NewsletterCTA />
        </div>
      </div>
    </section>
  );
}
