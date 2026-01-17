import { useEffect, useId } from "react";
import type { ParcoursCap } from "../../data/parcoursCaps";

type ParcoursCapCardProps = {
  cap: ParcoursCap;
  isOpen: boolean;
  align: "left" | "right";
  onToggle: (id: string) => void;
};

export default function ParcoursCapCard({ cap, isOpen, align, onToggle }: ParcoursCapCardProps) {
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    document.getElementById(panelId)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [isOpen, panelId]);

  return (
    <article
      className={
        cap.isCurrent
          ? "parcours-cap current"
          : align === "left"
            ? "parcours-cap left"
            : "parcours-cap right"
      }
    >
      <button
        type="button"
        className="parcours-cap-toggle"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(cap.id)}
      >
        <div>
          <p className="parcours-cap-period">{cap.period}</p>
          <h3>{cap.title}</h3>
          <p className="muted">{cap.org}</p>
        </div>
        <span className="parcours-cap-arrow" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <p className="parcours-cap-summary">{cap.summary}</p>

      <div
        id={panelId}
        className={isOpen ? "parcours-cap-details open" : "parcours-cap-details"}
      >
        <div className="parcours-cap-section">
          <h4>Ce que j’ai appris</h4>
          <ul>
            {cap.learned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="parcours-cap-section">
          <h4>Compétences débloquées</h4>
          <div className="tags">
            {cap.skills.map((skill) => (
              <span key={skill} className="tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="parcours-cap-section">
          <h4>Highlights</h4>
          <ul>
            {cap.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
