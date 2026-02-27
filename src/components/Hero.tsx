import { useEffect, useMemo, useRef, useState } from "react";
import TypingText from "./TypingText";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const carouselImages = [
  { src: "/images/Hero_photos/_MG_4453.JPG", alt: "Axel portrait 1", pos: "50% 12%" },
  { src: "/images/Hero_photos/_MG_4514.JPG", alt: "Axel portrait 2", pos: "50% 18%" },
  { src: "/images/Hero_photos/_MG_4572.JPG", alt: "Axel portrait 3", pos: "50% 8%" },
  { src: "/images/Hero_photos/_MG_4592.JPG", alt: "Axel portrait 4", pos: "50% 22%" },
];

function formatLastUpdateFR(daysBack: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysBack);

  const raw = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);

  return raw.replace(".", "");
}

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const mediaRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const lastUpdateLabel = useMemo(() => {
    return `Mis à jour • ${formatLastUpdateFR(5)}`;
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !mediaRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(mediaRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, isHovered]);

  const handleScrollToProjects = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);

    if (!prefersReducedMotion) {
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("span");
        particle.className = "particle";
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 20 + Math.random() * 10;
        particle.style.left = `${x + Math.cos(angle) * distance}px`;
        particle.style.top = `${y + Math.sin(angle) * distance}px`;
        button.appendChild(particle);
        setTimeout(() => particle.remove(), 1500);
      }
    }

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
      {/* Quote Cards — au-dessus du hero, juste sous la navbar */}
      <div className="floating-quotes">
        <div className="quote-card quote-card-1">
          <div className="quote-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 9L12 12L9 15M12 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="quote-text">
            Près de <span className="quote-highlight">8 entreprises sur 10</span> utilisent l'IA aujourd'hui — celles qui savent l'intégrer correctement génèrent jusqu'à <span className="quote-highlight">3,7 $ de ROI</span> par dollar investi.
          </p>
          <p className="quote-source">World Economic Forum</p>
        </div>

        <div className="quote-card quote-card-2">
          <div className="quote-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 7V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 7H21M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M10 11V15M14 11V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="quote-text">
            En moyenne, seules <span className="quote-highlight">20 % des données</span> collectées par une entreprise sont exploitées — près de <span className="quote-highlight">80 % restent sous-utilisées</span> ou inutilisées.
          </p>
          <p className="quote-source">The Leadership Board</p>
        </div>
      </div>

      <div className={`hero-shell ${isReady ? "hero-enter" : ""}`}>
        <div className="hero-left">
          <div className="hero-badges">
            <p className="badge">Portfolio</p>
            <p
              className="update-badge"
              aria-label={`Dernière mise à jour : ${lastUpdateLabel}`}
            >
              {lastUpdateLabel}
            </p>
          </div>

          <div className="hero-heading">
            <TypingText
              as="h1"
              text="Axel Remillat"
              className="hero-title typing-title"
              speedMs={22}
              startDelayMs={100}
            />
            <p className="subtitle">Étudiant ingénieur Big Data & IA</p>
          </div>

          <p className="hero-intro">
            Actuellement en 4ᵉ année à l'ESME Paris, école d'ingénieurs classée parmi les plus performantes de France (2ᵉ post-bac selon l'Usine Nouvelle en 2025), avec un taux d'embauche de 96 % en moins de 2 mois après diplôme et une pédagogie très axée sur les projets concrets.

            <br />
            <br />
            Je vous aide à prendre le train de l'IA pour ne pas laisser votre
            entreprise sur la touche.
            <br />
            <br />
            J'accompagne les entreprises dans son intégration concrète :
            automatisation intelligente, optimisation des workflows et
            valorisation stratégique des données.
            <br />
            <br />
            <span className="hero-strong">Objectif :</span> plus de performance,
            moins de friction. <span className="hero-strong">L'IA</span> n'est
            plus une option, c'est une nécessité.
          </p>

          <div className="actions">
            <button
              type="button"
              className="btn primary magnetic-btn"
              onClick={handleScrollToProjects}
              onMouseMove={(e) => {
                if (prefersReducedMotion) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                e.currentTarget.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
              }}
            >
              <span className="btn-text">Voir mes projets</span>
              <svg
                className="btn-arrow"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 4L10 16M10 16L6 12M10 16L14 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={mediaRef}
          className={`hero-right ${isVisible ? "is-visible" : ""}`}
          aria-label="Carousel photos"
        >
          <div
            className="hero-photo"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {carouselImages.map((image, index) => (
              <div
                key={image.src}
                className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="hero-photoImage"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  style={{ objectPosition: image.pos }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
