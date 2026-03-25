export default function SectionHeading({ title, subtitle, light = false, className = "" }) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2
        className={`text-3xl md:text-4xl font-bold mb-4 ${
          light ? "text-ais-white" : "text-ais-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl mx-auto ${
            light ? "text-ais-silver" : "text-ais-gray"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
