import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export type ContactFormData = {
  name: string;
  email: string;
  organization: string;
  service: string;
  message: string;
};

/**
 * Soumet le formulaire de contact à Firestore
 * et envoie un email de notification
 */
export async function submitContactForm(data: ContactFormData): Promise<void> {
  try {
    // 1. Enregistrer dans Firestore
    const docRef = await addDoc(collection(db, "contact_submissions"), {
      name: data.name,
      email: data.email,
      organization: data.organization,
      service: data.service,
      message: data.message,
      timestamp: serverTimestamp(),
      status: "new"
    });

    console.log("✅ Contact submission saved with ID:", docRef.id);

    // 2. Envoyer l'email de notification
    await sendEmailNotification(data);

  } catch (error) {
    console.error("❌ Error submitting contact form:", error);
    throw new Error("Erreur lors de l'envoi du formulaire. Veuillez réessayer.");
  }
}

/**
 * Envoie un email de notification à axelremillat@netcourrier.com
 */
async function sendEmailNotification(data: ContactFormData): Promise<void> {
  try {
    // Utilise l'API Web3Forms (gratuit, simple, pas besoin de backend)
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: "487f3417-867c-4522-98ca-b1d37c97dba9", 
        subject: `Nouveau message de ${data.name} - Portfolio`,
        from_name: data.name,
        email: data.email,
        message: `
Nouveau message de contact depuis le portfolio

Nom: ${data.name}
Email: ${data.email}
Organisation: ${data.organization || "Non renseigné"}
Service: ${data.service}

Message:
${data.message || "Aucun message"}
        `.trim(),
        to: "axelremillat@netcourrier.com"
      }),
    });

    if (!response.ok) {
      console.warn("⚠️ Email notification failed, but form was saved to Firestore");
    } else {
      console.log("✅ Email notification sent successfully");
    }
  } catch (error) {
    console.error("❌ Error sending email:", error);
    // On ne throw pas l'erreur car le formulaire est déjà sauvegardé dans Firestore
  }
}