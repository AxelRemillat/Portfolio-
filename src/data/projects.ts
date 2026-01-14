export type Project = {
  title: string;
  description: string;
  tags: string[];
  value: string;
  repoUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    title: "RISE (projet principal)",
    description: "Plateforme mobilité internationale étudiants.",
    tags: ["React", "Firebase", "Produit", "Startup"],
    value: "Valorise l’expérience étudiante avec un parcours guidé et des données centralisées.",
    repoUrl: "https://github.com/TON_USER/RISE",
  },
  {
    title: "Portfolio (celui-ci)",
    description: "CV en ligne premium, clair et partageable.",
    tags: ["React", "Vite", "UI"],
    value: "Présente rapidement le profil et les projets clés.",
    repoUrl: "https://github.com/TON_USER/portfolio",
  },
  {
    title: "Automatisation IA avec n8n",
    description: "Workflows intelligents pour tâches répétitives.",
    tags: ["Automation", "IA", "n8n", "Ops"],
    value: "Automatise emails, triggers et synchronisation de données.",
  },
];
