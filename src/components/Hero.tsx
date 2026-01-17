import { useEffect, useRef, useState } from "react";
import TypingText from "./TypingText";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const highlights = [
  "React & Firebase pour des produits rapides.",
  "Automatisation & IA pour gagner du temps.",
  "Produits propres, sobres et efficaces.",
];

export default function Hero() {
  const [imageErrors, setImageErrors] = useState({
    primary: false,
    secondary: false,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleImageError = (key: "primary" | "secondary") => () => {
    setImageErrors((prev) => ({ ...prev, [key]: true }));
  };

  useEffect(() => {
    if (typeof window === "undefined" || !mediaRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(mediaRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handleScrollToProjects = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = document.getElementById("projects");

    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    } else {
      window.location.hash = "#projects";
    }
  };

  return (
    <header className="hero">
      <div className={`hero-content ${isReady ? "hero-enter" : ""}`}>
        <div className="hero-text">
          <p className="badge">Portfolio</p>

          <TypingText
            as="h1"
            text="Axel Remillat"
            className="hero-title typing-title"
            speedMs={24}
            startDelayMs={120}
          />

          <p className="subtitle">Étudiant ingénieur</p>

          <p className="hero-intro">
            Je conçois des produits web sobres et efficaces. Je recherche un stage,
            des projets concrets ou une opportunité pour créer de la valeur.
          </p>

          <div className="hero-highlights">
            {highlights.map((item) => (
              <div key={item} className="highlight">
                <span className="highlight-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="actions">
            <button
              type="button"
              className="btn primary"
              onClick={handleScrollToProjects}
            >
              Voir mes projets
            </button>
          </div>
        </div>

        <div
          ref={mediaRef}
          className={`hero-media ${isVisible ? "is-visible" : ""}`}
        >
          <div className="portrait" data-variant="primary">
            {imageErrors.primary ? (
              <div className="portrait-fallback">Photo</div>
            ) : (
              <img
                src="/me-1.jpg"
                alt="Portrait principal"
                className="portrait-image"
                onError={handleImageError("primary")}
              />
            )}
          </div>

          <div className="portrait" data-variant="secondary">
            {imageErrors.secondary ? (
              <div className="portrait-fallback">Photo</div>
            ) : (
              <img
                src="/me-2.jpg"
                alt="Portrait secondaire"
                className="portrait-image"
                onError={handleImageError("secondary")}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
