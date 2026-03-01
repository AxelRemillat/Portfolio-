export type ParcoursCap = {
  id: string;
  label: string;          // Texte dans la bulle (RISE, BAC, etc.)
  color: string;          // Couleur principale de la bulle
  period: string;
  title: string;
  org: string;
  summary: string;
  learned: string[];
  skills: string[];
  highlights: string[];
  badge?: string;         // Ex: "En cours", "Réalisé", "Obtenu"
  floatDelay: string;     // Décalage animation flottante
  floatDuration: string;  // Durée animation flottante
  isCurrent?: boolean;
};

export const parcoursCaps: ParcoursCap[] = [
  {
    id: "current",
    label: "ESME",
    color: "#3ad5a7",
    period: "2024 — Aujourd'hui",
    title: "Cycle ingénieur — Spécialisation Big Data & IA",
    org: "ESME (Lyon → Mapúa Manille → Paris/Ivry)",
    summary:
      "Spécialisation Big Data : Data Mining, ML/DL, Cloud, NoSQL, recommandation + vision produit.",
    learned: [
      "Data Mining + bases solides ML/DL (pipeline, évaluation)",
      "NoSQL, recommandation, analyse de réseaux sociaux",
      "Services web & notions cloud (approche système)",
      "Vision business/produit via e-marketing, distribution, merchandising",
    ],
    skills: [
      "Data Mining",
      "Machine Learning",
      "Deep Learning",
      "NoSQL",
      "Recommandation",
      "Cloud (bases)",
      "Réseaux sociaux",
      "E-Marketing",
    ],
    highlights: [
      "3 ans à Lyon, puis 4e/5e année à Paris/Ivry",
      "Semestre international à Mapúa University (Manille)",
      "Autoformation continue : IA appliquée, automatisation, data",
    ],
    badge: "En cours",
    floatDelay: "0s",
    floatDuration: "6.4s",
    isCurrent: true,
  },
  {
    id: "mobility",
    label: "RISE",
    color: "#4aa3ff",
    period: "2023 — Aujourd'hui",
    title: "Cofondateur — RISE",
    org: "Startup / Projet entrepreneurial",
    summary:
      "Plateforme pour aider les étudiants à choisir leur destination internationale (modèle B2B universités + comptes étudiants).",
    learned: [
      "Transformer une idée en produit : besoin → MVP → itérations",
      "Pitch, communication, concours, coordination",
      "Structurer un business model + stratégie d'acquisition",
      "Juridique / statut asso / protection de l'idée",
    ],
    skills: [
      "Produit",
      "Entrepreneuriat",
      "Leadership",
      "Pitch",
      "Gestion de projet",
      "Business model",
      "Go-to-market",
    ],
    highlights: [
      "1er : Calendrier de l'Avent ESME",
      "1er : Concours IONIS Innovation",
      "2e : Galets du Rhône",
      "Bêta en cours + négociations BRI/universités pour données",
      "Objectif : intégration incubateur",
    ],
    badge: "En cours",
    floatDelay: "0.4s",
    floatDuration: "6.8s",
  },
  {
    id: "automation",
    label: "N8N",
    color: "#8b5cf6",
    period: "2025 — Aujourd'hui",
    title: "Automatisation & Agents IA (N8N)",
    org: "Projets personnels",
    summary:
      "Workflows et automatisations pour gagner du temps, fiabiliser des process, tester des agents IA.",
    learned: [
      "Construire des workflows : triggers → actions → contrôle qualité",
      "Intégrations d'outils (APIs, webhooks, services)",
      "Prototypage rapide assisté par IA",
      "Approche « produit » : utile, stable, réutilisable",
    ],
    skills: ["n8n", "Automatisation", "Webhooks", "API (bases)", "Agents IA", "Prototypage"],
    highlights: [
      "Exploration de cas d'usage entreprise (gain de temps / process)",
      "Montée en compétence sur orchestration + intégrations",
      "Objectif : automatisations packagées et réutilisables",
    ],
    badge: "En cours",
    floatDelay: "0.2s",
    floatDuration: "7.2s",
  },
  {
    id: "internships",
    label: "STAGES",
    color: "#f59e0b",
    period: "2023 — 2024",
    title: "Stages industriels (1 mois + 1 mois)",
    org: "INOVALP (poêles) + ROSI ALPES (photovoltaïque)",
    summary:
      "Expérience terrain : comprendre vite, proposer simple, améliorer l'existant.",
    learned: [
      "Analyse terrain : contraintes réelles + besoins métiers",
      "Optimisation et amélioration continue",
      "Automatiser / fiabiliser des flux internes",
      "Communication claire avec équipes techniques/non-tech",
    ],
    skills: ["Analyse", "Optimisation", "Automatisation", "Développement", "Méthodologie", "Pragmatisme"],
    highlights: [
      "ROSI : outils de suivi/stock + automatisation de flux internes",
      "INOVALP : analyse process + support technique performance",
      "Approche orientée efficacité et résultats",
    ],
    badge: "Réalisé",
    floatDelay: "0.6s",
    floatDuration: "6.6s",
  },
  {
    id: "bac",
    label: "BAC",
    color: "#f472b6",
    period: "2021",
    title: "Baccalauréat général — Mention Bien",
    org: "Lycée général de la Matheysine",
    summary: "Socle scientifique solide, logique d'analyse et rigueur.",
    learned: [
      "Raisonnement scientifique et logique",
      "Méthode de travail + constance",
      "Bases maths/physique utiles pour la suite",
    ],
    skills: ["Rigueur", "Curiosité", "Analyse", "Bases scientifiques"],
    highlights: [
      "Spécialités : Maths, Physique-Chimie, SVT",
      "Base solide pour le parcours ingénieur",
    ],
    badge: "Obtenu",
    floatDelay: "0.1s",
    floatDuration: "7s",
  },
];
