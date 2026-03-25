const colorMap = {
  pe: "bg-ais-ocean/10 text-ais-ocean border-ais-ocean/20",
  vc: "bg-ais-periwinkle/20 text-ais-navy border-ais-periwinkle/30",
  hf: "bg-ais-slate/10 text-ais-slate border-ais-slate/20",
  re: "bg-ais-navy/10 text-ais-navy border-ais-navy/20",
  markets: "bg-ais-ocean/10 text-ais-ocean border-ais-ocean/20",
  general: "bg-ais-gray/10 text-ais-gray border-ais-gray/20",
};

export default function Tag({ label, type = "general", className = "" }) {
  const colors = colorMap[type] || colorMap.general;

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${colors} ${className}`}
    >
      {label}
    </span>
  );
}
