import { useMemo, useState } from "react";
import SkillsPie3D from "./SkillsPie3D";
import SkillsPanel from "./SkillsPanel";
import { skillSlices } from "./skillsData";

function ParcoursSkills() {
  const [activeId, setActiveId] = useState(
    skillSlices[0]?.id ?? "data-engineering"
  );

  const active = useMemo(() => {
    return skillSlices.find((s) => s.id === activeId) ?? skillSlices[0];
  }, [activeId]);

  if (!active) return null;

  return (
    <section className="parcours-skills" aria-label="Compétences">
      <div className="parcours-skills__header">
        <h2 className="parcours-skills__title">Compétences</h2>
        <p className="parcours-skills__desc">
          Un aperçu des domaines que je mobilise au quotidien (clique sur une
          part).
        </p>
      </div>

      <div className="parcours-skills__grid">
        <div className="parcours-skills__left">
          <SkillsPie3D
            slices={skillSlices}
            activeId={activeId}
            onSelect={setActiveId}
          />

          <div className="skills-legend">
            {skillSlices.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`skills-legend__item ${
                  s.id === activeId ? "is-active" : ""
                }`}
                onClick={() => setActiveId(s.id)}
              >
                <span
                  className="skills-legend__dot"
                  style={{ background: s.color }}
                />
                <span className="skills-legend__text">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="parcours-skills__right">
          <SkillsPanel active={active} />
        </div>
      </div>
    </section>
  );
}

export default ParcoursSkills;
export { ParcoursSkills };
