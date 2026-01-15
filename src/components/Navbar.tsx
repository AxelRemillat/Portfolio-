import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Parcours", to: "/parcours" },
  { label: "Projets", to: "/projets" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <span className="brand">AR</span>
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
