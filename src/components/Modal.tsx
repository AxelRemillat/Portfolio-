import { useEffect, useRef, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  draggable?: boolean;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  title,
  onClose,
  draggable = false,
  children,
}: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const originRef = useRef({ x: 0, y: 0 });
  const dragCandidateRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    setPosition({ x: 0, y: 0 });

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable) return;

    // Sur mobile/touch, on évite le drag pour ne pas casser le scroll/UX
    if (event.pointerType === "touch") return;

    // Si on clique sur un élément interactif, on ne démarre pas le drag
    const target = event.target as HTMLElement;
    if (target.closest("button, a, input, textarea, select, label")) return;

    dragStartRef.current = { x: event.clientX, y: event.clientY };
    originRef.current = { ...position };
    dragCandidateRef.current = true;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable || !dragCandidateRef.current || !modalRef.current) return;

    const deltaX = event.clientX - dragStartRef.current.x;
    const deltaY = event.clientY - dragStartRef.current.y;

    // Tant qu'on n'a pas dépassé un petit seuil, on ne "bascule" pas en drag
    if (!isDragging && Math.hypot(deltaX, deltaY) < 8) return;

    if (!isDragging) setIsDragging(true);

    const rect = modalRef.current.getBoundingClientRect();
    const maxX = Math.max(0, window.innerWidth - rect.width);
    const maxY = Math.max(0, window.innerHeight - rect.height);

    setPosition({
      x: clamp(originRef.current.x + deltaX, -maxX * 0.5, maxX * 0.5),
      y: clamp(originRef.current.y + deltaY, -maxY * 0.5, maxY * 0.5),
    });
  };

  const handleDragEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable) return;

    if (dragCandidateRef.current) {
      dragCandidateRef.current = false;
      setIsDragging(false);
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className={
          draggable
            ? isDragging
              ? "modal draggable is-dragging"
              : "modal draggable"
            : "modal"
        }
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={modalRef}
        style={
          draggable ? { transform: `translate(${position.x}px, ${position.y}px)` } : undefined
        }
        onClick={(event) => event.stopPropagation()}
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
      >
        <div className={draggable ? "modal-header draggable" : "modal-header"}>
          <h2>{title}</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            ref={closeButtonRef}
          >
            Fermer
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
