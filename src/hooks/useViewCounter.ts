import { useEffect, useState } from "react";

const HIT_URL = "https://api.countapi.xyz/hit/axelremillat/portfolio-views";
const GET_URL = "https://api.countapi.xyz/get/axelremillat/portfolio-views";
const SESSION_KEY = "ar-view-counted";

export function useViewCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem(SESSION_KEY);
    const url = alreadyCounted ? GET_URL : HIT_URL;

    fetch(url)
      .then((r) => r.json())
      .then((d: { value?: number }) => {
        if (typeof d.value === "number") {
          setCount(d.value);
          if (!alreadyCounted) sessionStorage.setItem(SESSION_KEY, "1");
        }
      })
      .catch(() => {/* silent — le compteur ne bloque pas le site */});
  }, []);

  return count;
}
