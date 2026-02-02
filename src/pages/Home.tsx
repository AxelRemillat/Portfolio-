import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import ProjectsCarousel3D from "../components/ProjectsCarousel3D";
import HomeBackground from "../components/home/HomeBackground";
import TechScroller from "../components/home/TechScroller";

import { projects } from "../data/projects";

export default function Home() {
  return (
    <main className="home-page" aria-label="Accueil">
      {/* Fond global */}
      <HomeBackground />

      {/* Contenu principal */}
      <div className="page-stack">
        {/* Hero */}
        <Hero />

        {/* Bandeau technos (indépendant du Hero) */}
        <TechScroller />

        {/* Projets */}
        <ProjectsCarousel3D projects={projects} />

        {/* Next steps */}
        <section className="section next-steps">
          <h2>Next steps</h2>
          <p className="muted">
            Pour aller plus loin après les projets.
          </p>

          <div className="grid next-steps-grid">
            <Link className="card next-step-card" to="/parcours">
              <div>
                <h3>Mon parcours</h3>
                <p className="muted">
                  Timeline et expériences clés.
                </p>
              </div>
              <span aria-hidden="true">→</span>
            </Link>

            <Link className="card next-step-card" to="/about">
              <div>
                <h3>About me</h3>
                <p className="muted">
                  Mon approche produit et mes compétences.
                </p>
              </div>
              <span aria-hidden="true">→</span>
            </Link>

            <Link className="card next-step-card" to="/contact">
              <div>
                <h3>Me contacter</h3>
                <p className="muted">
                  Discutons d’une opportunité.
                </p>
              </div>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
