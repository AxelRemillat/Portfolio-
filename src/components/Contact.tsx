export default function Contact() {
  return (
    <section id="contact" className="section">
      <h2>Contact</h2>
      <p className="muted">
        Tu peux me contacter directement ou via mes profils.
      </p>

      <div className="contactRow">
        <a className="link" href="mailto:tonmail@example.com">Email</a>
        <a className="link" href="https://linkedin.com/in/tonprofil" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="link" href="https://github.com/TON_USER" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </section>
  );
}
