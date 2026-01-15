import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "../data/projects";
import ProjectModal from "./ProjectModal";

type ProjectsCarousel3DProps = {
  projects: Project[];
};

const DRAG_THRESHOLD = 120;

export default function ProjectsCarousel3D({ projects }: ProjectsCarousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cardWidth, setCardWidth] = useState(380);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const startXRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const draggedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const measure = () => {
      const card = containerRef.current?.querySelector<HTMLButtonElement>(
        ".project-carousel-card",
      );
      if (card) {
        setCardWidth(card.getBoundingClientRect().width);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const maxIndex = projects.length - 1;

  const goTo = (index: number) => {
    const nextIndex = Math.max(0, Math.min(maxIndex, index));
    setActiveIndex(nextIndex);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") {
      return;
    }

    draggedRef.current = false;
    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    setIsDragging(true);
    setDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerIdRef.current !== event.pointerId) {
      return;
    }

    const delta = event.clientX - startXRef.current;
    if (Math.abs(delta) > 6) {
      draggedRef.current = true;
    }
    setDragOffset(delta);
  };

  const endDrag = () => {
    if (!isDragging) {
      return;
    }

    setIsDragging(false);

    if (Math.abs(dragOffset) > DRAG_THRESHOLD) {
      const direction = dragOffset > 0 ? -1 : 1;
      goTo(activeIndex + direction);
    }

    setDragOffset(0);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) {
      return;
    }
    event.currentTarget.releasePointerCapture(event.pointerId);
    pointerIdRef.current = null;
    endDrag();
  };

  const handlePointerCancel = () => {
    pointerIdRef.current = null;
    endDrag();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      setActiveProject(projects[activeIndex] ?? null);
    }
  };

  const getCardStyle = useMemo(() => {
    return (offset: number) => {
      const abs = Math.abs(offset);
      const direction = Math.sign(offset);
      let scale = 1.02;
      let opacity = 1;
      let blur = 0;
      let translateZ = 0;
      let rotateY = 0;
      let translateX = 0;

      if (abs === 1) {
        scale = 0.94;
        opacity = 0.82;
        blur = 0.8;
        translateZ = -40;
        rotateY = direction * 12;
        translateX = direction * cardWidth * 0.7;
      } else if (abs === 2) {
        scale = 0.86;
        opacity = 0.55;
        blur = 2.2;
        translateZ = -90;
        rotateY = direction * 22;
        translateX = direction * cardWidth * 1.15;
      } else if (abs > 2) {
        scale = 0.8;
        opacity = 0.2;
        blur = 4;
        translateZ = -120;
        rotateY = direction * 28;
        translateX = direction * cardWidth * 1.45;
      }

      const transition = prefersReducedMotion || isDragging ? "none" : undefined;

      return {
        transform: `translateX(${translateX + dragOffset}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        filter: prefersReducedMotion ? "none" : `blur(${blur}px)`,
        zIndex: 10 - abs,
        transition,
      } as React.CSSProperties;
    };
  }, [cardWidth, dragOffset, isDragging, prefersReducedMotion]);

  return (
    <section className="section projects-carousel-section">
      <div className="projects-carousel-header">
        <div>
          <h2>Projets</h2>
          <p className="muted">
            Un aperçu premium et interactif des projets les plus pertinents.
          </p>
        </div>
        <div className="projects-carousel-actions">
          <button
            type="button"
            className="carousel-arrow"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Projet précédent"
            disabled={activeIndex === 0}
          >
            ←
          </button>
          <button
            type="button"
            className="carousel-arrow"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Projet suivant"
            disabled={activeIndex === maxIndex}
          >
            →
          </button>
        </div>
      </div>

      <div
        className="projects-carousel-shell"
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Carousel projets"
      >
        <div className="projects-carousel-backplate" aria-hidden="true" />
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
                style={getCardStyle(offset)}
                onClick={() => {
                  if (!draggedRef.current) {
                    setActiveProject(project);
                  }
                }}
              >
                <div className="project-carousel-media">
                  {project.coverImage ? (
                    <img src={project.coverImage} alt={project.title} loading="lazy" />
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
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
