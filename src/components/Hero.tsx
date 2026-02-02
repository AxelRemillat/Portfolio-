import { useEffect, useRef, useState } from "react";
import TypingText from "./TypingText";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const highlights = [
  "React & Firebase pour des produits rapides.",
  "Automatisation & IA pour gagner du temps.",
  "Produits propres, sobres et efficaces.",
];

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const mediaRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleImageError = () => setImageError(true);

  // Trigger entrée (classe CSS) après 1 frame
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Reveal photo uniquement quand visible
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
    <header className="hero" aria-label="Présentation">
      <div className={`hero-shell ${isReady ? "hero-enter" : ""}`}>
        <div className="hero-left">
          <p className="badge">Portfolio</p>

          <div className="hero-heading">
            <TypingText
              as="h1"
              text="Axel Remillat"
              className="hero-title typing-title"
              speedMs={22}
              startDelayMs={100}
            />
            <p className="subtitle">Étudiant ingénieur</p>
          </div>

          <p className="hero-intro">
            Je conçois des produits web <span className="hero-strong">sobres</span> et{" "}
            <span className="hero-strong">efficaces</span>. Je recherche un stage, des
            projets concrets ou une opportunité pour <span className="hero-strong">créer de la valeur</span>.
          </p>

          <div className="hero-highlights">
            {highlights.map((item) => (
              <div key={item} className="highlight">
                <span className="highlight-dot" aria-hidden="true" />
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
          className={`hero-right ${isVisible ? "is-visible" : ""}`}
          aria-label="Photo de profil"
        >
          <div className="hero-photo">
            {imageError ? (
              <div className="hero-photoFallback">Photo</div>
            ) : (
              <img
                src="/me-1.jpg"
                alt="Photo d’Axel"
                className="hero-photoImage"
                onError={handleImageError}
                loading="eager"
                decoding="async"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
