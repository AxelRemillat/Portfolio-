import { useEffect, useMemo, useRef, useState } from "react";
import {
  isDrag,
  isPointInRect,
  POP_DURATION_MS,
  RETURN_DURATION_MS,
} from "./bubblePhysics";

type BubbleInteractionOptions = {
  id: string;
  prefersReducedMotion: boolean;
  onSelect: (id: string) => void;
  onDragHover: (isOver: boolean) => void;
  onDrop: (id: string, didDrop: boolean) => void;
  getDropRect: () => DOMRect | null;
};

type Point = { x: number; y: number };
type Size = { w: number; h: number };

const FOLLOW = 0.22; // 0..1 (plus grand = colle + vite)
const DAMP = 0.78; // 0..1 (plus petit = plus d’oscillation)

export default function useBubbleInteraction({
  id,
  prefersReducedMotion,
  onSelect,
  onDragHover,
  onDrop,
  getDropRect,
}: BubbleInteractionOptions) {
  const elRef = useRef<HTMLButtonElement | null>(null);

  const [dragPos, setDragPos] = useState<Point>({ x: 0, y: 0 });
  const posRef = useRef<Point>({ x: 0, y: 0 });

  const targetRef = useRef<Point>({ x: 0, y: 0 });
  const velRef = useRef<Point>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const sizeRef = useRef<Size>({ w: 0, h: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [isDropping, setIsDropping] = useState(false);

  const pointerIdRef = useRef<number | null>(null);
  const pressedRef = useRef(false);
  const draggedRef = useRef(false);
  const overDropRef = useRef(false);
  const startPointerRef = useRef<Point | null>(null);
  const grabOffsetRef = useRef<Point>({ x: 0, y: 0 });

  const timerRef = useRef<number | null>(null);
  const clearTimer = () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = null;
  };
  useEffect(() => () => clearTimer(), []);

  const setHover = (isOver: boolean) => {
    if (overDropRef.current === isOver) return;
    overDropRef.current = isOver;
    onDragHover(isOver);
  };

  const triggerReturn = () => {
    setIsReturning(true);
    clearTimer();
    timerRef.current = window.setTimeout(
      () => setIsReturning(false),
      prefersReducedMotion ? 0 : RETURN_DURATION_MS,
    );
  };

  const triggerPop = () => {
    if (prefersReducedMotion) return;
    setIsPopping(true);
    clearTimer();
    timerRef.current = window.setTimeout(() => setIsPopping(false), POP_DURATION_MS);
  };

  const triggerDrop = () => {
    if (prefersReducedMotion) return;
    setIsDropping(true);
    clearTimer();
    timerRef.current = window.setTimeout(() => setIsDropping(false), RETURN_DURATION_MS);
  };

  const setPos = (p: Point) => {
    posRef.current = p;
    setDragPos(p);
  };

  const getCenter = (topLeft: Point, s: Size) => ({
    x: topLeft.x + s.w / 2,
    y: topLeft.y + s.h / 2,
  });

  const stopRaf = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const startRaf = () => {
    if (prefersReducedMotion) return;
    if (rafRef.current !== null) return;

    const tick = () => {
      const p = posRef.current;
      const t = targetRef.current;
      const v = velRef.current;

      const dx = t.x - p.x;
      const dy = t.y - p.y;

      v.x = (v.x + dx * FOLLOW) * DAMP;
      v.y = (v.y + dy * FOLLOW) * DAMP;

      const next = { x: p.x + v.x, y: p.y + v.y };
      setPos(next);

      const dropRect = getDropRect();
      const center = getCenter(next, sizeRef.current);
      setHover(Boolean(dropRect && isPointInRect(center, dropRect)));

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const stopListeners = (onMove: any, onUp: any, onCancel: any) => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onCancel);
  };

  const resetFlags = () => {
    pointerIdRef.current = null;
    pressedRef.current = false;
    draggedRef.current = false;
    startPointerRef.current = null;
    setHover(false);
    stopRaf();
  };

  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (!elRef.current) return;

    event.preventDefault();

    pointerIdRef.current = event.pointerId;
    pressedRef.current = true;
    draggedRef.current = false;
    startPointerRef.current = { x: event.clientX, y: event.clientY };

    const rect = elRef.current.getBoundingClientRect();
    sizeRef.current = { w: rect.width, h: rect.height };

    const start = { x: rect.left, y: rect.top };
    setPos(start);
    targetRef.current = start;
    velRef.current = { x: 0, y: 0 };

    grabOffsetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    setIsReturning(false);

    const onWinMove = (e: PointerEvent) => {
      if (!pressedRef.current) return;
      if (pointerIdRef.current !== e.pointerId) return;
      if (!startPointerRef.current) return;

      const p = { x: e.clientX, y: e.clientY };

      if (!draggedRef.current && isDrag(startPointerRef.current, p)) {
        draggedRef.current = true;
        setIsDragging(true);
        startRaf();
      }

      if (!draggedRef.current) return;

      const nextTarget = {
        x: p.x - grabOffsetRef.current.x,
        y: p.y - grabOffsetRef.current.y,
      };

      // si reduced motion => pas d’inertie
      if (prefersReducedMotion) {
        setPos(nextTarget);
        const dropRect = getDropRect();
        const center = getCenter(nextTarget, sizeRef.current);
        setHover(Boolean(dropRect && isPointInRect(center, dropRect)));
        return;
      }

      targetRef.current = nextTarget;
    };

    const finish = (e: PointerEvent, canceled: boolean) => {
      if (!pressedRef.current) return;
      if (pointerIdRef.current !== e.pointerId) return;

      if (!draggedRef.current && !canceled) {
        stopListeners(onWinMove, onWinUp, onWinCancel);
        resetFlags();
        setIsDragging(false);
        onSelect(id);
        triggerPop();
        return;
      }

      if (draggedRef.current) {
        const dropRect = getDropRect();
        const center = getCenter(posRef.current, sizeRef.current);
        const didDrop = Boolean(dropRect && isPointInRect(center, dropRect));

        setIsDragging(false);
        setHover(false);
        onDrop(id, didDrop);

        stopListeners(onWinMove, onWinUp, onWinCancel);
        resetFlags();

        if (didDrop && !canceled) {
          triggerDrop();
          onSelect(id);
          return;
        }

        triggerReturn();
        return;
      }

      stopListeners(onWinMove, onWinUp, onWinCancel);
      resetFlags();
      setIsDragging(false);
      triggerReturn();
    };

    const onWinUp = (e: PointerEvent) => finish(e, false);
    const onWinCancel = (e: PointerEvent) => finish(e, true);

    window.addEventListener("pointermove", onWinMove, { passive: true });
    window.addEventListener("pointerup", onWinUp, { passive: true });
    window.addEventListener("pointercancel", onWinCancel, { passive: true });
  };

  const onClick = () => {
    if (draggedRef.current) return;
    onSelect(id);
    triggerPop();
  };

  const overlayStyle = useMemo(
    () =>
      ({
        left: `${dragPos.x}px`,
        top: `${dragPos.y}px`,
      }) as React.CSSProperties,
    [dragPos.x, dragPos.y],
  );

  return {
    ref: elRef,
    overlayStyle,
    isDragging,
    isReturning,
    isPopping,
    isDropping,
    handlers: { onPointerDown, onClick },
  };
}
