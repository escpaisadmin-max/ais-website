import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Tag from "../ui/Tag";
import { divisions } from "../../data/divisions";

export default function NewsletterCard({ newsletter }) {
  const division = divisions.find((d) => d.id === newsletter.department);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-lg border border-ais-silver/30 hover:border-ais-ocean/30 hover:shadow-lg transition-shadow duration-300 bg-white p-6"
    >
      {/* Tags */}
      <div className="flex items-center gap-2 mb-3">
        {division && <Tag label={division.shortName} type={newsletter.department} />}
        <span className="text-xs text-ais-gray">Issue #{newsletter.issue}</span>
        <span className="text-xs text-ais-gray">&middot; {newsletter.date}</span>
      </div>

      {/* Title & description */}
      <h3 className="text-lg font-bold text-ais-navy mb-2">
        {newsletter.title}
      </h3>
      <p className="text-sm text-ais-gray mb-4 line-clamp-3">
        {newsletter.description}
      </p>

      <p className="text-xs text-ais-gray mb-4">{newsletter.pageCount} pages</p>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          to={`/newsletters/${newsletter.id}`}
          className="px-4 py-2 bg-ais-ocean text-white text-sm font-semibold rounded hover:bg-ais-ocean/80 transition-colors"
        >
          Read
        </Link>
        <a
          href={newsletter.pdfPath}
          download
          className="px-4 py-2 border border-ais-ocean text-ais-ocean text-sm font-semibold rounded hover:bg-ais-ocean hover:text-white transition-colors"
        >
          Download
        </a>
      </div>
    </motion.div>
  );
}
