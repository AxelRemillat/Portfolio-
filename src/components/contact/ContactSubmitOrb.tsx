type ContactSubmitOrbProps = {
  status: "idle" | "sending" | "sent";
  disabled?: boolean;
};

const labels: Record<ContactSubmitOrbProps["status"], string> = {
  idle: "Send it!",
  sending: "Sending...",
  sent: "Sent!",
};

export default function ContactSubmitOrb({ status, disabled = false }: ContactSubmitOrbProps) {
  return (
    <button
      className={`contact-orb ${status === "sent" ? "is-sent" : ""}`}
      type="submit"
      form="contact-form"
      disabled={disabled}
    >
      <span>{labels[status]}</span>
    </button>
  );
}
