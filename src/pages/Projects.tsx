import { useMemo, useState } from "react";
import Projects from "../components/Projects";
import { projects } from "../data/projects";

const ALL_TAG = "Tous";

export default function ProjectsPage() {
  const tags = useMemo(() => {
    const uniqueTags = new Set(projects.flatMap((project) => project.tags));
    return [ALL_TAG, ...Array.from(uniqueTags)];
  }, []);

  const [activeTag, setActiveTag] = useState(ALL_TAG);

  const filteredProjects =
    activeTag === ALL_TAG
      ? projects
      : projects.filter((project) => project.tags.includes(activeTag));

  return (
    <section className="section">
      <h1>Projets</h1>
      <p className="muted">
        Sélection de projets et initiatives à impact pour une lecture rapide.
      </p>

      <div className="filter-row">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={tag === activeTag ? "filter-btn active" : "filter-btn"}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <Projects projects={filteredProjects} />
    </section>
  );
}
