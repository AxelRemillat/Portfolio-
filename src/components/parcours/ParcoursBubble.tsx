import type { ParcoursCap } from "../../data/parcoursCaps";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import useBubbleInteraction from "./useBubbleInteraction";

type ParcoursBubbleProps = {
  cap: ParcoursCap;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDragHover: (isOver: boolean) => void;
  onDrop: (id: string, didDrop: boolean) => void;
  getDropRect: () => DOMRect | null;
};

export default function ParcoursBubble({
  cap,
  isSelected,
  onSelect,
  onDragHover,
  onDrop,
  getDropRect,
}: ParcoursBubbleProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { offset, isDragging, isReturning, isPopping, isDropping, handlers } =
    useBubbleInteraction({
      id: cap.id,
      prefersReducedMotion,
      onSelect,
      onDragHover,
      onDrop,
      getDropRect,
    });

  return (
    <button
      type="button"
      className={[
        "parcours-bubble",
        isSelected ? "active" : "",
        cap.isCurrent ? "current" : "",
        isDragging ? "dragging" : "",
        isReturning ? "returning" : "",
        isPopping ? "popping" : "",
        isDropping ? "dropping" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--bubble-color": cap.color,
          "--float-delay": cap.floatDelay,
          "--float-duration": cap.floatDuration,
          "--drag-x": `${offset.x}px`,
          "--drag-y": `${offset.y}px`,
        } as React.CSSProperties
      }
      aria-pressed={isSelected}
      onPointerDown={handlers.onPointerDown}
      onPointerMove={handlers.onPointerMove}
      onPointerUp={handlers.onPointerUp}
      onPointerCancel={handlers.onPointerCancel}
      onClick={handlers.onClick}
      role="listitem"
    >
      <span className="parcours-bubble-core">
        <span className="parcours-bubble-gloss" aria-hidden="true" />
        <span className="parcours-bubble-label">{cap.label}</span>
      </span>
      <span className="parcours-bubble-particles" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className={`particle particle-${index + 1}`} />
        ))}
      </span>
    </button>
  );
}
