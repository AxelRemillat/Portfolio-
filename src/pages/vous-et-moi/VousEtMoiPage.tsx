import ContactCTASection from "../../components/vous-et-moi/ContactCTASection";
import SectionBlock from "../../components/vous-et-moi/SectionBlock";
import useBodyClass from "../../components/vous-et-moi/useBodyClass";
import VemBackground from "../../components/vous-et-moi/VemBackground";
import CursorEffect from "../../components/vous-et-moi/CursorEffect";
import { sectionsData } from "./sectionsData";

export default function VousEtMoiPage() {
  // ✅ force le fond ivoire sur tout le viewport uniquement sur cette page
  useBodyClass("vem-body");

  return (
    <section className="vous-et-moi">
      {/* ✅ Background bronze/blanc cassé */}
      <VemBackground />
      
      {/* 🎯 NOUVEAU : Effet curseur par-dessus */}
      <CursorEffect />

      <div className="vous-et-moi-inner">
        <header className="vous-et-moi-header">
          <p className="vous-et-moi-eyebrow">Vous &amp; Moi</p>

          <h1 className="vous-et-moi-title">
            Un dialogue clair entre vision et exécution.
          </h1>

          <p className="vous-et-moi-intro">
            Un aperçu humain et concret de ce que je construis, de ma manière de
            travailler et de la valeur que je peux apporter.
          </p>
        </header>

        <div className="vous-et-moi-sections">
          {sectionsData.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}
        </div>

        {/* ✅ section finale "Let's work together" */}
        <ContactCTASection />
      </div>
    </section>
  );
}