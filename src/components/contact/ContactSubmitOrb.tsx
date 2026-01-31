import { useEffect, useMemo, useRef } from "react";

type ContactSubmitOrbProps = {
  status: "idle" | "sending" | "sent";
  disabled?: boolean;
};

const labels: Record<ContactSubmitOrbProps["status"], string> = {
  idle: "Send it!",
  sending: "Sending...",
  sent: "Sent!",
};

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

export default function ContactSubmitOrb({
  status,
  disabled = false,
}: ContactSubmitOrbProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const applyTransform = (x: number, y: number, scale: number) => {
    const el = btnRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  };

  const reset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => applyTransform(0, 0, 1));
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || status === "sending" || reduceMotion) return;

    const el = btnRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    // intensité (à ajuster si tu veux +/− “aimant”)
    const maxMove = 14; // px
    const tx = clamp(dx * 0.12, -maxMove, maxMove);
    const ty = clamp(dy * 0.12, -maxMove, maxMove);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => applyTransform(tx, ty, 1.03));
  };

  const onPointerEnter = () => {
    if (disabled || status === "sending" || reduceMotion) return;
    const el = btnRef.current;
    if (!el) return;
    el.style.transition = "transform 120ms ease-out";
  };

  const onPointerLeave = () => {
    if (disabled || status === "sending" || reduceMotion) return;
    const el = btnRef.current;
    if (!el) return;
    el.style.transition = "transform 220ms ease-out";
    reset();
  };

  const onPointerDown = () => {
    if (disabled || status === "sending" || reduceMotion) return;
    // petit “press”
    const el = btnRef.current;
    if (!el) return;
    el.style.transition = "transform 80ms ease-out";
    el.style.transform += " scale(0.98)";
  };

  const onPointerUp = () => {
    if (disabled || status === "sending" || reduceMotion) return;
    const el = btnRef.current;
    if (!el) return;
    el.style.transition = "transform 120ms ease-out";
  };

  useEffect(() => {
    // quand on passe à "sent", on recentre proprement
    if (status === "sent") reset();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <button
      ref={btnRef}
      className={`contact-orb ${status === "sent" ? "is-sent" : ""}`}
      type="submit"
      form="contact-form"
      disabled={disabled}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <span>{labels[status]}</span>
    </button>
  );
}
