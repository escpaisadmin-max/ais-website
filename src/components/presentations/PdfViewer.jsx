import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ pdfPath }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="bg-ais-ice rounded-lg p-4">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
          disabled={pageNumber <= 1}
          className="px-3 py-1.5 bg-ais-navy text-white text-sm rounded disabled:opacity-30 hover:bg-ais-slate transition-colors"
        >
          Previous
        </button>
        <span className="text-sm text-ais-navy">
          Page {pageNumber} of {numPages || "..."}
        </span>
        <button
          onClick={() => setPageNumber(Math.min(numPages || 1, pageNumber + 1))}
          disabled={pageNumber >= (numPages || 1)}
          className="px-3 py-1.5 bg-ais-navy text-white text-sm rounded disabled:opacity-30 hover:bg-ais-slate transition-colors"
        >
          Next
        </button>
      </div>

      {/* PDF */}
      <div className="flex justify-center overflow-auto">
        <Document
          file={pdfPath}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-96">
              <p className="text-ais-gray">Loading PDF...</p>
            </div>
          }
          error={
            <div className="flex items-center justify-center h-96">
              <p className="text-ais-gray">
                Unable to load PDF.{" "}
                <a href={pdfPath} download className="text-ais-ocean underline">
                  Download instead
                </a>
              </p>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            width={Math.min(800, typeof window !== "undefined" ? window.innerWidth - 80 : 800)}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>
    </div>
  );
}
