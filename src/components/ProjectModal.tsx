import { useEffect } from "react";
import Modal from "./Modal";
import type { Project } from "../data/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    document.body.classList.add("project-modal-open");
    return () => {
      document.body.classList.remove("project-modal-open");
    };
  }, [project]);

  if (!project) return null;

  const description = project.details ?? project.description;

  return (
    <Modal isOpen={true} title={project.title} onClose={onClose} draggable>
      <div className="project-modal">
        {project.subtitle && (
          <p className="project-modal-subtitle">{project.subtitle}</p>
        )}

        <p className="project-modal-description">{description}</p>

        {project.tags?.length > 0 && (
          <div className="project-modal-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.images?.length > 0 && (
          <div className="project-modal-gallery">
            {project.images.map((image) => (
              <img
                key={image}
                src={image}
                alt={project.title}
                loading="lazy"
              />
            ))}
          </div>
        )}

        {project.videoUrl && (
          <div className="project-modal-video">
            <iframe
              title={`Vidéo ${project.title}`}
              src={project.videoUrl}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <div className="project-modal-links">
          {project.repoUrl && (
            <a
              className="link"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              className="link"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Démo
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
}
