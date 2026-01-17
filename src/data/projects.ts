export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  details?: string;
  tags: string[];
  value: string;
  coverImage?: string;
  images?: string[];
  videoUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    id: "rise",
    title: "RISE (projet principal)",
    subtitle: "Plateforme mobilité internationale.",
    description: "Plateforme mobilité internationale étudiants.",
    details:
      "RISE centralise la mobilité internationale: candidatures, suivi administratif et accompagnement étudiant. L'objectif est de fluidifier le parcours et d'offrir une vision claire aux équipes.",
    tags: ["React", "Firebase", "Produit", "Startup"],
    value: "Valorise l’expérience étudiante avec un parcours guidé et des données centralisées.",
    coverImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1200&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    repoUrl: "https://github.com/TON_USER/RISE",
  },
  {
    id: "portfolio",
    title: "Portfolio (celui-ci)",
    subtitle: "Identité digitale premium.",
    description: "CV en ligne premium, clair et partageable.",
    details:
      "Un site vitrine conçu pour recruteurs et décideurs, avec un focus sur la lisibilité, l'impact et la mise en avant des projets clés.",
    tags: ["React", "Vite", "UI"],
    value: "Présente rapidement le profil et les projets clés.",
    coverImage:
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    ],
    repoUrl: "https://github.com/TON_USER/portfolio",
  },
  {
    id: "automation",
    title: "Automatisation IA avec n8n",
    subtitle: "Ops & productivité augmentée.",
    description: "Workflows intelligents pour tâches répétitives.",
    details:
      "Automatisation de pipelines marketing et opérations avec n8n: triggers, enrichissement, reporting et alertes intelligentes.",
    tags: ["Automation", "IA", "n8n", "Ops"],
    value: "Automatise emails, triggers et synchronisation de données.",
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
  },
];
