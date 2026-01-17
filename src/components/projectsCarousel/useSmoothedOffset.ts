import { useEffect, useRef, useState } from "react";

type UseSmoothedOffsetProps = {
  prefersReducedMotion: boolean;
  isDragging: boolean;
  targetRef: React.MutableRefObject<number>;
};

export default function useSmoothedOffset({
  prefersReducedMotion,
  isDragging,
  targetRef,
}: UseSmoothedOffsetProps) {
  const [smoothedOffset, setSmoothedOffset] = useState(0);
  const smoothedOffsetRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      const target = targetRef.current;
      setSmoothedOffset((prev) => {
        if (prefersReducedMotion) {
          smoothedOffsetRef.current = target;
          return target;
        }
        const next = prev + (target - prev) * 0.18;
        const settled = Math.abs(next) < 0.2 && !isDragging ? 0 : next;
        smoothedOffsetRef.current = settled;
        return settled;
      });

      if (
        isDragging ||
        Math.abs(targetRef.current) > 0.2 ||
        Math.abs(smoothedOffsetRef.current) > 0.2
      ) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
      }
    };

    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isDragging, prefersReducedMotion, targetRef]);

  return smoothedOffset;
}
