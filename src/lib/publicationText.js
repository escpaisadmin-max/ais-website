// Extracted PDF text for publication pages. At build time the prerender passes it in
// through PublicationTextContext; in the browser it comes from the JSON embedded in the
// prerendered page or, after client side navigation, from /<library>/text/<id>.json.
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const PublicationTextContext = createContext(null);

function embeddedText(url) {
  if (typeof document === "undefined") return null;
  const node = document.getElementById("ais-publication-text");
  if (!node) return null;
  try {
    const data = JSON.parse(node.textContent);
    return data?.url === url ? data : null;
  } catch {
    return null;
  }
}

export function usePublicationText(url) {
  const prerendered = useContext(PublicationTextContext);
  const embedded = useMemo(() => embeddedText(url), [url]);
  const ready = prerendered?.url === url ? prerendered : embedded;
  const [fetched, setFetched] = useState({ url: null, data: null, failed: false });

  useEffect(() => {
    if (ready || fetched.url === url) return undefined;
    let cancelled = false;
    fetch(url)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((data) => { if (!cancelled) setFetched({ url, data: { ...data, url }, failed: false }); })
      .catch(() => { if (!cancelled) setFetched({ url, data: null, failed: true }); });
    return () => { cancelled = true; };
  }, [url, ready, fetched.url]);

  if (ready) return { data: ready, failed: false };
  return fetched.url === url ? fetched : { data: null, failed: false };
}
