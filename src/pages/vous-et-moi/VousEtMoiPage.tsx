import ContactCTASection from "../../components/vous-et-moi/ContactCTASection";
import VemBackground from "../../components/vous-et-moi/VemBackground";
import SectionBlock from "../../components/vous-et-moi/SectionBlock";
import useBodyClass from "../../components/vous-et-moi/useBodyClass";
import { sectionsData } from "./sectionsData";

export default function VousEtMoiPage() {
  useBodyClass("vem-body");

  return (
    <section className="vous-et-moi">
      <VemBackground />
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
        <ContactCTASection />
      </div>
    </section>
  );
}
