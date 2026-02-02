import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

type Vec = { x: number; y: number };

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function HomeBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const rafRef = useRef<number | null>(null);
  const mouseTarget = useRef<Vec>({ x: 50, y: 45 });
  const mouseCurrent = useRef<Vec>({ x: 50, y: 45 });
  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--hero-mx", "50%");
    root.style.setProperty("--hero-my", "45%");
    root.style.setProperty("--bg-parallax", "0px");

    if (prefersReducedMotion) return;

    const tick = () => {
      rafRef.current = null;

      mouseCurrent.current.x = lerp(mouseCurrent.current.x, mouseTarget.current.x, 0.12);
      mouseCurrent.current.y = lerp(mouseCurrent.current.y, mouseTarget.current.y, 0.12);
      scrollCurrent.current = lerp(scrollCurrent.current, scrollTarget.current, 0.08);

      root.style.setProperty("--hero-mx", `${mouseCurrent.current.x.toFixed(2)}%`);
      root.style.setProperty("--hero-my", `${mouseCurrent.current.y.toFixed(2)}%`);
      root.style.setProperty("--bg-parallax", `${scrollCurrent.current.toFixed(1)}px`);

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
    <div className="home-background" aria-hidden="true">
      {/* Image 5K Upscaled */}
      <img
        className="home-background__img"
        src="/images/home-hero-bg_upscayl_5x_upscayl-standard-4x.png"
        alt=""
        loading="eager"
        decoding="async"
      />

      {/* Soleil SVG stylisé */}
      <svg
        className="home-background__sun"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff7aa" />
            <stop offset="50%" stopColor="#ffcc33" />
            <stop offset="100%" stopColor="#ff8800" />
          </radialGradient>
        </defs>

        {/* Cœur du soleil */}
        <circle cx="100" cy="100" r="40" fill="url(#sunCore)" />

        {/* Flammes stylisées */}
        <g className="flames">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <path
                key={i}
                d={`
                  M 100 20
                  C 95 0, 105 0, 100 20
                `}
                fill="#ff9800"
                transform={`rotate(${angle} 100 100)`}
              />
            );
          })}
        </g>
      </svg>

      {/* Vignette + grain */}
      <div className="home-background__vignette" />
      <div className="home-background__grain" />
    </div>
  );
}
