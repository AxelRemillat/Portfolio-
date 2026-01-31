import type { ChangeEvent, FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  organization: string;
  service: string;
  message: string;
};

type ContactFormProps = {
  data: FormState;
  status: "idle" | "sending" | "sent";
  error: string;
  onChange: (field: keyof FormState, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  fieldError: (field: keyof FormState) => boolean;
};

export default function ContactForm({
  data,
  status,
  error,
  onChange,
  onSubmit,
  fieldError,
}: ContactFormProps) {
  const handleChange = (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      onChange(field, event.target.value);
    };

  return (
    <form id="contact-form" className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form__row">
        <span className="contact-form__index">01</span>
        <label className="contact-form__field" htmlFor="contact-name">
          <span>Nom complet *</span>
          <input
            id="contact-name"
            type="text"
            value={data.name}
            onChange={handleChange("name")}
            required
            aria-invalid={fieldError("name")}
          />
        </label>
      </div>
      <div className="contact-form__row">
        <span className="contact-form__index">02</span>
        <label className="contact-form__field" htmlFor="contact-email">
          <span>Email *</span>
          <input
            id="contact-email"
            type="email"
            value={data.email}
            onChange={handleChange("email")}
            required
            aria-invalid={fieldError("email")}
          />
        </label>
      </div>
      <div className="contact-form__row">
        <span className="contact-form__index">03</span>
        <label className="contact-form__field" htmlFor="contact-organization">
          <span>Organisation</span>
          <input
            id="contact-organization"
            type="text"
            value={data.organization}
            onChange={handleChange("organization")}
          />
        </label>
      </div>
      <div className="contact-form__row">
        <span className="contact-form__index">04</span>
        <label className="contact-form__field" htmlFor="contact-service">
          <span>Service</span>
          <select
            id="contact-service"
            value={data.service}
            onChange={handleChange("service")}
          >
            <option value="">Choisir une option</option>
            <option value="web">Web design</option>
            <option value="dev">Développement</option>
            <option value="ux">UX</option>
            <option value="autre">Autre</option>
          </select>
        </label>
      </div>
      <div className="contact-form__row">
        <span className="contact-form__index">05</span>
        <label className="contact-form__field" htmlFor="contact-message">
          <span>Message *</span>
          <textarea
            id="contact-message"
            rows={4}
            value={data.message}
            onChange={handleChange("message")}
            required
            aria-invalid={fieldError("message")}
          />
        </label>
      </div>
      <div className="contact-form__footer" aria-live="polite">
        {error && <p className="contact-form__error">{error}</p>}
        {status === "sent" && <p className="contact-form__success">Message envoyé. Merci !</p>}
      </div>
    </form>
  );
}
