export type SkillSlice = {
  id: string;
  label: string;
  value: number;
  color: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  summary: string;
  bullets: string[];
  tools: string[];
  proofs: { label: string; href: string }[];
};

export const skillSlices: SkillSlice[] = [
  {
    id: "frontend-react",
    label: "Frontend (React)",
    value: 28,
    color: "#60a5fa",
    level: "Intermédiaire",
    summary: "Interfaces propres et efficaces (React/TS/CSS), accélérées avec l’IA.",
    bullets: [
      "Intégration UI, composants réutilisables, état et routing",
      "CSS moderne + attention lisibilité et hiérarchie",
      "Workflow de dev rapide (VS Code, GitHub, IA assistée)",
    ],
    tools: ["React", "TypeScript", "CSS", "VS Code", "GitHub"],
    proofs: [{ label: "Voir mes projets", href: "/projects" }],
  },

  {
    id: "data-ml",
    label: "Big Data & Machine Learning",
    value: 24,
    color: "#a78bfa",
    level: "Intermédiaire",
    summary: "Socle académique Big Data/IA : data mining, ML/DL, recommandation, analyse réseaux.",
    bullets: [
      "Data Mining + bases ML/DL (concepts, pipeline, évaluation)",
      "NoSQL, systèmes de recommandation, analyse réseaux sociaux",
      "Approche : transformer un besoin en solution exploitable",
    ],
    tools: ["Python", "Pandas", "NumPy", "Notions ML/DL", "NoSQL"],
    proofs: [{ label: "Parcours (ESME)", href: "/parcours" }],
  },

  {
    id: "product-startup",
    label: "Produit & Startup",
    value: 20,
    color: "#14b8a6",
    level: "Avancé",
    summary: "Vision produit + exécution : besoin → MVP → itérations → pitch & concours (RISE).",
    bullets: [
      "Structurer un produit : problème, cible, proposition de valeur",
      "MVP, priorisation, feedback, itérations rapides",
      "Pitch, communication, coordination et leadership",
    ],
    tools: ["Notion", "Figma", "Canva", "Agile", "Git"],
    proofs: [{ label: "Projet RISE", href: "/projects" }],
  },

  {
    id: "automation-ai",
    label: "Automatisation & Agents IA",
    value: 12,
    color: "#f97316",
    level: "Intermédiaire",
    summary: "Automatiser des tâches et prototyper vite (N8N + IA) pour gagner du temps.",
    bullets: [
      "Workflows N8N : orchestration, intégrations, déclencheurs",
      "IA assistée : prototypage, scripts, structuration de solutions",
      "Objectif : automatisations utiles, stables, réutilisables",
    ],
    tools: ["n8n", "ChatGPT", "Gemini", "Claude", "Zapier (notions)"],
    proofs: [{ label: "Projet N8N", href: "/projects" }],
  },

  {
    id: "backend-firebase",
    label: "Backend & Firebase",
    value: 10,
    color: "#22c55e",
    level: "Débutant",
    summary: "Bases back : Firebase + premiers flux de données, logique API et persistance.",
    bullets: [
      "Auth, Firestore/NoSQL (usage simple), règles & structure",
      "Logique backend : endpoints/flows (bases)",
      "Approche pragmatique : faire fonctionner, puis améliorer",
    ],
    tools: ["Firebase", "Firestore", "Google Cloud (bases)", "REST (bases)"],
    proofs: [{ label: "Voir mes projets", href: "/projects" }],
  },

  {
    id: "cloud-devops",
    label: "Cloud / DevOps",
    value: 6,
    color: "#eab308",
    level: "Débutant",
    summary: "Notions en cours : déploiement, infra, bonnes pratiques (à renforcer).",
    bullets: [
      "Compréhension globale (hébergement, permissions, environnements)",
      "Déploiement simple et gestion projet via GitHub",
      "Prochain axe : industrialiser (CI/CD, monitoring) progressivement",
    ],
    tools: ["GitHub", "GCP (bases)", "Docker (notions)", "CI/CD (notions)"],
    proofs: [{ label: "Projets & déploiements", href: "/projects" }],
  },
];

export default skillSlices;