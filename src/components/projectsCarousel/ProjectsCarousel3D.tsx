import { useEffect, useMemo, useState } from "react";
import type { Project } from "../../data/projects";
import ProjectModal from "../ProjectModal";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import getCardStyle from "./getCardStyle";
import useCarouselDrag from "./useCarouselDrag";
import ProjectsCarouselHeader from "./ProjectsCarouselHeader";
import ProjectsCarouselCards from "./ProjectsCarouselCards";

type ProjectsCarousel3DProps = {
  projects: Project[];
};

const initialIndex = (count: number) => {
  if (count >= 3) {
    return Math.floor(count / 2);
  }
  if (count === 2) {
    return 1;
  }
  return 0;
};

export default function ProjectsCarousel3D({ projects }: ProjectsCarousel3DProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(() => initialIndex(projects.length));
  const [cardWidth, setCardWidth] = useState(380);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    setActiveIndex(initialIndex(projects.length));
  }, [projects.length]);

  const {
    containerRef,
    smoothedOffset,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
  } = useCarouselDrag({
    activeIndex,
    setActiveIndex,
    projects,
    onOpen: setActiveProject,
    prefersReducedMotion,
  });

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
  }, [containerRef]);

  const getStyle = useMemo(() => {
    return (offset: number) =>
      getCardStyle({
        offset,
        cardWidth,
        smoothedOffset,
        isDragging,
        prefersReducedMotion,
      });
  }, [cardWidth, isDragging, prefersReducedMotion, smoothedOffset]);

  const maxIndex = projects.length - 1;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveIndex(Math.max(0, activeIndex - 1));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveIndex(Math.min(maxIndex, activeIndex + 1));
    }
    if (event.key === "Enter") {
      event.preventDefault();
      setActiveProject(projects[activeIndex] ?? null);
    }
  };

  return (
    <section id="projects" className="section projects-carousel-section">
      <ProjectsCarouselHeader />

      <div
        className="projects-carousel-shell"
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Carousel projets"
      >
        <div className="projects-carousel-backplate" aria-hidden="true" />
        <ProjectsCarouselCards
          projects={projects}
          activeIndex={activeIndex}
          getStyle={getStyle}
        />
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
