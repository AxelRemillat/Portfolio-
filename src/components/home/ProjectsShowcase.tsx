import { useMemo, useState } from "react";
import { projects, type Project } from "../../data/projects";
import ProjectModal from "./ProjectModal";

export default function ProjectsShowcase() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const activeProject: Project | null = useMemo(() => {
    if (!activeProjectId) return null;
    return projects.find((p) => p.id === activeProjectId) ?? null;
  }, [activeProjectId]);

  return (
    <>
      <section className="projectsShowcase" id="projects">
        <div className="projectsShowcaseContainer">
          {/* Header */}
          <div className="projectsShowcaseHeader">
            <p className="projectsShowcaseKicker">PORTFOLIO</p>
            <h2 className="projectsShowcaseTitle">Projets sélectionnés</h2>
            <p className="projectsShowcaseSubtitle">
              Découvrez mes réalisations les plus marquantes
            </p>
          </div>

          {/* Liste de projets alternés */}
          <div className="projectsList">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              const projectNumber = String(index + 1).padStart(2, "0");

              return (
                <article
                  key={project.id}
                  className={`projectCard ${
                    isEven ? "projectCard--left" : "projectCard--right"
                  }`}
                >
                  {/* Numéro géant en arrière-plan */}
                  <div className="projectCard__number" aria-hidden="true">
                    {projectNumber}
                  </div>

                  {/* Image avec clip-path arc */}
                  <div className="projectCard__media">
                    <div className="projectCard__mediaInner">
                      {project.coverImage ? (
                        <img
                          src={project.coverImage}
                          alt={`Aperçu du projet ${project.title}`}
                          className="projectCard__img"
                          loading="lazy"
                        />
                      ) : (
                        <div className="projectCard__imgFallback" aria-hidden="true" />
                      )}
                    </div>
                  </div>

                  {/* Contenu texte */}
                  <div className="projectCard__content">
                    <div className="projectCard__contentInner">
                      <p className="projectCard__kicker">
                        {project.subtitle ?? "Projet"}
                      </p>

                      <h3 className="projectCard__title">{project.title}</h3>

                      <p className="projectCard__desc">{project.description}</p>

                      {/* Tags */}
                      <div className="projectCard__tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="projectTag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <button
                        type="button"
                        className="projectCard__cta"
                        onClick={() => setActiveProjectId(project.id)}
                      >
                        Voir le projet
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M3.33337 8H12.6667M12.6667 8L8.00004 3.33333M12.6667 8L8.00004 12.6667"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeProject ? (
        <ProjectModal project={activeProject} onClose={() => setActiveProjectId(null)} />
      ) : null}
    </>
  );
}
