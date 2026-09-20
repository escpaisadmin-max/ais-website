import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getHeadTags } from "../../data/pageMetadata.js";

export default function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.head.querySelectorAll("[data-ais-meta]").forEach((node) => node.remove());
    for (const { tag, text, ...attributes } of getHeadTags(pathname)) {
      const node = document.createElement(tag);
      node.setAttribute("data-ais-meta", "");
      for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
      if (text) node.textContent = text;
      document.head.append(node);
    }
  }, [pathname]);

  return null;
}
