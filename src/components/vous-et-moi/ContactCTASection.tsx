import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useScrollProgress from "./useScrollProgress";

export default function ContactCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const progress = useScrollProgress(sectionRef, { disabled: reducedMotion });

  // --- Infos réelles
  const email = "axelremillat@netcourrier.com";
  const phoneDisplay = " 07 49 72 71 92";
  const phoneHref = "+33749727192";

  const dynamicStyle = useMemo(() => {
    if (reducedMotion) return undefined;

    const t = 1 - progress; // 1 -> 0
    const translateY = t * 70;
    const rotateX = t * 10;
    const scale = 0.94 + progress * 0.06;
    const opacity = 0.65 + progress * 0.35;

    return {
      opacity,
      transform: `perspective(900px) translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`,
      transformOrigin: "center bottom",
    } as const;
  }, [progress, reducedMotion]);

  return (
    <section ref={sectionRef} className="vem-contact" aria-label="Contact">
      <div className="vem-contact__line" aria-hidden="true" />

      <div className="vem-contact__card" style={dynamicStyle}>
        <div className="vem-contact__text">
          <p className="vem-contact__eyebrow">Contact</p>
          <h2 className="vem-contact__title">Travaillons ensemble.</h2>
          <p className="vem-contact__copy">
            Un projet en tête ? Discutons d’un produit utile, clair et solide — de
            l’idée à la mise en ligne.
          </p>

          <div className="vem-contact__pills" aria-label="Coordonnées">
            <a className="vem-contact__pill" href={`mailto:${email}`}>
              {email}
            </a>
            <a className="vem-contact__pill" href={`tel:${phoneHref}`}>
              {phoneDisplay}
            </a>
          </div>
        </div>

        <Link
          className="vem-contact__cta"
          to="/contact"
          aria-label="Aller à la page contact"
        >
          <span>Me contacter</span>
        </Link>
      </div>

    </section>
  );
}
