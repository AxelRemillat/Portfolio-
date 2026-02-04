import type { SkillSlice } from "./skillsData";

type Props = {
  active: SkillSlice;
};

function SkillsPanel({ active }: Props) {
  return (
    <div className="skills-panel">
      <div className="skills-panel__head">
        <div
          className="skills-panel__badge"
          style={{ background: active.color }}
        />
        <div>
          <div className="skills-panel__title">{active.label}</div>
          <div className="skills-panel__meta">{active.level}</div>
        </div>
      </div>

      <p className="skills-panel__summary">{active.summary}</p>

      <div className="skills-panel__section">
        <div className="skills-panel__label">Ce que je sais faire</div>
        <ul className="skills-panel__list">
          {active.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="skills-panel__section">
        <div className="skills-panel__label">Outils</div>
        <div className="skills-panel__chips">
          {active.tools.map((t) => (
            <span key={t} className="skills-chip">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="skills-panel__section">
        <div className="skills-panel__label">Preuves</div>
        <div className="skills-panel__links">
          {active.proofs.map((p) => (
            <a key={p.label} className="skills-link" href={p.href}>
              {p.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillsPanel;
export { SkillsPanel };
