import AuroraBackground from "../../components/vous-et-moi/AuroraBackground";
import SectionBlock from "../../components/vous-et-moi/SectionBlock";
import { sectionsData } from "./sectionsData";

export default function VousEtMoiPage() {
  return (
    <section className="vous-et-moi">
      <AuroraBackground />
      <div className="vous-et-moi-inner">
        <header className="vous-et-moi-header">
          <p className="vous-et-moi-eyebrow">Vous & Moi</p>
          <h1 className="vous-et-moi-title">Un dialogue clair entre vision et exécution.</h1>
          <p className="vous-et-moi-intro">
            Un aperçu humain et concret de ce que je construis, de ma manière de travailler et de
            la valeur que je peux apporter.
          </p>
        </header>
        <div className="vous-et-moi-sections">
          {sectionsData.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}
