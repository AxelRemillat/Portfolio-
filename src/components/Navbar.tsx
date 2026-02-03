import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSiteAudio } from "../audio/AudioProvider";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Parcours", to: "/parcours" },
  { label: "Vous & Moi", to: "/vous-et-moi" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isEnabled, toggle } = useSiteAudio();

  const scrollToProjects = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const target = document.getElementById("projects");
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const handleProjectsClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      window.requestAnimationFrame(() => {
        scrollToProjects();
      });
    } else {
      scrollToProjects();
    }
  };

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
