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
    title: "RISE",
    subtitle: "Plateforme de mobilité internationale.",
    description: "Plateforme web dédiée à la mobilité internationale des étudiants.",
    details:
      "RISE centralise l’ensemble du parcours de mobilité internationale : candidatures, suivi administratif, accompagnement étudiant et pilotage par les équipes pédagogiques. L’objectif est de simplifier les démarches, fiabiliser les données et améliorer l’expérience globale.",
    tags: ["React", "Firebase", "Startup", "Produit"],
    value:
      "Améliore concrètement l’expérience étudiante et la gestion administrative grâce à une plateforme unifiée.",
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
    id: "automation",
    title: "Automatisation IA avec n8n",
    subtitle: "Ops & productivité augmentée.",
    description: "Workflows intelligents pour automatiser les tâches répétitives.",
    details:
      "Mise en place de scénarios d’automatisation avec n8n : déclencheurs, synchronisation de données, enrichissement via IA, alertes intelligentes et reporting. Objectif : gagner du temps et fiabiliser les processus métiers.",
    tags: ["Automation", "IA", "n8n", "Ops"],
    value:
      "Réduit fortement les tâches manuelles et améliore la fiabilité des flux de données.",
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
  },
];
