import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import "../../styles/parcours/parcours-background.css";

type Vec = { x: number; y: number };

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ParcoursBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const rootRef = useRef<HTMLDivElement | null>(null);

  const rafRef = useRef<number | null>(null);
  const mouseTarget = useRef<Vec>({ x: 50, y: 40 });
  const mouseCurrent = useRef<Vec>({ x: 50, y: 40 });
  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);

  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    // init vars (scopées à ce background)
    rootEl.style.setProperty("--mx", "50%");
    rootEl.style.setProperty("--my", "40%");
    rootEl.style.setProperty("--parallaxY", "0px");

    if (prefersReducedMotion) return;

    const tick = () => {
      rafRef.current = null;

      mouseCurrent.current.x = lerp(mouseCurrent.current.x, mouseTarget.current.x, 0.12);
      mouseCurrent.current.y = lerp(mouseCurrent.current.y, mouseTarget.current.y, 0.12);
      scrollCurrent.current = lerp(scrollCurrent.current, scrollTarget.current, 0.08);

      rootEl.style.setProperty("--mx", `${mouseCurrent.current.x.toFixed(2)}%`);
      rootEl.style.setProperty("--my", `${mouseCurrent.current.y.toFixed(2)}%`);
      rootEl.style.setProperty("--parallaxY", `${scrollCurrent.current.toFixed(1)}px`);

      const dx = Math.abs(mouseCurrent.current.x - mouseTarget.current.x);
      const dy = Math.abs(mouseCurrent.current.y - mouseTarget.current.y);
      const ds = Math.abs(scrollCurrent.current - scrollTarget.current);

      if (dx > 0.01 || dy > 0.01 || ds > 0.2) {
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth) * 100;
      mouseTarget.current.y = (e.clientY / window.innerHeight) * 100;
      schedule();
    };

    const onScroll = () => {
      const max = 80;
      const raw = window.scrollY * 0.06;
      scrollTarget.current = clamp(raw, 0, max);
      schedule();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={rootRef} className="parcours-bg" aria-hidden="true">
      <div className="parcours-bg__image" />
      <div className="parcours-bg__vignette" />
      <div className="parcours-bg__grain" />
      <div className="parcours-bg__cursorGlow" />
    </div>
  );
}
