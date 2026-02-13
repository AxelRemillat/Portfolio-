import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import ContactForm from "../../components/contact/ContactForm";
import ContactHero from "../../components/contact/ContactHero";
import ContactSidebar from "../../components/contact/ContactSidebar";
import VemBackground from "../../components/vous-et-moi/VemBackground";
import CursorEffect from "../../components/vous-et-moi/CursorEffect";

type FormState = {
  name: string;
  email: string;
  organization: string;
  service: string;
  message: string;
};

type SubmitStatus = "idle" | "sending" | "sent";
type FieldKey = keyof FormState;

const initialForm: FormState = {
  name: "",
  email: "",
  organization: "",
  service: "",
  message: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPageView() {
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    name: false,
    email: false,
    organization: false,
    service: false,
    message: false,
  });

  const isEmailValid = useMemo(
    () => emailRegex.test(formData.email.trim()),
    [formData.email]
  );

  const canSend = useMemo(() => {
    return isEmailValid && Boolean(formData.service.trim());
  }, [isEmailValid, formData.service]);

  useEffect(() => {
    if (status !== "sending") return;

    const sentTimeout = window.setTimeout(() => setStatus("sent"), 700);
    const resetTimeout = window.setTimeout(() => setStatus("idle"), 2200);

    return () => {
      window.clearTimeout(sentTimeout);
      window.clearTimeout(resetTimeout);
    };
  }, [status]);

  const handleChange = (field: FieldKey, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status === "sent") setStatus("idle");
  };

  const handleTouch = (field: FieldKey) => {
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  };

  const getFieldErrorMessage = (field: FieldKey): string | null => {
    if (!touched[field]) return null;

    if (field === "email") {
      if (!formData.email.trim()) return "Veuillez renseigner une adresse email.";
      if (!isEmailValid) return "Adresse email invalide. Exemple : nom@domaine.com";
      return null;
    }

    if (field === "service") {
      if (!formData.service.trim()) return "Veuillez sélectionner un service.";
      return null;
    }

    return null;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched((prev) => ({
      ...prev,
      email: true,
      service: true,
    }));

    if (!canSend) return;

    setStatus("sending");
    console.info("Contact form submitted", formData);
  };

  return (
    <section className="contact-page">
      {/* 🎨 Background bronze/blanc cassé */}
      <VemBackground />
      
      {/* ✨ Effet croix lumineuse */}
      <CursorEffect />

      <ContactHero />
      <div className="contact-page__grid">
        <div className="contact-page__form">
          <ContactForm
            data={formData}
            status={status}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onTouch={handleTouch}
            fieldErrorMessage={getFieldErrorMessage}
            canSend={canSend}
          />
        </div>
        <ContactSidebar />
      </div>
    </section>
  );
}