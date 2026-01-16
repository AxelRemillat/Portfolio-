import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "../data/projects";
import ProjectModal from "./ProjectModal";

type ProjectsCarousel3DProps = {
  projects: Project[];
};

const DRAG_THRESHOLD = 120;
// Seuil pour distinguer un clic d’un drag (évite ouverture modal pendant un swipe)
const CLICK_DRAG_TOLERANCE_PX = 10;

export default function ProjectsCarousel3D({ projects }: ProjectsCarousel3DProps) {
  const initialIndex = (count: number) => {
    if (count >= 3) return Math.floor(count / 2);
    if (count === 2) return 1;
    return 0;
  };

  const [activeIndex, setActiveIndex] = useState(() => initialIndex(projects.length));
  const [isDragging, setIsDragging] = useState(false);
  const [cardWidth, setCardWidth] = useState(380);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Drag refs
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const draggedRef = useRef(false);
  const pressedIndexRef = useRef<number | null>(null);

  // Smooth “tapis roulant”
  const rawOffsetRef = useRef(0);
  const smoothedOffsetRef = useRef(0);
  const [smoothedOffset, setSmoothedOffset] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Si la liste de projets change, on recentre sur le milieu
  useEffect(() => {
    setActiveIndex(initialIndex(projects.length));
  }, [projects.length]);

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

  // Animation smoothing (conveyor)
  useEffect(() => {
    const animate = () => {
      const target = rawOffsetRef.current;

      setSmoothedOffset((prev) => {
        if (prefersReducedMotion) {
          smoothedOffsetRef.current = target;
          return target;
        }

        const next = prev + (target - prev) * 0.18;
        const settled = Math.abs(next) < 0.2 && !isDragging ? 0 : next;
        smoothedOffsetRef.current = settled;
        return settled;
      });

      if (
        isDragging ||
        Math.abs(rawOffsetRef.current) > 0.2 ||
        Math.abs(smoothedOffsetRef.current) > 0.2
      ) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
      }
    };

    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isDragging, prefersReducedMotion]);

  const maxIndex = projects.length - 1;

  const goTo = (index: number) => {
    const nextIndex = Math.max(0, Math.min(maxIndex, index));
    setActiveIndex(nextIndex);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;

    // Déterminer quelle carte est pressée (pour pouvoir ouvrir au pointerup)
    const target = event.target as HTMLElement;
    const card = target.closest(".project-carousel-card") as HTMLElement | null;
    const indexAttribute = card?.dataset.index;
    pressedIndexRef.current = indexAttribute !== undefined ? Number(indexAttribute) : null;

    draggedRef.current = false;
    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;

    setIsDragging(true);
    rawOffsetRef.current = 0;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerIdRef.current !== event.pointerId) return;

    const deltaX = event.clientX - startXRef.current;
    const deltaY = event.clientY - startYRef.current;

    if (Math.hypot(deltaX, deltaY) > CLICK_DRAG_TOLERANCE_PX) {
      draggedRef.current = true;
    }

    rawOffsetRef.current = deltaX;
  };

  const endDrag = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const currentOffset = rawOffsetRef.current;
    if (Math.abs(currentOffset) > DRAG_THRESHOLD) {
      const direction = currentOffset > 0 ? -1 : 1;
      goTo(activeIndex + direction);
    }

    // Laisse le smoothing ramener doucement vers 0
    rawOffsetRef.current = 0;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    event.currentTarget.releasePointerCapture(event.pointerId);
    pointerIdRef.current = null;

    endDrag();

    // Si ce n'était PAS un drag => c'est un clic => on ouvre la modal
    if (!draggedRef.current && pressedIndexRef.current !== null) {
      const index = pressedIndexRef.current;
      const project = projects[index];
      if (project) {
        setActiveIndex(index);
        setActiveProject(project);
      }
    }

    pressedIndexRef.current = null;
  };

  const handlePointerCancel = () => {
    pointerIdRef.current = null;
    pressedIndexRef.current = null;
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

      // Gap réel entre cartes => réduit le chevauchement
      const gap = Math.max(18, cardWidth * 0.06);

      if (abs === 1) {
        scale = 0.96;
        opacity = 0.88;
        blur = 0.5;
        translateZ = -40;
        rotateY = direction * 12;
        translateX = direction * (cardWidth + gap);
      } else if (abs === 2) {
        scale = 0.9;
        opacity = 0.62;
        blur = 1.4;
        translateZ = -90;
        rotateY = direction * 22;
        translateX = direction * (cardWidth + gap) * 2;
      } else if (abs > 2) {
        scale = 0.8;
        opacity = 0.2;
        blur = 4;
        translateZ = -120;
        rotateY = direction * 28;
        translateX = direction * (cardWidth + gap) * abs;
      }

      const transition = prefersReducedMotion || isDragging ? "none" : undefined;

      return {
        transform: `translateX(${translateX + smoothedOffset}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        filter: prefersReducedMotion ? "none" : `blur(${blur}px)`,
        zIndex: 10 - abs,
        transition,
      } as React.CSSProperties;
    };
  }, [cardWidth, isDragging, prefersReducedMotion, smoothedOffset]);

  return (
    <section className="section projects-carousel-section">
      <div className="projects-carousel-header">
        <div>
          <h2>Projets</h2>
          <p className="muted">Un aperçu premium et interactif des projets les plus pertinents.</p>
        </div>
        {/* Flèches supprimées volontairement */}
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
                className={index === activeIndex ? "project-carousel-card active" : "project-carousel-card"}
                data-index={index}
                data-offset={offset}
                style={getCardStyle(offset)}
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
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
