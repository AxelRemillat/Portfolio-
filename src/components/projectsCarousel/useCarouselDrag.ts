import { useRef, useState } from "react";
import type { Project } from "../../data/projects";
import { CLICK_DRAG_TOLERANCE_PX, DRAG_THRESHOLD } from "./constants";
import useSmoothedOffset from "./useSmoothedOffset";

type UseCarouselDragProps = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  projects: Project[];
  onOpen: (project: Project) => void;
  prefersReducedMotion: boolean;
};

type DragHandlers = {
  containerRef: React.RefObject<HTMLDivElement>;
  smoothedOffset: number;
  isDragging: boolean;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: () => void;
};

export default function useCarouselDrag({
  activeIndex,
  setActiveIndex,
  projects,
  onOpen,
  prefersReducedMotion,
}: UseCarouselDragProps): DragHandlers {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const draggedRef = useRef(false);
  const pressedIndexRef = useRef<number | null>(null);
  const rawOffsetRef = useRef(0);
  const smoothedOffset = useSmoothedOffset({
    prefersReducedMotion,
    isDragging,
    targetRef: rawOffsetRef,
  });

  const endDrag = () => {
    if (!isDragging) {
      return;
    }

    setIsDragging(false);

    const currentOffset = rawOffsetRef.current;
    if (Math.abs(currentOffset) > DRAG_THRESHOLD) {
      const direction = currentOffset > 0 ? -1 : 1;
      setActiveIndex(activeIndex + direction);
    }

    rawOffsetRef.current = 0;
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") {
      return;
    }

    const target = event.target as HTMLElement;
    const card = target.closest(".project-carousel-card") as HTMLElement | null;
    const indexAttribute = card?.dataset.index;
    pressedIndexRef.current =
      indexAttribute !== undefined ? Number(indexAttribute) : null;

    draggedRef.current = false;
    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    setIsDragging(true);
    rawOffsetRef.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerIdRef.current !== event.pointerId) {
      return;
    }

    const delta = event.clientX - startXRef.current;
    const deltaY = event.clientY - startYRef.current;
    if (Math.hypot(delta, deltaY) > CLICK_DRAG_TOLERANCE_PX) {
      draggedRef.current = true;
    }
    rawOffsetRef.current = delta;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) {
      return;
    }
    event.currentTarget.releasePointerCapture(event.pointerId);
    pointerIdRef.current = null;
    endDrag();

    if (!draggedRef.current && pressedIndexRef.current !== null) {
      const project = projects[pressedIndexRef.current];
      if (project) {
        setActiveIndex(pressedIndexRef.current);
        onOpen(project);
      }
    }
    pressedIndexRef.current = null;
  };

  const onPointerCancel = () => {
    pointerIdRef.current = null;
    endDrag();
  };

  return {
    containerRef,
    smoothedOffset,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
  };
}
