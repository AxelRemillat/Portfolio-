import { forwardRef } from "react";
import type { ParcoursCap } from "../../data/parcoursCaps";

type DropScreenProps = {
  cap: ParcoursCap;
  isDropActive: boolean;
};

const DropScreen = forwardRef<HTMLDivElement, DropScreenProps>(({ cap, isDropActive }, ref) => {
  return (
    <article
      ref={ref}
      className={`parcours-screen${isDropActive ? " drop-active" : ""}`}
      aria-live="polite"
    >
      <header className="parcours-screen-header">
        <div>
          <p className="parcours-screen-period">{cap.period}</p>
          <h2>{cap.title}</h2>
          <p className="muted">{cap.org}</p>
        </div>
        {cap.isCurrent && <span className="parcours-screen-badge">En cours</span>}
      </header>

      <p className="parcours-screen-summary">{cap.summary}</p>

      <div className="parcours-screen-grid">
        <div className="parcours-screen-section">
          <h4>Ce que j’ai appris</h4>
          <ul className="parcours-screen-list">
            {cap.learned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="parcours-screen-section">
          <h4>Compétences débloquées</h4>
          <div className="tags">
            {cap.skills.map((skill) => (
              <span key={skill} className="tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="parcours-screen-section">
          <h4>Highlights</h4>
          <ul className="parcours-screen-list">
            {cap.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
});

DropScreen.displayName = "DropScreen";

export default DropScreen;
