import { useRef } from "react";
import useTechGrid from "./useTechGrid";

export default function TechGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useTechGrid(canvasRef);

  return (
    <div className="contact-tech-grid" aria-hidden="true">
      <canvas ref={canvasRef} className="contact-tech-grid__canvas" />
    </div>
  );
}
