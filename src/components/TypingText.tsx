import { useEffect, useMemo, useState } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

type TypingTextProps = {
  text: string;
  speedMs?: number;
  startDelayMs?: number;
  as?: "h1" | "p" | "span";
  className?: string;

  /**
   * Curseur discret (désactivé en reduced-motion).
   * Par défaut false pour ne pas changer ton design sans le vouloir.
   */
  showCaret?: boolean;
};

export default function TypingText({
  text,
  speedMs = 24,
  startDelayMs = 0,
  as = "span",
  className,
  showCaret = false,
}: TypingTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const initial = useMemo(() => (prefersReducedMotion ? text : ""), [
    prefersReducedMotion,
    text,
  ]);

  const [visibleText, setVisibleText] = useState(initial);
  const [isDone, setIsDone] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleText(text);
      setIsDone(true);
      return;
    }

    setVisibleText("");
    setIsDone(false);

    let index = 0;
    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setVisibleText(text.slice(0, index));

        if (index >= text.length) {
          setIsDone(true);
          window.clearInterval(intervalId);
        }
      }, Math.max(10, speedMs));
    }, Math.max(0, startDelayMs));

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [prefersReducedMotion, speedMs, startDelayMs, text]);

  const Component = as;

  const caret =
    showCaret && !prefersReducedMotion ? (
      <span
        className="typing-caret"
        aria-hidden="true"
        data-done={isDone ? "true" : "false"}
      />
    ) : null;

  return (
    <Component className={className} aria-label={text}>
      {visibleText}
      {caret}
    </Component>
  );
}
