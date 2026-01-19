import { useEffect, useRef } from "react";

function clamp01(n: number) {
  return Math.min(Math.max(n, 0), 1);
}

export default function VemBackground() {
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = backgroundRef.current;
    if (!node) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;

      if (media.matches) return;

      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 0);
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      node.style.setProperty("--vem-scroll", clamp01(progress).toFixed(3));
    };

    const schedule = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(update);
    };

    const onPrefChange = () => schedule();

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", onPrefChange);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", onPrefChange);
    };
  }, []);

  return (
    <div ref={backgroundRef} className="vem-background" aria-hidden="true">
      <div className="vem-background__gradient" />
      <span className="vem-background__blob vem-background__blob--one" />
      <span className="vem-background__blob vem-background__blob--two" />
      <span className="vem-background__blob vem-background__blob--three" />
    </div>
  );
}
