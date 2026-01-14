import { useState } from "react";
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

  const handleImageError = (key: "primary" | "secondary") => () => {
    setImageErrors((prev) => ({ ...prev, [key]: true }));
  };

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

        <div className="hero-media">
          {imageErrors.primary ? (
            <div className="photo-frame">Photo</div>
          ) : (
            <img
              src="/me-1.jpg"
              alt="Portrait principal"
              className="photo"
              onError={handleImageError("primary")}
            />
          )}
          {imageErrors.secondary ? (
            <div className="photo-frame">Photo</div>
          ) : (
            <img
              src="/me-2.jpg"
              alt="Portrait secondaire"
              className="photo"
              onError={handleImageError("secondary")}
            />
          )}
        </div>
      </div>
    </header>
  );
}
