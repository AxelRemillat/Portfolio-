import { useState } from "react";

const fallbackAvatar = "/images/vous-et-moi-1.svg";
const defaultAvatar = "/images/axel.jpg";

export default function ContactHero() {
  const [avatarSrc, setAvatarSrc] = useState(defaultAvatar);

  return (
    <header className="contact-hero">
      <div className="contact-hero__title">
        <p className="contact-hero__eyebrow">Contact</p>
        <h1>Let’s start a project together.</h1>
        <p className="contact-hero__subtitle">
          Quelques infos et un message suffisent pour lancer la conversation.
        </p>
      </div>
      <div className="contact-hero__avatar">
        <img
          src={avatarSrc}
          alt="Portrait d'Axel"
          onError={() => setAvatarSrc(fallbackAvatar)}
        />
      </div>
    </header>
  );
}
