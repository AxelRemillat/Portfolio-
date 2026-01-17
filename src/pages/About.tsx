import { Link } from "react-router-dom";
import { skills } from "../data/skills";

export default function About() {
  return (
    <section className="section">
      <h1>About me</h1>
      <p className="muted">
        Un aperçu humain et concret de ce que je construis, de ma manière de travailler et de
        la valeur que je peux apporter.
      </p>

      <div className="grid">
        <article className="card">
          <h2>Ce que je construis</h2>
          <p>
            Des produits web sobres, lisibles et orientés impact: interfaces claires, parcours
            efficaces et expériences premium pensées pour les utilisateurs finaux.
          </p>
        </article>

        <article className="card">
          <h2>Ma façon de travailler</h2>
          <p>
            J’avance par itérations rapides, en restant proche des besoins métier. J’aime clarifier
            les priorités, prototyper vite et livrer des fonctionnalités qui créent de la valeur.
          </p>
        </article>

        <article className="card">
          <h2>Ce que je peux apporter</h2>
          <p>
            Une combinaison de rigueur technique et de sens produit: autonomie, vision claire des
            parcours utilisateurs et capacité à transformer une idée en produit utilisable.
          </p>
        </article>
      </div>

      <div className="section">
        <h2>Compétences concrètes</h2>
        <p className="muted">Stack et outils que je maîtrise au quotidien.</p>
        <div className="grid skills-grid">
          {skills.map((group) => (
            <article key={group.title} className="card skill-card">
              <h3>{group.title}</h3>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item} className="skill-item">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Ce que je cherche</h2>
        <p>
          Un stage ou une opportunité où je peux contribuer à un produit ambitieux, apprendre au
          contact d’une équipe exigeante et apporter un regard orienté qualité et efficacité.
        </p>
        <Link className="btn primary" to="/contact">
          Me contacter
        </Link>
      </div>
    </section>
  );
}
