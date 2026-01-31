import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import ContactForm from "../../components/contact/ContactForm";
import ContactHero from "../../components/contact/ContactHero";
import ContactSidebar from "../../components/contact/ContactSidebar";
import ContactSubmitOrb from "../../components/contact/ContactSubmitOrb";
import TechGridBackground from "../../components/contact/TechGridBackground";
import VemBackground from "../../components/vous-et-moi/VemBackground";

type FormState = {
  name: string;
  email: string;
  organization: string;
  service: string;
  message: string;
};

type SubmitStatus = "idle" | "sending" | "sent";

const initialForm: FormState = {
  name: "",
  email: "",
  organization: "",
  service: "",
  message: "",
};

export default function ContactPageView() {
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const isValid = useMemo(() => {
    return Boolean(
      formData.name.trim() && formData.email.trim() && formData.message.trim()
    );
  }, [formData.email, formData.message, formData.name]);

  useEffect(() => {
    if (status !== "sending") {
      return;
    }
    const sentTimeout = window.setTimeout(() => {
      setStatus("sent");
    }, 700);
    const resetTimeout = window.setTimeout(() => {
      setStatus("idle");
    }, 2600);
    return () => {
      window.clearTimeout(sentTimeout);
      window.clearTimeout(resetTimeout);
    };
  }, [status]);

  useEffect(() => {
    if (status === "sent") {
      setFormData(initialForm);
    }
  }, [status]);

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) {
      setError("Merci de compléter les champs requis.");
      return;
    }
    setError("");
    setStatus("sending");
    console.info("Contact form submitted", formData);
  };

  const fieldError = (field: keyof FormState) => {
    if (!error) {
      return false;
    }
    return !formData[field].trim();
  };

  return (
    <section className="contact-page-shell">
      <VemBackground />
      <TechGridBackground />
      <div className="contact-page contact-page-backdrop">
        <ContactHero />
        <div className="contact-page__grid">
          <div className="contact-page__form">
            <ContactForm
              data={formData}
              status={status}
              error={error}
              onChange={handleChange}
              onSubmit={handleSubmit}
              fieldError={fieldError}
            />
            <ContactSubmitOrb status={status} disabled={!isValid || status === "sending"} />
          </div>
          <ContactSidebar />
        </div>
      </div>
    </section>
  );
}
