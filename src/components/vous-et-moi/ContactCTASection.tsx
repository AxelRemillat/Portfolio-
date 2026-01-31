import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useScrollProgress from "./useScrollProgress";

export default function ContactCTASection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(media.matches);
    };
    update();
    media.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  const progress = useScrollProgress(sectionRef, { disabled: reducedMotion });

  const dynamicStyle = useMemo(() => {
    if (reducedMotion) {
      return undefined;
    }
    const translate = (1 - progress) * 50;
    const scale = 0.94 + progress * 0.06;
    const opacity = 0.6 + progress * 0.4;
    return {
      transform: `translateY(${translate}px) scale(${scale})`,
      opacity,
    } as const;
  }, [progress, reducedMotion]);

  return (
    <section ref={sectionRef} className="vem-contact">
      <div className="vem-contact__line" aria-hidden="true" />
      <div className="vem-contact__card" style={dynamicStyle}>
        <div className="vem-contact__text">
          <p className="vem-contact__eyebrow">Contact</p>
          <h2 className="vem-contact__title">Travaillons ensemble.</h2>
          <p className="vem-contact__copy">
            Un projet en tête ? Discutons d’une interface claire et ambitieuse.
          </p>
        </div>
        <Link className="vem-contact__cta" to="/contact">
          <span>Me contacter</span>
        </Link>
      </div>
    </section>
  );
}
