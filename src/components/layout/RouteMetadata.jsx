import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getHeadTags } from "../../data/pageMetadata.js";

export default function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const tags = getHeadTags(pathname);
    const canonical = tags.find((entry) => entry.rel === "canonical");
    // Keep the correct static head on first load; update it only after navigation.
    if (canonical && document.head.querySelector('link[data-ais-meta][rel="canonical"]')?.href === canonical.href) return;

    document.head.querySelectorAll("[data-ais-meta]").forEach((node) => node.remove());
    for (const { tag, text, ...attributes } of tags) {
      const node = document.createElement(tag);
      node.setAttribute("data-ais-meta", "");
      for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
      if (text) node.textContent = text;
      document.head.append(node);
    }
  }, [pathname]);

  return null;
}
