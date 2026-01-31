import { NavLink, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Parcours", to: "/parcours" },
  { label: "Vous & Moi", to: "/vous-et-moi" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToProjects = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
        <span className="brand">Axel Remillat</span>
        <nav className="nav">
          
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
