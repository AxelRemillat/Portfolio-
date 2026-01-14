import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (field: keyof typeof initialForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Merci de compléter tous les champs.");
      return;
    }

    setError("");
    setSubmitted(true);
    setFormData(initialForm);
  };

  return (
    <div className="contact-layout">
      <div className="card contact-card">
        <h3>Coordonnées</h3>
        <p className="muted">
          Disponible pour un stage, un projet ou une opportunité.
        </p>

        <div className="contactRow">
          <a className="link" href="mailto:tonmail@example.com">
            tonmail@example.com
          </a>
          <a className="link" href="https://linkedin.com/in/tonprofil" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="link" href="https://github.com/TON_USER" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span className="contact-phone">+33 6 00 00 00 00</span>
        </div>
      </div>

      <form className="card contact-form" onSubmit={handleSubmit}>
        <h3>Écrire un message</h3>
        <label className="field">
          <span>Nom</span>
          <input type="text" value={formData.name} onChange={handleChange("name")} required />
        </label>
        <label className="field">
          <span>Email</span>
          <input type="email" value={formData.email} onChange={handleChange("email")} required />
        </label>
        <label className="field">
          <span>Message</span>
          <textarea rows={4} value={formData.message} onChange={handleChange("message")} required />
        </label>

        {error && <p className="form-message error">{error}</p>}
        {submitted && <p className="form-message success">Merci, je reviens vers vous rapidement.</p>}

        <button className="btn primary" type="submit">
          Envoyer
        </button>
      </form>
    </div>
  );
}
