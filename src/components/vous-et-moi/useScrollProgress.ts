import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

type ScrollProgressOptions = {
  disabled?: boolean;
  /**
   * Où commence l'animation (en % de viewport).
   * 0.85 => démarre quand le haut de la section atteint ~85% du viewport.
   */
  start?: number;
  /**
   * Où finit l'animation (en % de viewport).
   * 0.25 => finit quand le haut de la section arrive à ~25% du viewport.
   */
  end?: number;
};

function clamp01(n: number) {
  return Math.min(Math.max(n, 0), 1);
}

/** petite courbe "ciné" */
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function useScrollProgress(
  target: RefObject<HTMLElement>,
  options: ScrollProgressOptions = {},
) {
  const { disabled = false, start = 0.85, end = 0.25 } = options;

  const [progress, setProgress] = useState(0);
  const lastRef = useRef(-1);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (disabled) {
      setProgress(1);
      return;
    }

    const update = () => {
      rafRef.current = null;

      const node = target.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // On mappe rect.top entre (start*vh) -> (end*vh)
      // start (bas de viewport) => progress 0
      // end (plus haut) => progress 1
      const startPx = vh * start;
      const endPx = vh * end;
      const range = startPx - endPx || 1;

      const raw = (startPx - rect.top) / range;
      const clamped = clamp01(raw);
      const eased = easeOutCubic(clamped);

      // évite de spam setState pour des micro variations
      if (Math.abs(eased - lastRef.current) > 0.002) {
        lastRef.current = eased;
        setProgress(eased);
      }
    };

    const schedule = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [disabled, end, start, target]);

  return progress;
}
