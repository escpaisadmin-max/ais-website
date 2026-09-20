import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useInView } from "react-intersection-observer";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function ScrollablePage({ pageNumber, width }) {
  const [aspectRatio, setAspectRatio] = useState(1 / Math.SQRT2);
  const { ref, inView } = useInView({
    rootMargin: "600px 0px",
    triggerOnce: true,
    initialInView: pageNumber === 1,
    fallbackInView: true,
  });

  return (
    <div ref={ref} style={{ width, minHeight: width / aspectRatio }}>
      {inView && (
        <Page
          pageNumber={pageNumber}
          width={width}
          onLoadSuccess={({ originalWidth, originalHeight }) => setAspectRatio(originalWidth / originalHeight)}
          renderTextLayer={true}
          renderAnnotationLayer={true}
        />
      )}
    </div>
  );
}

export default function PdfViewer({ pdfPath, continuous = false }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setPageWidth(Math.min(700, entry.contentRect.width));
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="bg-ais-ice rounded-lg p-4 flex flex-col" style={continuous ? undefined : { maxHeight: "80vh" }}>
      {/* Controls */}
      {!continuous && <div className="flex items-center justify-between mb-4 flex-shrink-0">
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
      </div>}

      {/* Newsletters scroll with the page; paginated documents keep their capped viewer. */}
      <div ref={containerRef} className={`flex justify-center min-w-0 ${continuous ? "" : "overflow-auto flex-1 min-h-0"}`}>
        <Document
          file={pdfPath}
          className={continuous ? "space-y-4" : undefined}
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
          {pageWidth > 0 && (continuous ? (
            Array.from({ length: numPages || 0 }, (_, index) => (
              <ScrollablePage key={`${pdfPath}-${index}`} pageNumber={index + 1} width={pageWidth} />
            ))
          ) : <Page
            pageNumber={pageNumber}
            width={pageWidth}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />)}
        </Document>
      </div>
    </div>
  );
}
