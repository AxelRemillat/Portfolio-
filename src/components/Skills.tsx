import { skills } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <h2>Compétences</h2>
      <p className="muted">Stack et outils que j'utilise régulièrement.</p>

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
    </section>
  );
}
