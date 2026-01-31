import { useState } from "react";

const contactInfo = {
  email: "axel.remillat@email.com",
  phone: "+33 6 00 00 00 00",
  location: "France",
};

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function ContactSidebar() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied("");
    }
  };

  return (
    <aside className="contact-sidebar">
      <h2>Contact details</h2>
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
      <div className="contact-sidebar__block">
        <p className="contact-sidebar__label">Téléphone</p>
        <div className="contact-sidebar__item">
          <span className="contact-sidebar__value">{contactInfo.phone}</span>
          <button
            type="button"
            className="contact-sidebar__copy"
            onClick={() => handleCopy(contactInfo.phone, "phone")}
          >
            {copied === "phone" ? "Copié" : "Copier"}
          </button>
        </div>
      </div>
      <div className="contact-sidebar__block">
        <p className="contact-sidebar__label">Localisation</p>
        <p className="contact-sidebar__meta">{contactInfo.location}</p>
      </div>
      <div className="contact-sidebar__block">
        <p className="contact-sidebar__label">Socials</p>
        <div className="contact-sidebar__socials">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
