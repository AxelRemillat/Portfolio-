import "./App.css";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="page">
      <Hero />

      <main className="content">
        <Skills />
        <Projects />
        <Contact />
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} Ton Nom</small>
      </footer>
    </div>
  );
}
