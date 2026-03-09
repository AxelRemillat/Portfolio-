import { NavLink } from "react-router-dom";
import { useSiteAudio } from "../audio/AudioProvider";
import { useViewCounter } from "../hooks/useViewCounter";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Parcours", to: "/parcours" },
  { label: "Vous & Moi", to: "/vous-et-moi" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const { isEnabled, toggle } = useSiteAudio();
  const viewCount = useViewCounter();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <button
            type="button"
            className={`nav-audio-toggle ${isEnabled ? "is-on" : "is-off"}`}
            onClick={toggle}
            aria-label={isEnabled ? "Couper la musique" : "Activer la musique"}
            title={isEnabled ? "Musique : ON" : "Musique : OFF"}
          >
            {isEnabled ? "🔊" : "🔇"}
          </button>

          <span className="brand">Axel Remillat</span>
          {viewCount !== null && (
            <span className="nav-view-count" title="Visiteurs uniques">
              👁 {viewCount.toLocaleString("fr-FR")}
            </span>
          )}
        </div>

        <nav className="nav">
          {/* (optionnel) si tu veux un lien Projets dans la navbar plus tard :
              <button type="button" className="nav-link" onClick={handleProjectsClick}>
                Projets
              </button>
          */}

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
