export type ParcoursCap = {
  id: string;
  period: string;
  title: string;
  org: string;
  summary: string;
  learned: string[];
  skills: string[];
  highlights: string[];
  isCurrent?: boolean;
};

export const parcoursCaps: ParcoursCap[] = [
  {
    id: "current",
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
    isCurrent: true,
  },
  {
    id: "mobility",
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
  },
  {
    id: "automation",
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
  },
  {
    id: "foundation",
    period: "2021 — 2022",
    title: "Socle technique & design",
    org: "Formation & projets courts",
    summary:
      "Apprentissage des fondamentaux web et premières interfaces orientées expérience.",
    learned: ["Bases UI solides", "Approche mobile-first", "Tests rapides"],
    skills: ["HTML", "CSS", "JavaScript"],
    highlights: ["Mini projets UI", "Bases front-end"],
  },
];
