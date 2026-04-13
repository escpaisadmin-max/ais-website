import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Tag from "../ui/Tag";
import { divisions } from "../../data/divisions";

export default function PresentationCard({ presentation }) {
  const division = divisions.find((d) => d.id === presentation.department);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-lg border border-ais-silver/30 hover:border-ais-ocean/30 hover:shadow-lg transition-shadow duration-300 bg-white p-6 h-full flex flex-col"
    >
      {/* Tags */}
      <div className="flex items-center gap-2 mb-3">
        {division && <Tag label={division.shortName} type={presentation.department} />}
        <span className="text-xs text-ais-gray">#{presentation.id.split("-")[1]}</span>
        <span className="text-xs text-ais-gray">&middot; {presentation.date}</span>
      </div>

      {/* Title & description */}
      <Link to={`/presentations/${presentation.id}`}>
        <h3 className="text-lg font-bold text-ais-navy mb-2 hover:text-ais-ocean transition-colors">
          {presentation.title}
        </h3>
      </Link>
      <p className="text-sm text-ais-gray mb-1">{presentation.topic}</p>
      <p className="text-sm text-ais-gray mb-4 line-clamp-2 flex-1">
        {presentation.description}
      </p>

      <p className="text-xs text-ais-gray mb-4 mt-auto">{presentation.pageCount} pages</p>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          to={`/presentations/${presentation.id}`}
          className="px-4 py-2 bg-ais-ocean text-white text-sm font-semibold rounded hover:bg-ais-ocean/80 transition-colors"
        >
          View
        </Link>
        <a
          href={presentation.pdfPath}
          download
          className="px-4 py-2 border border-ais-ocean text-ais-ocean text-sm font-semibold rounded hover:bg-ais-ocean hover:text-white transition-colors"
        >
          Download
        </a>
      </div>
    </motion.div>
  );
}
