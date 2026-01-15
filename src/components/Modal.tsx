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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setPosition({ x: 0, y: 0 });

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKey);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable) {
      return;
    }

    dragStartRef.current = { x: event.clientX, y: event.clientY };
    originRef.current = { ...position };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable || !isDragging || !modalRef.current) {
      return;
    }

    const deltaX = event.clientX - dragStartRef.current.x;
    const deltaY = event.clientY - dragStartRef.current.y;
    const rect = modalRef.current.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    setPosition({
      x: clamp(originRef.current.x + deltaX, -maxX * 0.5, maxX * 0.5),
      y: clamp(originRef.current.y + deltaY, -maxY * 0.5, maxY * 0.5),
    });
  };

  const handleDragEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable) {
      return;
    }

    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={modalRef}
        style={
          draggable
            ? {
                transform: `translate(${position.x}px, ${position.y}px)`,
              }
            : undefined
        }
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={draggable ? "modal-header draggable" : "modal-header"}
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
        >
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
