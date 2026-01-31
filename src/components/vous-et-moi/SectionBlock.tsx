import useRevealOnScroll from "./useRevealOnScroll";
import type { SectionData } from "../../pages/vous-et-moi/sectionsData";

const layoutClassMap: Record<SectionData["layout"], string> = {
  // ✅ variantes "a/b/c" (style déstructuré)
  a: "vem-section--a",
  b: "vem-section--b",
  c: "vem-section--c",

  // ✅ compat si jamais SectionData contient encore les anciens layouts
  "text-left": "vem-section--text-left",
  "text-right": "vem-section--text-right",
  stacked: "vem-section--stacked",
};

type SectionBlockProps = {
  section: SectionData;
};

export default function SectionBlock({ section }: SectionBlockProps) {
  const titleReveal = useRevealOnScroll<HTMLHeadingElement>();
  const textReveal = useRevealOnScroll<HTMLDivElement>();
  const imageReveal = useRevealOnScroll<HTMLDivElement>();

  const layoutClass = layoutClassMap[section.layout] ?? "vem-section--a";

  return (
    <section className={`vem-section ${layoutClass}`} id={section.id}>
      <div className="vem-section-line" aria-hidden="true" />
      <div className="vem-section-content">
        <div
          ref={titleReveal.ref}
          className={`vem-title-block reveal ${
            titleReveal.isVisible ? "is-visible" : ""
          }`}
          data-stagger="0"
        >
          <h2 className="vem-title">{section.title}</h2>
        </div>

        <div
          ref={textReveal.ref}
          className={`vem-text-block reveal ${
            textReveal.isVisible ? "is-visible" : ""
          }`}
          data-stagger="1"
        >
          {section.body.map((line) => (
            <p key={line} className="vem-text">
              {line}
            </p>
          ))}
        </div>

        <div
          ref={imageReveal.ref}
          className={`vem-image-block reveal ${
            imageReveal.isVisible ? "is-visible" : ""
          }`}
          data-stagger="2"
        >
          <img src={section.image} alt="Portrait placeholder" loading="lazy" />
        </div>

        <span className="vem-orb" aria-hidden="true" />
      </div>
    </section>
  );
}
