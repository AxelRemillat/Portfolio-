import { useEffect, useRef, useState } from "react";

type RevealOptions = {
  /**
   * Si true: l’animation se rejoue à chaque entrée/sortie du viewport.
   * Si false: reveal “one-shot” (une fois visible, reste visible).
   */
  replay?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export default function useRevealOnScroll<T extends HTMLElement>(
  options: RevealOptions = {},
) {
  const {
    replay = true,
    threshold = 0.15,
    rootMargin = "0px 0px -10% 0px",
  } = options;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (replay) {
          setIsVisible(entry.isIntersecting);
          return;
        }

        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [replay, rootMargin, threshold]);

  return { ref, isVisible };
}
