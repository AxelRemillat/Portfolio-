import Hero from "../components/Hero";
import ProjectsCarousel3D from "../components/ProjectsCarousel3D";
import Skills from "../components/Skills";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <div className="page-stack">
      <Hero />
      <ProjectsCarousel3D projects={projects} />
      <Skills />
    </div>
  );
}
