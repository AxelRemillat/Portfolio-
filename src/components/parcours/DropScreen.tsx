import { forwardRef, type CSSProperties } from "react";
import type { ParcoursCap } from "../../data/parcoursCaps";

type DropScreenProps = {
  cap: ParcoursCap;
  isDropActive: boolean;
  accentColor: string;
};

function withAlpha(hexOrRgb: string, alpha: number) {
  // support:
  // - "#RRGGBB"
  // - "rgb(r,g,b)"
  // - "rgba(r,g,b,a)"
  // fallback: returns original (CSS will ignore if invalid)
  const c = hexOrRgb.trim();

  if (c.startsWith("#") && c.length === 7) {
    const r = parseInt(c.slice(1, 3), 16);
    const g = parseInt(c.slice(3, 5), 16);
    const b = parseInt(c.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  if (c.startsWith("rgb(")) {
    const inside = c.slice(4, -1);
    return `rgba(${inside}, ${alpha})`;
  }

  if (c.startsWith("rgba(")) return c;

  return c;
}

const DropScreen = forwardRef<HTMLDivElement, DropScreenProps>(
  ({ cap, isDropActive, accentColor }, ref) => {
    const accent = accentColor || cap.color || "rgba(148, 163, 184, 0.6)";

    const glowSoft = withAlpha(accent, 0.18);
    const glowStrong = withAlpha(accent, 0.32);

    const styleVars: CSSProperties = {
      // variable dispo si tu veux l'utiliser ailleurs en CSS
      ["--screen-accent" as any]: accent,

      // ✅ toujours au-dessus du fond (important quand on met un background fixed en z-index 0)
      position: "relative",
      zIndex: 1,

      // ✅ garde un fond transparent (évite tout “voile blanc” inattendu)
      background: "transparent",

      // styles dynamiques existants
      borderColor: accent,
      boxShadow: isDropActive
        ? `0 24px 60px rgba(5, 9, 20, 0.45), 0 0 34px ${glowStrong}`
        : `0 24px 60px rgba(5, 9, 20, 0.45), 0 0 18px ${glowSoft}`,
    };

    return (
      <article
        ref={ref}
        className={`parcours-screen${isDropActive ? " drop-active" : ""}`}
        aria-live="polite"
        style={styleVars}
      >
        <header className="parcours-screen-header">
          <div>
            <p className="parcours-screen-period">{cap.period}</p>
            <h2>{cap.title}</h2>
            <p className="muted">{cap.org}</p>
          </div>

          {cap.isCurrent && (
            <span
              className="parcours-screen-badge"
              style={
                {
                  borderColor: accent,
                  color: accent,
                  background: withAlpha(accent, 0.12),
                } as CSSProperties
              }
            >
              En cours
            </span>
          )}
        </header>

        <p className="parcours-screen-summary">{cap.summary}</p>

        <div className="parcours-screen-grid">
          <section className="parcours-screen-section">
            <h4>Ce que j’ai appris</h4>
            <ul className="parcours-screen-list">
              {cap.learned.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="parcours-screen-section">
            <h4>Compétences débloquées</h4>
            <div className="tags">
              {cap.skills.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="parcours-screen-section">
            <h4>Highlights</h4>
            <ul className="parcours-screen-list">
              {cap.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    );
  }
);

DropScreen.displayName = "DropScreen";
export default DropScreen;
