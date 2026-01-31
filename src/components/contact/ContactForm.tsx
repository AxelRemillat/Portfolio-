import type { ChangeEvent, FormEvent } from "react";
import ContactSubmitOrb from "./ContactSubmitOrb";

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

  onChange: (field: keyof FormState, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;

  onUserEdit?: () => void;
  onTouch: (field: keyof FormState) => void;

  fieldErrorMessage: (field: keyof FormState) => string | null;

  // email valide + service choisi
  canSend: boolean;
};

export default function ContactForm({
  data,
  status,
  onChange,
  onSubmit,
  onUserEdit,
  onTouch,
  fieldErrorMessage,
  canSend,
}: ContactFormProps) {
  const handleChange =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      if (status === "sent") onUserEdit?.();
      onChange(field, event.target.value);
    };

  const emailError = fieldErrorMessage("email");
  const serviceError = fieldErrorMessage("service");

  return (
    <form id="contact-form" className="contact-form" onSubmit={onSubmit} noValidate>
      {/* ORB flottant */}
      <div
        className="contact-form__floatingOrb"
        data-ready={canSend ? "true" : "false"}
        aria-hidden="false"
      >
        <ContactSubmitOrb
          status={status}
          disabled={!canSend || status === "sending"}
        />
      </div>

      {/* 01 — Nom */}
      <div className="contact-form__row">
        <span className="contact-form__index">01</span>
        <label className="contact-form__field" htmlFor="contact-name">
          <span>Nom complet</span>
          <input
            id="contact-name"
            type="text"
            value={data.name}
            onChange={handleChange("name")}
            onBlur={() => onTouch("name")}
            autoComplete="name"
          />
        </label>
      </div>

      {/* 02 — Email */}
      <div className="contact-form__row">
        <span className="contact-form__index">02</span>
        <label className="contact-form__field" htmlFor="contact-email">
          <span>Email *</span>
          <input
            id="contact-email"
            type="email"
            value={data.email}
            onChange={handleChange("email")}
            onBlur={() => onTouch("email")}
            required
            aria-invalid={Boolean(emailError)}
            autoComplete="email"
          />
          {emailError && (
            <p className="contact-form__hint contact-form__hint--error">
              {emailError}
            </p>
          )}
        </label>
      </div>

      {/* 03 — Organisation */}
      <div className="contact-form__row">
        <span className="contact-form__index">03</span>
        <label className="contact-form__field" htmlFor="contact-organization">
          <span>Organisation</span>
          <input
            id="contact-organization"
            type="text"
            value={data.organization}
            onChange={handleChange("organization")}
            onBlur={() => onTouch("organization")}
            autoComplete="organization"
          />
        </label>
      </div>

      {/* 04 — Service */}
      <div className="contact-form__row">
        <span className="contact-form__index">04</span>
        <label className="contact-form__field" htmlFor="contact-service">
          <span>Service *</span>
          <select
            id="contact-service"
            value={data.service}
            onChange={handleChange("service")}
            onBlur={() => onTouch("service")}
            required
            aria-invalid={Boolean(serviceError)}
          >
            <option value="">Choisir une option</option>
            <option value="web">Web design</option>
            <option value="dev">Développement</option>
            <option value="ux">UX</option>
            <option value="autre">Autre</option>
          </select>

          {serviceError && (
            <p className="contact-form__hint contact-form__hint--error">
              {serviceError}
            </p>
          )}
        </label>
      </div>

      {/* 05 — Message */}
      <div className="contact-form__row contact-form__row--message">
        <span className="contact-form__index">05</span>
        <label className="contact-form__field" htmlFor="contact-message">
          <span>Message</span>
          <textarea
            id="contact-message"
            rows={4}
            value={data.message}
            onChange={handleChange("message")}
            onBlur={() => onTouch("message")}
          />
        </label>
      </div>
    </form>
  );
}
