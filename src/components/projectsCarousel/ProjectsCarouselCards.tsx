import type { Project } from "../../data/projects";
import type { CSSProperties } from "react";

type ProjectsCarouselCardsProps = {
  projects: Project[];
  activeIndex: number;
  getStyle: (offset: number) => CSSProperties;
};

export default function ProjectsCarouselCards({
  projects,
  activeIndex,
  getStyle,
}: ProjectsCarouselCardsProps) {
  return (
    <div className="projects-carousel-stage">
      {projects.map((project, index) => {
        const offset = index - activeIndex;
        return (
          <button
            key={project.id}
            type="button"
            className={
              index === activeIndex
                ? "project-carousel-card active"
                : "project-carousel-card"
            }
            data-index={index}
            data-offset={offset}
            data-active={index === activeIndex ? "true" : "false"}
            aria-current={index === activeIndex}
            style={getStyle(offset)}
          >
            <div className="project-carousel-media">
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  draggable={false}
                />
              ) : (
                <div className="project-carousel-placeholder" />
              )}
            </div>
            <div className="project-carousel-content">
              <h3>{project.title}</h3>
              {project.subtitle && (
                <p className="project-carousel-subtitle">{project.subtitle}</p>
              )}
              <p className="project-carousel-description">{project.description}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
