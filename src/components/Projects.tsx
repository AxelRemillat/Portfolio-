import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <h2>Projets</h2>
      <p>Une sélection de projets que je peux présenter en entretien.</p>

      <div className="grid">
        {projects.map((p) => (
          <article key={p.title} className="card">
            <h3>{p.title}</h3>
            <p className="muted">{p.description}</p>

            <div className="tags">
              {p.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>

            <div className="links">
              {p.repoUrl && (
                <a className="link" href={p.repoUrl} target="_blank" rel="noreferrer">
                  Repo
                </a>
              )}
              {p.liveUrl && (
                <a className="link" href={p.liveUrl} target="_blank" rel="noreferrer">
                  Live
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
