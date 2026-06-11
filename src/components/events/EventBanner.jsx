import { useState } from "react";
import { divisions } from "../../data/divisions";

/**
 * EventBanner
 * ===========
 * Hero/card image for an event.
 *  - If `event.photo` is set (a real event photo), it's shown as the image.
 *  - Otherwise a branded navy→ocean gradient banner is rendered, with the
 *    light partner logo (`event.bannerLogo`) when available. On the detail
 *    variant the event title, date and division are overlaid.
 *
 * variant: "detail" (large, with title overlay) | "card" (compact, logo only)
 */
export default function EventBanner({ event, variant = "detail" }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const isDetail = variant === "detail";
  const division = divisions.find((d) => d.id === event.division);

  const heightClass = isDetail ? "h-64 md:h-96" : "h-48";

  // Real photo available → show it.
  if (event.photo) {
    return (
      <div className={`relative overflow-hidden bg-ais-navy ${heightClass}`}>
        <img
          src={event.photo}
          alt={event.title}
          className={`w-full h-full ${
            event.photoFit === "contain" ? "object-contain p-8" : "object-cover"
          }`}
          loading={isDetail ? undefined : "lazy"}
        />
      </div>
    );
  }

  // No photo yet → branded gradient banner.
  const showLogo = event.bannerLogo && !logoFailed;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-ais-navy via-ais-navy to-ais-ocean ${heightClass}`}
    >
      {/* Centered partner logo */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        {showLogo ? (
          <img
            src={event.bannerLogo}
            alt={event.partnerName}
            onError={() => setLogoFailed(true)}
            className={`object-contain ${
              isDetail ? "max-h-24 md:max-h-32 max-w-[60%]" : "max-h-14 max-w-[55%]"
            }`}
          />
        ) : (
          !isDetail && (
            <span className="text-white/90 font-bold text-center px-4">
              {event.partnerName}
            </span>
          )
        )}
      </div>

      {/* Title overlay (detail only) */}
      {isDetail && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ais-navy/70 to-transparent p-6 md:p-8">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
            <span className="text-ais-ice">{event.date}</span>
            {division && (
              <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                {division.name}
              </span>
            )}
            <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold capitalize text-white">
              {event.type}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
