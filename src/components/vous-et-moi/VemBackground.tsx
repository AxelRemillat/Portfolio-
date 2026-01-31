import { useEffect, useRef } from "react";

export default function VemBackground() {
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const node = backgroundRef.current;
    if (!node || prefersReducedMotion) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      node.style.setProperty("--vem-scroll", progress.toFixed(3));
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
