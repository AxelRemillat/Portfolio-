import { useMemo, useState } from "react";

const contactInfo = {
  email: "axelremillat@netcourrier.com",
  phone: "0749727192",
  location: "Paris · Lyon · Grenoble · Genève",
  linkedin: "https://www.linkedin.com/in/axel-remillatesmelyon/",
};

// ⚠️ Mets ton CV ici : public/cv/Axel-Remillat-CV.pdf
const CV_URL = "/cv/Axel-Remillat-CV.pdf";

export default function ContactSidebar() {
  const [copied, setCopied] = useState<string | null>(null);

  const formattedPhone = useMemo(() => {
    // format FR simple: 07 49 72 71 92
    const digits = contactInfo.phone.replace(/\D/g, "");
    if (digits.length === 10) {
      return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
    }
    return contactInfo.phone;
  }, []);

  const portfolioLink = useMemo(() => {
    // si tu as un domaine fixe plus tard, remplace par "https://ton-domaine.com"
    return window.location.origin;
  }, []);

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      // fallback: sélection/ancien navigateur
      try {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);

        setCopied(label);
        window.setTimeout(() => setCopied(null), 1400);
      } catch {
        setCopied("");
      }
    }
  };

  return (
    <aside className="contact-sidebar">
      <h2>Contact details</h2>

      {/* EMAIL */}
      <div className="contact-sidebar__block">
        <p className="contact-sidebar__label">Email</p>
        <div className="contact-sidebar__item">
          <span className="contact-sidebar__value">{contactInfo.email}</span>
          <button
            type="button"
            className="contact-sidebar__copy"
            onClick={() => handleCopy(contactInfo.email, "email")}
          >
            {copied === "email" ? "Copié" : "Copier"}
          </button>
        </div>
      </div>

      {/* TELEPHONE */}
      <div className="contact-sidebar__block">
        <p className="contact-sidebar__label">Téléphone</p>
        <div className="contact-sidebar__item">
          <span className="contact-sidebar__value">{formattedPhone}</span>
          <button
            type="button"
            className="contact-sidebar__copy"
            onClick={() => handleCopy(contactInfo.phone, "phone")}
          >
            {copied === "phone" ? "Copié" : "Copier"}
          </button>
        </div>
      </div>

      {/* LOCALISATION */}
      <div className="contact-sidebar__block">
        <p className="contact-sidebar__label">Localisation</p>
        <p className="contact-sidebar__meta">{contactInfo.location}</p>
      </div>

      {/* SOCIALS */}
      <div className="contact-sidebar__block">
        <p className="contact-sidebar__label">Socials</p>
        <div className="contact-sidebar__socials">
          <a href={contactInfo.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="contact-sidebar__block">
        <p className="contact-sidebar__label">Partager</p>

        <div className="contact-sidebar__actions">
          <button
            type="button"
            className="contact-sidebar__action"
            onClick={() => handleCopy(portfolioLink, "portfolio")}
          >
            {copied === "portfolio" ? "Lien copié" : "Copier le lien du portfolio"}
          </button>

          <a className="contact-sidebar__action" href={CV_URL} download>
            Télécharger mon CV (PDF)
          </a>
        </div>

        {copied === "" ? (
          <p className="contact-sidebar__hint">Impossible de copier automatiquement sur ce navigateur.</p>
        ) : null}
      </div>
    </aside>
  );
}
