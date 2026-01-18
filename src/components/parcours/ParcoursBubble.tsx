import { createPortal } from "react-dom";
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

function stableHash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function BubbleVisual({ cap }: { cap: ParcoursCap }) {
  return (
    <>
      <span className="parcours-bubble-core">
        <span className="parcours-bubble-gloss" aria-hidden="true" />
        <span className="parcours-bubble-label">{cap.label}</span>
      </span>

      <span className="parcours-bubble-particles" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className={`particle particle-${index + 1}`} />
        ))}
      </span>
    </>
  );
}

export default function ParcoursBubble({
  cap,
  isSelected,
  onSelect,
  onDragHover,
  onDrop,
  getDropRect,
}: ParcoursBubbleProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const { ref, overlayStyle, isDragging, isReturning, isPopping, isDropping, handlers } =
    useBubbleInteraction({
      id: cap.id,
      prefersReducedMotion,
      onSelect,
      onDragHover,
      onDrop,
      getDropRect,
    });

  // Offsets "organiques" stables (uniquement pour le layout idle)
  const seed = stableHash(cap.id);
  const sign = seed % 2 === 0 ? -1 : 1;

  const baseX = sign * (12 + (seed % 4) * 10);
  const baseY = ((seed % 11) - 5) * 3;

  const sizeJitter = clamp(0.94 + (seed % 13) / 100, 0.94, 1.06);

  const vars = {
    "--bubble-color": cap.color,
    "--float-delay": cap.floatDelay,
    "--float-duration": cap.floatDuration,
    "--bubble-scale": sizeJitter,
    "--x-offset": `${baseX}px`,
    "--y-offset": `${baseY}px`,
  } as React.CSSProperties;

  const baseClass = [
    "parcours-bubble",
    isSelected ? "active" : "",
    cap.isCurrent ? "current" : "",
    isReturning ? "returning" : "",
    isPopping ? "popping" : "",
    isDropping ? "dropping" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Bulle normale (dans la colonne) -> devient "placeholder" pendant drag */}
      <button
        ref={ref}
        type="button"
        className={`${baseClass} ${isDragging ? "placeholder" : ""}`}
        style={vars}
        aria-pressed={isSelected}
        onPointerDown={handlers.onPointerDown}
        onClick={handlers.onClick}
        role="listitem"
      >
        <BubbleVisual cap={cap} />
      </button>

      {/* DragLayer (portal) -> une seule bulle visible pendant drag */}
      {isDragging &&
        createPortal(
          <div
            className="parcours-bubble-overlay"
            style={{
              ...overlayStyle,
              ...vars,
            }}
            aria-hidden="true"
          >
            <div className="parcours-bubble-overlay-inner">
              <BubbleVisual cap={cap} />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
