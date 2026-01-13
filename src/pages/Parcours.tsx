import { timeline } from "../data/timeline";
import { experiences } from "../data/experience";

export default function Parcours() {
  return (
    <div className="page-stack">
      <section className="section">
        <h1>Parcours</h1>
        <p className="muted">
          Parcours académique synthétique, pensé pour une lecture rapide.
        </p>

        <div className="timeline">
          {timeline.map((item) => (
            <article key={`${item.year}-${item.title}`} className="card timeline-card">
              <div className="timeline-year">{item.year}</div>
              <div>
                <h3>{item.title}</h3>
                <p className="timeline-place">{item.place}</p>
                <p className="muted">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Expériences</h2>
        <p className="muted">Stages et projets entrepreneuriaux marquants.</p>

        <div className="timeline">
          {experiences.map((item) => (
            <article key={`${item.year}-${item.title}`} className="card timeline-card">
              <div className="timeline-year">{item.year}</div>
              <div>
                <h3>{item.title}</h3>
                <p className="muted">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
