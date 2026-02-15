type ContactSubmitOrbProps = {
  status: "idle" | "sending" | "sent";
  disabled?: boolean;
};

const labels: Record<ContactSubmitOrbProps["status"], string> = {
  idle: "Send it",
  sending: "Sending",
  sent: "Sent!",
};

export default function ContactSubmitOrb({
  status,
  disabled = false,
}: ContactSubmitOrbProps) {
  return (
    <button
      className={`contact-orb ${status === "sent" ? "is-sent" : ""}`}
      type="submit"
      form="contact-form"
      disabled={disabled}
    >
      {/* Reflet métallique */}
      <div className="contact-orb-shine" />
      
      {/* Particules dorées */}
      <div className="contact-orb-particles" />
      
      {/* Texte avec gradient */}
      <span>{labels[status]}</span>
    </button>
  );
}