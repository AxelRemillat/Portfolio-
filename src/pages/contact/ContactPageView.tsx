import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import ContactForm from "../../components/contact/ContactForm";
import ContactHero from "../../components/contact/ContactHero";
import ContactSidebar from "../../components/contact/ContactSidebar";
import VemBackground from "../../components/vous-et-moi/VemBackground";
import CursorEffect from "../../components/vous-et-moi/CursorEffect";
import { submitContactForm } from "../../lib/submitContactForm";

type FormState = {
  name: string;
  email: string;
  organization: string;
  service: string;
  message: string;
};

type SubmitStatus = "idle" | "sending" | "sent" | "error";
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
    if (status === "sent") {
      // Réinitialiser le formulaire après succès
      const resetTimeout = window.setTimeout(() => {
        setFormData(initialForm);
        setStatus("idle");
        setTouched({
          name: false,
          email: false,
          organization: false,
          service: false,
          message: false,
        });
      }, 2200);

      return () => {
        window.clearTimeout(resetTimeout);
      };
    }

    if (status === "error") {
      // Revenir à idle après erreur
      const errorTimeout = window.setTimeout(() => {
        setStatus("idle");
        setErrorMessage(null);
      }, 3000);

      return () => {
        window.clearTimeout(errorTimeout);
      };
    }
  }, [status]);

  const handleChange = (field: FieldKey, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status === "sent" || status === "error") {
      setStatus("idle");
      setErrorMessage(null);
    }
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched((prev) => ({
      ...prev,
      email: true,
      service: true,
    }));

    if (!canSend) return;

    setStatus("sending");
    setErrorMessage(null);

    try {
      // 🔥 Soumettre à Firebase + envoyer email
      await submitContactForm(formData);
      
      console.info("✅ Contact form submitted successfully", formData);
      setStatus("sent");
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : "Une erreur est survenue. Veuillez réessayer."
      );
    }
  };

  return (
    <section className="contact-page">
      {/* 🎨 Background bronze/blanc cassé */}
      <VemBackground />
      
      {/* ✨ Effet croix lumineuse */}
      <CursorEffect />

      <ContactHero />
      
      {/* Message d'erreur global */}
      {errorMessage && (
        <div style={{
          background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          borderRadius: "12px",
          padding: "16px",
          color: "#dc2626",
          marginBottom: "24px",
          textAlign: "center",
          position: "relative",
          zIndex: 10
        }}>
          {errorMessage}
        </div>
      )}

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