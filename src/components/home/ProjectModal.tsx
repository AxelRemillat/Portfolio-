import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "../../data/projects";
import { useSiteAudio } from "../../audio/AudioProvider";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const { isEnabled, toggle } = useSiteAudio();
  const isEnabledRef = useRef(isEnabled);
  const mutedForVideoRef = useRef(false);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => { isEnabledRef.current = isEnabled; }, [isEnabled]);

  // Restore ambient audio on modal unmount if we muted it
  useEffect(() => {
    return () => {
      if (mutedForVideoRef.current && !isEnabledRef.current) {
        mutedForVideoRef.current = false;
        toggle();
      }
    };
  }, [toggle]);

  const onVideoPlay = useCallback(() => {
    if (isEnabledRef.current && !mutedForVideoRef.current) {
      mutedForVideoRef.current = true;
      toggle();
    }
  }, [toggle]);

  const onVideoStop = useCallback(() => {
    if (mutedForVideoRef.current) {
      mutedForVideoRef.current = false;
      if (!isEnabledRef.current) {
        toggle();
      }
    }
  }, [toggle]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxSrc) { setLightboxSrc(null); return; }
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, lightboxSrc]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const openLightbox = useCallback((src: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxSrc(src);
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
          {rich ? (
            <div className="projectModalContent">

              {/* ── VIDÉO HERO (en haut, coupe le son ambiant) ── */}
              {(rich.heroVideoUrl || rich.heroVideoFile) && (
                <div className="pmSection pmSection--heroVideo">
                  {rich.heroVideoUrl ? (
                    <div className="pmSection__iframeWrap">
                      <iframe
                        src={rich.heroVideoUrl}
                        title="Présentation RISE"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="pmSection__videoWrap">
                      <video
                        ref={heroVideoRef}
                        src={rich.heroVideoFile}
                        controls
                        playsInline
                        className="pmSection__video"
                        preload="metadata"
                        onPlay={onVideoPlay}
                        onPause={onVideoStop}
                        onEnded={onVideoStop}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* ── VISION ── */}
              {rich.vision && (
                <div className="pmSection pmSection--vision">
                  <div className="pmSection__header">
                    <span className="pmSection__icon">🔥</span>
                    <h3 className="pmSection__title">Vision</h3>
                  </div>
                  <p className="pmSection__text pmSection__text--vision" style={{ whiteSpace: "pre-line" }}>{rich.vision}</p>
                </div>
              )}

              {/* ── PROBLÈME ── */}
              {rich.problem && (
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
              {rich.solution && (
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
                  {rich.solution.images && rich.solution.images.length > 0 && (
                    <div className="pmSection__screenshots">
                      {rich.solution.images.map((src, i) => (
                        <img
                          key={src}
                          src={src}
                          alt={`Aperçu solution ${i + 1}`}
                          className="pmSection__screenshot pmSection__screenshot--zoomable"
                          loading="lazy"
                          onClick={(e) => openLightbox(src, e)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── TÉMOIGNAGES ── */}
              {rich.testimonials && (
                <div className="pmSection">
                  <div className="pmSection__header">
                    <span className="pmSection__icon">💬</span>
                    <h3 className="pmSection__title">Témoignages étudiants</h3>
                  </div>
                  {rich.testimonials.caption && (
                    <p className="pmSection__text">{rich.testimonials.caption}</p>
                  )}
                  <img
                    src={rich.testimonials.image}
                    alt="Témoignages étudiants RISE"
                    className="pmSection__fullImg pmSection__fullImg--zoomable"
                    loading="lazy"
                    onClick={(e) => openLightbox(rich.testimonials!.image, e)}
                  />
                </div>
              )}

              {/* ── BUSINESS MODEL ── */}
              {rich.businessModel && (
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
              {rich.traction && (
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
                  {rich.tractionImage && (
                    <img
                      src={rich.tractionImage}
                      alt="Trophées et récompenses RISE"
                      className="pmSection__fullImg pmSection__fullImg--mt pmSection__fullImg--zoomable"
                      loading="lazy"
                      onClick={(e) => openLightbox(rich.tractionImage!, e)}
                    />
                  )}
                </div>
              )}

              {/* ── MON RÔLE ── */}
              {rich.myRole && (
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
              {rich.proofs && (
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

              {/* ── STACK & FIREBASE ── */}
              {rich.stack && (
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
                  {rich.stackImage && (
                    <img
                      src={rich.stackImage}
                      alt="Base de données Firebase — gestion comptes utilisateurs"
                      className="pmSection__fullImg pmSection__fullImg--mt pmSection__fullImg--zoomable"
                      loading="lazy"
                      onClick={(e) => openLightbox(rich.stackImage!, e)}
                    />
                  )}
                </div>
              )}

              {/* ── PROCHAINES ÉTAPES + TIMELINE ── */}
              {(rich.nextSteps || (timeline && timeline.length > 0)) && (
                <div className="pmSection">
                  <div className="pmSection__header">
                    <span className="pmSection__icon">🔮</span>
                    <h3 className="pmSection__title">Prochaines étapes</h3>
                  </div>
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
                  {rich.nextSteps && (
                    <ul className="pmSection__list">
                      {rich.nextSteps.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* ── NOTE RECRUTEUR ── */}
              {rich.recruiterNote && (
                <div className="pmSection pmSection--recruiter">
                  <div className="pmSection__header">
                    <span className="pmSection__icon">🎯</span>
                    <h3 className="pmSection__title">Pourquoi ce projet compte pour vous ?</h3>
                  </div>
                  <p className="pmSection__recruiterText">{rich.recruiterNote}</p>
                </div>
              )}

              {/* ── DÉMO (YouTube embed en priorité, sinon fichier local) ── */}
              {(rich.videoEmbedUrl || rich.videoFile) && (
                <div className="pmSection">
                  <div className="pmSection__header">
                    <span className="pmSection__icon">▶</span>
                    <h3 className="pmSection__title">Démo — Présentation du site</h3>
                  </div>
                  {rich.videoEmbedUrl ? (
                    <div className="pmSection__iframeWrap">
                      <iframe
                        src={rich.videoEmbedUrl}
                        title="Démo RISE"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="pmSection__videoWrap">
                      <video
                        src={rich.videoFile}
                        controls
                        playsInline
                        muted
                        loop
                        className="pmSection__video"
                        preload="metadata"
                      />
                    </div>
                  )}
                </div>
              )}

            </div>
          ) : (
            /* ── WIP STATE si pas de rich content ── */
            <div className="pmWip">
              <p className="pmWip__label">En cours de construction</p>
              <div className="pmWip__dots" aria-hidden="true">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxSrc && (
        <button
          className="pmLightbox"
          type="button"
          aria-label="Fermer l'image"
          onClick={() => setLightboxSrc(null)}
        >
          <img src={lightboxSrc} alt="Aperçu agrandi" className="pmLightbox__img" />
          <span className="pmLightbox__close" aria-hidden="true">✕</span>
        </button>
      )}
    </div>
  );
}
