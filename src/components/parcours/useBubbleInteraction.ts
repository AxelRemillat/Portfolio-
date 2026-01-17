import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { isDrag, isPointInRect, POP_DURATION_MS, RETURN_DURATION_MS } from "./bubblePhysics";

type BubbleInteractionOptions = {
  id: string;
  prefersReducedMotion: boolean;
  onSelect: (id: string) => void;
  onDragHover: (isOver: boolean) => void;
  onDrop: (id: string, didDrop: boolean) => void;
  getDropRect: () => DOMRect | null;
};

type Offset = { x: number; y: number };

export default function useBubbleInteraction({
  id,
  prefersReducedMotion,
  onSelect,
  onDragHover,
  onDrop,
  getDropRect,
}: BubbleInteractionOptions) {
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const pointerIdRef = useRef<number | null>(null);
  const startRef = useRef<Offset | null>(null);
  const suppressClickRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  };

  useEffect(() => () => clearTimer(), []);

  const resetSuppress = () => {
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  };

  const startReturn = () => {
    setIsReturning(true);
    clearTimer();
    timeoutRef.current = window.setTimeout(() => setIsReturning(false), RETURN_DURATION_MS);
  };

  const triggerPop = () => {
    if (prefersReducedMotion) return;
    setIsPopping(true);
    clearTimer();
    timeoutRef.current = window.setTimeout(() => setIsPopping(false), POP_DURATION_MS);
  };

  const triggerDrop = () => {
    if (prefersReducedMotion) return;
    setIsDropping(true);
    clearTimer();
    timeoutRef.current = window.setTimeout(() => setIsDropping(false), RETURN_DURATION_MS);
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    suppressClickRef.current = true;
    pointerIdRef.current = event.pointerId;
    startRef.current = { x: event.clientX, y: event.clientY };
    setIsDragging(false);
    setIsReturning(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (pointerIdRef.current !== event.pointerId || !startRef.current) return;
    const current = { x: event.clientX, y: event.clientY };
    const delta = { x: current.x - startRef.current.x, y: current.y - startRef.current.y };
    if (!isDragging && isDrag(startRef.current, current)) {
      setIsDragging(true);
    }
    if (!isDragging) return;
    setOffset(delta);
    const rect = getDropRect();
    onDragHover(Boolean(rect && isPointInRect(current, rect)));
  };

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (pointerIdRef.current !== event.pointerId || !startRef.current) return;
    const point = { x: event.clientX, y: event.clientY };
    const rect = getDropRect();
    const didDrop = Boolean(rect && isPointInRect(point, rect));
    event.currentTarget.releasePointerCapture(event.pointerId);
    pointerIdRef.current = null;
    startRef.current = null;
    onDragHover(false);
    resetSuppress();

    if (isDragging) {
      setOffset({ x: 0, y: 0 });
      startReturn();
      if (didDrop) triggerDrop();
      onDrop(id, didDrop);
      setIsDragging(false);
      return;
    }

    onSelect(id);
    triggerPop();
  };

  const handlePointerCancel = (event: PointerEvent<HTMLButtonElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;
    pointerIdRef.current = null;
    startRef.current = null;
    setOffset({ x: 0, y: 0 });
    startReturn();
    setIsDragging(false);
    onDragHover(false);
    resetSuppress();
  };

  const handleClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    onSelect(id);
    triggerPop();
  };

  return {
    offset,
    isDragging,
    isReturning,
    isPopping,
    isDropping,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
      onClick: handleClick,
    },
  };
}
