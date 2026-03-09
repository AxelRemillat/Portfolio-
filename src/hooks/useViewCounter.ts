import { useEffect, useState } from "react";

const SESSION_KEY = "ar-view-counted";

export function useViewCounter() {
  // "loading" = chargement en cours, number = valeur reçue
  const [count, setCount] = useState<number | "loading">("loading");

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem(SESSION_KEY);
    const url = alreadyCounted ? "/api/views" : "/api/views?hit=1";

    fetch(url)
      .then((r) => r.json())
      .then((d: { count?: number }) => {
        if (typeof d.count === "number") {
          setCount(d.count);
          if (!alreadyCounted) sessionStorage.setItem(SESSION_KEY, "1");
        } else {
          setCount(0);
        }
      })
      .catch(() => setCount(0));
  }, []);

  return count;
}
