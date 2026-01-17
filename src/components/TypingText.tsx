import { useEffect, useState } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

type TypingTextProps = {
  text: string;
  speedMs?: number;
  startDelayMs?: number;
  as?: "h1" | "p" | "span";
  className?: string;
};

export default function TypingText({
  text,
  speedMs = 24,
  startDelayMs = 0,
  as = "span",
  className,
}: TypingTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visibleText, setVisibleText] = useState(prefersReducedMotion ? text : "");

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleText(text);
      return;
    }

    let index = 0;
    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setVisibleText(text.slice(0, index));
        if (index >= text.length) {
          window.clearInterval(intervalId);
        }
      }, speedMs);
    }, startDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [prefersReducedMotion, speedMs, startDelayMs, text]);

  const Component = as;
  return <Component className={className}>{visibleText}</Component>;
}
