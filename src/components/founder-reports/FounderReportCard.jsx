import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function FounderReportCard({ report }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-lg border border-ais-silver/30 hover:border-ais-ocean/30 hover:shadow-lg transition-shadow duration-300 bg-white p-6 h-full flex flex-col"
    >
      {/* Meta */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-ais-ocean">
          Founder Report
        </span>
        <span className="text-xs text-ais-gray">&middot; {report.date}</span>
      </div>

      {/* Title & description */}
      <Link to={`/founder-report/${report.id}`}>
        <h3 className="text-lg font-bold text-ais-navy mb-2 hover:text-ais-ocean transition-colors">
          {report.title}
        </h3>
      </Link>
      <p className="text-sm text-ais-gray mb-4 line-clamp-3 flex-1">
        {report.description}
      </p>

      {report.pageCount > 0 && (
        <p className="text-xs text-ais-gray mb-4 mt-auto">{report.pageCount} pages</p>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          to={`/founder-report/${report.id}`}
          className="px-4 py-2 bg-ais-ocean text-white text-sm font-semibold rounded hover:bg-ais-ocean/80 transition-colors"
        >
          Read
        </Link>
        <a
          href={report.pdfPath}
          download
          className="px-4 py-2 border border-ais-ocean text-ais-ocean text-sm font-semibold rounded hover:bg-ais-ocean hover:text-white transition-colors"
        >
          Download
        </a>
      </div>
    </motion.div>
  );
}
