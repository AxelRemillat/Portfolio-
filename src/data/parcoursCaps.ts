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
  floatDelay: string;     // Décalage animation flottante
  floatDuration: string;  // Durée animation flottante
  isCurrent?: boolean;
};

export const parcoursCaps: ParcoursCap[] = [
  {
    id: "current",
    label: "ESME",
    color: "#3ad5a7",
    period: "2024 — aujourd’hui",
    title: "Niveau actuel — BUT + montée en puissance produit",
    org: "ESME / projets personnels",
    summary:
      "Consolidation full-stack, focus UX premium et pilotage de projets avec une vision produit.",
    learned: [
      "Structurer des interfaces premium et claires",
      "Découper un MVP en sprints utiles",
      "Faire évoluer un produit à partir du feedback",
    ],
    skills: ["React", "TypeScript", "Design UI", "Produit"],
    highlights: [
      "Refonte portfolio premium orientée recruteurs",
      "Déploiement continu sur projets React",
    ],
    floatDelay: "0s",
    floatDuration: "6.4s",
    isCurrent: true,
  },
  {
    id: "mobility",
    label: "RISE",
    color: "#4aa3ff",
    period: "2023 — 2024",
    title: "Projet mobilité internationale",
    org: "RISE",
    summary:
      "Conception d’un parcours étudiant guidé avec données centralisées pour fluidifier la mobilité.",
    learned: [
      "Identifier les irritants d’un parcours utilisateur",
      "Modéliser un workflow de bout en bout",
      "Travailler avec des parties prenantes multiples",
    ],
    skills: ["React", "Firebase", "UX", "Produit"],
    highlights: ["Prototype fonctionnel", "Parcours guidé"],
    floatDelay: "0.4s",
    floatDuration: "6.8s",
  },
  {
    id: "automation",
    label: "N8N",
    color: "#8b5cf6",
    period: "2022 — 2023",
    title: "Automatisation & IA",
    org: "n8n / workflows",
    summary:
      "Mise en place d’automatisations pour réduire la charge manuelle et fiabiliser les process.",
    learned: [
      "Cartographier un process métier",
      "Créer des triggers robustes",
      "Mesurer l’impact opérationnel",
    ],
    skills: ["Automation", "n8n", "Ops"],
    highlights: ["Dashboards d’exécution", "Alerting"],
    floatDelay: "0.2s",
    floatDuration: "7.2s",
  },
  {
    id: "internships",
    label: "Stages",
    color: "#f59e0b",
    period: "2021 — 2022",
    title: "Stages & projets terrain",
    org: "Missions courtes",
    summary:
      "Premières livraisons produit, découverte du travail en équipe et de la rigueur terrain.",
    learned: [
      "Comprendre des besoins opérationnels",
      "Itérer vite avec les utilisateurs",
      "Documenter des livrables clairs",
    ],
    skills: ["Méthode", "Coordination", "UI"],
    highlights: ["Retours utilisateurs", "Projets encadrés"],
    floatDelay: "0.6s",
    floatDuration: "6.6s",
  },
  {
    id: "bac",
    label: "BAC",
    color: "#f472b6",
    period: "2020 — 2021",
    title: "Socle scientifique",
    org: "Bac général",
    summary:
      "Base analytique solide et premiers projets numériques orientés curiosité.",
    learned: ["Méthode scientifique", "Esprit logique", "Travail en autonomie"],
    skills: ["Sciences", "Maths", "Rigueur"],
    highlights: ["Projet numérique", "Ouverture technologique"],
    floatDelay: "0.1s",
    floatDuration: "7s",
  },
];
