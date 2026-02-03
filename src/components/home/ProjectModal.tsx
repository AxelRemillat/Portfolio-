import { useEffect, useMemo } from "react";
import type { Project } from "../../data/projects";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // fermeture ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // lock scroll body
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const title = project.title;
  const kicker = project.subtitle ?? "Projet";
  const heroImg = project.coverImage ?? (project.images?.[0] ?? "");
  const gallery = useMemo(() => project.images ?? [], [project.images]);

  return (
    <div className="projectModalOverlay" role="dialog" aria-modal="true">
      <button
        className="projectModalBackdrop"
        type="button"
        aria-label="Fermer"
        onClick={onClose}
      />

      <div className="projectModalPanel">
        <div className="projectModalHeader">
          <div className="projectModalHeaderContent">
            <p className="projectModalKicker">{kicker}</p>
            <h2 className="projectModalTitle">{title}</h2>
            {project.description ? (
              <p className="projectModalSubtitle">{project.description}</p>
            ) : null}
          </div>

          <button className="projectModalClose" type="button" onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="projectModalBody">
          <div className="projectModalHero">
            {heroImg ? (
              <img src={heroImg} alt={title} className="projectModalHeroImg" />
            ) : null}

            <div className="projectModalHeroText">
              <h3>À propos</h3>
              <p className="projectModalHint">
                {project.details ?? project.description}
              </p>

              {project.tags?.length ? (
                <div className="projectModalLinks" aria-label="Technologies">
                  {project.tags.map((t) => (
                    <span key={t} className="projectModalLink">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              {(project.liveUrl || project.repoUrl) && (
                <div className="projectModalLinks">
                  {project.liveUrl ? (
                    <a
                      className="projectModalLink"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Voir le site ↗
                    </a>
                  ) : null}

                  {project.repoUrl ? (
                    <a
                      className="projectModalLink"
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Code ↗
                    </a>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          <div className="projectModalContent">
            {gallery.length > 0 ? (
              <div className="projectModalSection">
                <h3 className="projectModalSectionTitle">Galerie</h3>
                <div className="projectModalGallery">
                  {gallery.map((img, i) => (
                    <img
                      key={`${img}-${i}`}
                      src={img}
                      alt={`${title} ${i + 1}`}
                      className="projectModalGalleryImg"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {project.videoUrl ? (
              <div className="projectModalSection">
                <h3 className="projectModalSectionTitle">Vidéo</h3>
                <div className="projectModalVideo">
                  <iframe
                    src={project.videoUrl}
                    title={`Vidéo ${title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
