import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useScrollProgress from "./useScrollProgress";

type ContactLink = {
  label: string;
  href: string;
};

export default function ContactCTASection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const progress = useScrollProgress(sectionRef, { disabled: reducedMotion });

  // --- À personnaliser (tu remplaceras par tes vraies infos)
  const email = "axel.remillat@email.com";
  const phone = "+33 6 00 00 00 00";
  const socials: ContactLink[] = [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Twitter", href: "https://twitter.com/" },
    { label: "Awwwards", href: "https://www.awwwards.com/" },
  ];

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
            Un projet en tête ? Discutons d’une interface claire et ambitieuse.
          </p>

          <div className="vem-contact__pills" aria-label="Coordonnées">
            <a className="vem-contact__pill" href={`mailto:${email}`}>
              {email}
            </a>
            <a
              className="vem-contact__pill"
              href={`tel:${phone.replace(/\s+/g, "")}`}
            >
              {phone}
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

      <footer className="vem-contact__footer" aria-label="Réseaux">
        <div className="vem-contact__footer-right">
          <span className="vem-contact__footer-label">SOCIALS</span>
          <nav className="vem-contact__socials" aria-label="Liens sociaux">
            {socials.map((s) => (
              <a
                key={s.label}
                className="vem-contact__social"
                href={s.href}
                target="_blank"
                rel="noreferrer"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </section>
  );
}
