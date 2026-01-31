import { useEffect, useState } from "react";
import type { RefObject } from "react";

type ScrollProgressOptions = {
  disabled?: boolean;
};

export default function useScrollProgress(
  target: RefObject<HTMLElement>,
  options: ScrollProgressOptions = {}
) {
  const { disabled = false } = options;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (disabled) {
      setProgress(1);
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const node = target.current;
      if (!node) {
        return;
      }
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const raw = 1 - rect.top / viewport;
      const clamped = Math.min(Math.max(raw, 0), 1);
      setProgress(clamped);
    };

    const onScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [disabled, target]);

  return progress;
}
