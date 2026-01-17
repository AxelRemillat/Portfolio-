import { useState } from "react";
import { parcoursCaps } from "../../data/parcoursCaps";
import "../../styles/parcours.css";

export default function ParcoursPage() {
  const current = parcoursCaps.find((cap) => cap.isCurrent);
  const [selectedId, setSelectedId] = useState<string | null>(
    current?.id ?? parcoursCaps[0]?.id ?? null,
  );
  const selectedCap = parcoursCaps.find((cap) => cap.id === selectedId) ?? current;

  return (
    <section className="section parcours-page">
      <h1>Parcours</h1>
      <p className="muted">
        Navigation par bulles: sélectionnez une étape pour afficher le détail dans l’écran dédié.
      </p>

      <div className="parcours-layout">
        <div className="parcours-bubbles" role="list">
          {parcoursCaps.map((cap) => {
            const isSelected = cap.id === selectedId;
            return (
              <button
                key={cap.id}
                type="button"
                className={`parcours-bubble${isSelected ? " active" : ""}${
                  cap.isCurrent ? " current" : ""
                }`}
                onClick={() => setSelectedId(cap.id)}
                aria-pressed={isSelected}
              >
                <span className="parcours-bubble-period">{cap.period}</span>
                <span className="parcours-bubble-title">{cap.title}</span>
              </button>
            );
          })}
        </div>

        {selectedCap && (
          <article className="parcours-screen" aria-live="polite">
            <header className="parcours-screen-header">
              <div>
                <p className="parcours-screen-period">{selectedCap.period}</p>
                <h2>{selectedCap.title}</h2>
                <p className="muted">{selectedCap.org}</p>
              </div>
              {selectedCap.isCurrent && (
                <span className="parcours-screen-badge">En cours</span>
              )}
            </header>

            <p className="parcours-screen-summary">{selectedCap.summary}</p>

            <div className="parcours-screen-grid">
              <div className="parcours-screen-section">
                <h4>Ce que j’ai appris</h4>
                <ul className="parcours-screen-list">
                  {selectedCap.learned.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="parcours-screen-section">
                <h4>Compétences débloquées</h4>
                <div className="tags">
                  {selectedCap.skills.map((skill) => (
                    <span key={skill} className="tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="parcours-screen-section">
                <h4>Highlights</h4>
                <ul className="parcours-screen-list">
                  {selectedCap.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
