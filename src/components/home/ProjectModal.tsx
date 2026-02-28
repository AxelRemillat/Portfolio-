import { useEffect } from "react";
import type { Project } from "../../data/projects";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const { rich, stats, timeline } = project;

  return (
    <div className="projectModalOverlay" role="dialog" aria-modal="true">
      <button
        className="projectModalBackdrop"
        type="button"
        aria-label="Fermer"
        onClick={onClose}
      />

      <div className="projectModalPanel">
        {/* ── HEADER compact ── */}
        <div className="projectModalHeader">
          <div className="projectModalHeaderContent">
            <p className="projectModalKicker">{project.kicker ?? project.subtitle ?? "Projet"}</p>
            <h2 className="projectModalTitle">{project.title}</h2>
          </div>
          <button className="projectModalClose" type="button" onClick={onClose} aria-label="Fermer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* ── STATS BAR ── */}
        {stats && stats.length > 0 && (
          <div className="projectModalStats">
            {stats.map((s) => (
              <div key={s.label} className="projectModalStat">
                <span className="projectModalStatValue">{s.value}</span>
                <span className="projectModalStatLabel">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="projectModalBody">
          {/* ── TIMELINE ── */}
          {timeline && timeline.length > 0 && (
            <div className="projectModalTimeline">
              {timeline.map((step, i) => (
                <div key={step.label} className={`pmTimeline__step pmTimeline__step--${step.status}`}>
                  <div className="pmTimeline__dot" />
                  {i < timeline.length - 1 && <div className="pmTimeline__line" />}
                  <span className="pmTimeline__label">{step.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="projectModalContent">
            {/* ── VISION ── */}
            {rich?.vision && (
              <div className="pmSection">
                <div className="pmSection__header">
                  <span className="pmSection__icon">🔥</span>
                  <h3 className="pmSection__title">Vision</h3>
                </div>
                <p className="pmSection__text" style={{ whiteSpace: "pre-line" }}>{rich.vision}</p>
              </div>
            )}

            {/* ── PROBLÈME ── */}
            {rich?.problem && (
              <div className="pmSection">
                <div className="pmSection__header">
                  <span className="pmSection__icon">🎯</span>
                  <h3 className="pmSection__title">Problème</h3>
                </div>
                <ul className="pmSection__list">
                  {rich.problem.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── SOLUTION ── */}
            {rich?.solution && (
              <div className="pmSection">
                <div className="pmSection__header">
                  <span className="pmSection__icon">💡</span>
                  <h3 className="pmSection__title">Solution</h3>
                </div>
                <p className="pmSection__text">{rich.solution.intro}</p>
                <ul className="pmSection__list pmSection__list--2col">
                  {rich.solution.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {rich.solution.objectives && (
                  <div className="pmSection__objectives">
                    {rich.solution.objectives.map((obj) => (
                      <span key={obj} className="pmSection__objective">✔ {obj}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── BUSINESS MODEL ── */}
            {rich?.businessModel && (
              <div className="pmSection">
                <div className="pmSection__header">
                  <span className="pmSection__icon">💰</span>
                  <h3 className="pmSection__title">Business Model</h3>
                </div>
                <p className="pmSection__text">{rich.businessModel.description}</p>
                <div className="pmSection__pills">
                  {rich.businessModel.items.map((item) => (
                    <span key={item} className="pmSection__pill">→ {item}</span>
                  ))}
                </div>
                {rich.businessModel.beneficiaries && (
                  <ul className="pmSection__list pmSection__list--inline">
                    {rich.businessModel.beneficiaries.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* ── TRACTION ── */}
            {rich?.traction && (
              <div className="pmSection pmSection--highlight">
                <div className="pmSection__header">
                  <span className="pmSection__icon">🏆</span>
                  <h3 className="pmSection__title">Traction & Reconnaissance</h3>
                </div>
                <ul className="pmSection__list pmSection__list--2col">
                  {rich.traction.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── MON RÔLE ── */}
            {rich?.myRole && (
              <div className="pmSection">
                <div className="pmSection__header">
                  <span className="pmSection__icon">👤</span>
                  <h3 className="pmSection__title">Mon rôle — {rich.myRole.title}</h3>
                </div>
                <ul className="pmSection__list pmSection__list--2col">
                  {rich.myRole.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── CE QUE ÇA PROUVE ── */}
            {rich?.proofs && (
              <div className="pmSection pmSection--proof">
                <div className="pmSection__header">
                  <span className="pmSection__icon">🧠</span>
                  <h3 className="pmSection__title">Ce que ça prouve</h3>
                </div>
                <ul className="pmSection__list pmSection__list--2col">
                  {rich.proofs.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="pmSection__callout">
                  Ce n'est pas un projet scolaire.<br />C'est une startup en cours de structuration.
                </p>
              </div>
            )}

            {/* ── STACK ── */}
            {rich?.stack && (
              <div className="pmSection">
                <div className="pmSection__header">
                  <span className="pmSection__icon">🛠</span>
                  <h3 className="pmSection__title">Stack & Tech</h3>
                </div>
                <div className="pmSection__stack">
                  {rich.stack.map((s) => (
                    <div key={s.category} className="pmSection__stackItem">
                      <span className="pmSection__stackCat">{s.category}</span>
                      <span className="pmSection__stackVal">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── PROCHAINES ÉTAPES ── */}
            {rich?.nextSteps && (
              <div className="pmSection">
                <div className="pmSection__header">
                  <span className="pmSection__icon">🔮</span>
                  <h3 className="pmSection__title">Prochaines étapes</h3>
                </div>
                <ul className="pmSection__list">
                  {rich.nextSteps.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── NOTE RECRUTEUR ── */}
            {rich?.recruiterNote && (
              <div className="pmSection pmSection--recruiter">
                <div className="pmSection__header">
                  <span className="pmSection__icon">🎯</span>
                  <h3 className="pmSection__title">Pourquoi ce projet compte pour vous ?</h3>
                </div>
                <p className="pmSection__recruiterText">{rich.recruiterNote}</p>
              </div>
            )}

            {/* ── GALERIE ── */}
            {project.images && project.images.length > 0 && (
              <div className="pmSection">
                <div className="pmSection__header">
                  <span className="pmSection__icon">🖼</span>
                  <h3 className="pmSection__title">Galerie</h3>
                </div>
                <div className="projectModalGallery">
                  {project.images.map((img, i) => (
                    <img
                      key={`${img}-${i}`}
                      src={img}
                      alt={`${project.title} ${i + 1}`}
                      className="projectModalGalleryImg"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── VIDÉO ── */}
            {project.videoUrl && (
              <div className="pmSection">
                <div className="pmSection__header">
                  <span className="pmSection__icon">▶</span>
                  <h3 className="pmSection__title">Vidéo démo</h3>
                </div>
                <div className="projectModalVideo">
                  <iframe
                    src={project.videoUrl}
                    title={`Vidéo ${project.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Fallback si pas de rich content */}
            {!rich && (
              <div className="pmSection">
                <div className="pmSection__header">
                  <span className="pmSection__icon">📋</span>
                  <h3 className="pmSection__title">À propos</h3>
                </div>
                <p className="pmSection__text">{project.details ?? project.description}</p>
                <div className="pmSection__pills">
                  {project.tags.map((t) => (
                    <span key={t} className="pmSection__pill">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
