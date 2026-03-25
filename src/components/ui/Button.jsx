import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-ais-ocean text-white hover:bg-ais-ocean/80 border border-ais-ocean",
  secondary:
    "bg-transparent text-ais-ocean border border-ais-ocean hover:bg-ais-ocean hover:text-white",
  ghost:
    "bg-transparent text-ais-navy hover:bg-ais-navy/5 border border-transparent",
};

export default function Button({
  children,
  variant = "primary",
  to,
  href,
  className = "",
  ...props
}) {
  const baseClasses = `inline-flex items-center justify-center px-6 py-3 rounded text-sm font-semibold transition-all duration-200 ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
}
