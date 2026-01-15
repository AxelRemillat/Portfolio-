import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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
  const mediaRef = useRef<HTMLDivElement | null>(null);

  const handleImageError = (key: "primary" | "secondary") => () => {
    setImageErrors((prev) => ({ ...prev, [key]: true }));
  };

  useEffect(() => {
    if (typeof window === "undefined" || !mediaRef.current) {
      return;
    }

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

  return (
    <header className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <p className="badge">Portfolio</p>

          <h1 className="hero-title">Axel Remillat</h1>

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
            <Link className="btn primary" to="/projets">
              Voir mes projets
            </Link>
            <Link className="btn" to="/parcours">
              Mon parcours
            </Link>
            <Link className="btn" to="/contact">
              Me contacter
            </Link>
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
