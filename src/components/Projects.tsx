import type { Project } from "../data/projects";

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  return (
    <div className="grid projects-grid">
      {projects.map((p) => (
        <article key={p.title} className="card project-card">
          <div className="project-header">
            <h3>{p.title}</h3>
            <p className="muted">{p.description}</p>
          </div>

          <div className="tags">
            {p.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <p className="project-value">
            <span className="project-value-label">Valeur entreprise:</span> {p.value}
          </p>

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
  );
}
