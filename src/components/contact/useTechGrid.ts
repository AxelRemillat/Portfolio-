import { useEffect } from "react";
import type { GridPoint } from "./techGridUtils";
import { buildGrid, drawGrid, getGridSize } from "./techGridUtils";

type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

export default function useTechGrid(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const points: GridPoint[] = [];
    const pointer: PointerState = { x: 0, y: 0, active: false };
    let frame: number | null = null;
    let isVisible = true;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resizeGrid = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { cols, rows } = getGridSize(rect.width, rect.height);
      buildGrid(points, rect.width, rect.height, cols, rows);
      drawGrid(context, rect.width, rect.height, points, cols, rows);
    };

    const animate = () => {
      frame = null;
      if (!isVisible || media.matches) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const { cols, rows } = getGridSize(rect.width, rect.height);
      const radius = 120;
      const strength = 0.08;
      const spring = 0.04;
      const damping = 0.9;

      for (const point of points) {
        if (pointer.active) {
          const dx = point.x - pointer.x;
          const dy = point.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < radius && dist > 0.001) {
            const force = (1 - dist / radius) * strength;
            point.vx += (dx / dist) * force;
            point.vy += (dy / dist) * force;
          }
        }

        point.vx += (point.ox - point.x) * spring;
        point.vy += (point.oy - point.y) * spring;
        point.vx *= damping;
        point.vy *= damping;
        point.x += point.vx;
        point.y += point.vy;
      }

      drawGrid(context, rect.width, rect.height, points, cols, rows);
      frame = window.requestAnimationFrame(animate);
    };

    const handlePointer = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      if (frame === null && !media.matches) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const resizeObserver = new ResizeObserver(resizeGrid);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && frame === null && !media.matches) {
          frame = window.requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    window.addEventListener("mousemove", handlePointer);
    window.addEventListener("mouseleave", handlePointerLeave);

    resizeGrid();
    if (!media.matches) {
      frame = window.requestAnimationFrame(animate);
    }

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("mousemove", handlePointer);
      window.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [canvasRef]);
}
