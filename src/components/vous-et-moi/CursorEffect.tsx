import { useEffect, useRef } from "react";
import "../../styles/vous-et-moi/CursorEffect.css";

export default function CursorEffect() {
  const light1Ref = useRef<HTMLDivElement>(null);
  const light2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light1 = light1Ref.current;
    const light2 = light2Ref.current;

    // 🎯 Track le curseur et déplace les reflets
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Déplacer le gros reflet
      if (light1) {
        light1.style.left = x + "px";
        light1.style.top = y + "px";
      }

      // Déplacer le petit reflet (plus rapide)
      if (light2) {
        light2.style.left = x + "px";
        light2.style.top = y + "px";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="cursor-effect-container">
      {/* 🌟 REFLET 1 : Gros halo blanc-bronze */}
      <div ref={light1Ref} className="cursor-light cursor-light--big" />
      
      {/* 🌟 REFLET 2 : Petit halo bronze intense */}
      <div ref={light2Ref} className="cursor-light cursor-light--small" />
    </div>
  );
}