import { useEffect, useRef, useState } from "react";
import TypingText from "./TypingText";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const highlights = [
  "React & Firebase pour des produits rapides.",
  "Automatisation & IA pour gagner du temps.",
  "Produits propres, sobres et efficaces.",
];

const carouselImages = [
  { src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&h=1000&fit=crop", alt: "Photo 1" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop", alt: "Photo 2" },
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1000&fit=crop", alt: "Photo 3" },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop", alt: "Photo 4" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const mediaRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

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
      { threshold: 0.35 },
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
    
    // Ripple effect
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
    
    // Particules
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
                e.currentTarget.style.transform = 'translate(0, 0)';
              }}
            >
              <span className="btn-text">Voir mes projets</span>
              <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4L10 16M10 16L6 12M10 16L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}