export type ProjectStats = { value: string; label: string };
export type ProjectTimelineStep = { label: string; status: "done" | "current" | "next" };
export type ProjectStackItem = { category: string; value: string };

export type ProjectRichContent = {
  vision?: string;
  problem?: string[];
  solution?: { intro: string; items: string[]; objectives?: string[] };
  businessModel?: { description: string; items: string[]; beneficiaries?: string[] };
  traction?: string[];
  myRole?: { title: string; items: string[] };
  proofs?: string[];
  stack?: ProjectStackItem[];
  nextSteps?: string[];
  recruiterNote?: string;
};

export type Project = {
  id: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  description: string;
  details?: string;
  tags: string[];
  microProof?: string;
  value: string;
  stats?: ProjectStats[];
  timeline?: ProjectTimelineStep[];
  rich?: ProjectRichContent;
  coverImage?: string;
  images?: string[];
  videoUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    id: "rise",
    kicker: "Startup EdTech — Lauréate multi-concours",
    title: "RISE — Reach • Inspire • Study • Explore",
    subtitle: "Plateforme B2B dédiée à la mobilité internationale des étudiants.",
    description:
      "RISE centralise l'ensemble du parcours de mobilité internationale : candidatures, informations partenaires, témoignages étudiants et recommandations locales. Modèle B2B : les universités abonnent leurs étudiants à un accès privé et structuré aux données.",
    tags: ["React", "Firebase", "Startup", "Produit", "B2B", "EdTech"],
    microProof:
      "🏆 3 concours remportés — 4 fondateurs — 1 an et demi de développement — Bêta en cours",
    value:
      "Simplifie la mobilité internationale étudiante grâce à une plateforme B2B centralisée.",
    stats: [
      { value: "4", label: "cofondateurs" },
      { value: "3", label: "concours remportés" },
      { value: "400+", label: "projets battus" },
      { value: "4 500€", label: "dotations gagnées" },
      { value: "1 an ½", label: "de développement" },
    ],
    timeline: [
      { label: "Idée", status: "done" },
      { label: "MVP", status: "done" },
      { label: "Concours", status: "done" },
      { label: "Bêta", status: "current" },
      { label: "Incubateur", status: "next" },
    ],
    rich: {
      vision:
        "Chaque année, des milliers d'étudiants doivent choisir une destination internationale sans avoir accès à des informations fiables, structurées et personnalisées.\n\nRISE transforme ce processus complexe en une expérience claire, guidée et optimisée.",
      problem: [
        "Informations dispersées, témoignages difficiles à trouver",
        "Aucune centralisation privée propre à chaque université",
        "Peu de données fiables sur la vie locale (logement, coût, services)",
        "Les BRI manquent d'outils modernes pour piloter et accompagner efficacement leurs étudiants",
      ],
      solution: {
        intro:
          "RISE est une plateforme privée accessible uniquement aux étudiants d'universités partenaires.",
        items: [
          "Témoignages étudiants vérifiés",
          "Fiches universités partenaires",
          "Informations pays",
          "Conseils logement / services / vie locale",
          "Interface claire et structurée",
          "Un compte unique par étudiant",
        ],
        objectives: [
          "Simplifier les démarches",
          "Fiabiliser les données",
          "Améliorer l'expérience globale",
        ],
      },
      businessModel: {
        description:
          "Les universités souscrivent à un abonnement annuel pour un nombre défini de comptes étudiants.",
        items: ["Accès sécurisé", "Données centralisées", "Accompagnement optimisé"],
        beneficiaries: [
          "Les étudiants (meilleure décision)",
          "Les universités (meilleure gestion)",
          "Les équipes pédagogiques (meilleur pilotage)",
        ],
      },
      traction: [
        "🥇 1er — Concours ESME Calendrier de l'Avent",
        "🥇 1er — Concours IONIS (400+ candidatures)",
        "🥈 2e — Concours Galets du Rhône (Genève)",
        "💰 +4 500€ de dotations",
        "📣 Projet le plus avancé et prometteur de l'ESME",
        "📑 Statut officiel d'association",
        "🔒 Protection juridique déposée",
        "🚀 Bêta en cours de déploiement",
        "🏢 Intégration en cours à l'incubateur de l'école",
      ],
      myRole: {
        title: "Cofondateur (4 membres)",
        items: [
          "Conception produit (structure, fonctionnalités)",
          "Développement web (React / Firebase)",
          "Architecture base NoSQL",
          "Business model & stratégie",
          "Pitch & concours",
          "Négociation avec la direction & BRI",
          "Gestion de timeline & coordination équipe",
        ],
      },
      proofs: [
        "Transformer une idée en structure juridique réelle",
        "Construire un produit fonctionnel",
        "Présenter et vendre un projet à un jury",
        "Gérer une équipe et des deadlines",
        "Concevoir un modèle économique viable",
        "Négocier avec des institutions",
      ],
      stack: [
        { category: "Frontend", value: "React" },
        { category: "Backend", value: "Firebase" },
        { category: "BDD", value: "NoSQL" },
        { category: "Design", value: "Figma" },
        { category: "Marketing", value: "Canva" },
        { category: "Gestion", value: "GitHub" },
      ],
      nextSteps: [
        "Signature officielle avec universités partenaires",
        "Intégration incubateur",
        "Déploiement public élargi",
        "Structuration juridique avancée",
        "Acquisition utilisateurs",
      ],
      recruiterNote:
        "RISE prouve ma capacité à mener un projet tech complet : vision produit, exécution, communication et structuration stratégique. Je ne suis pas seulement développeur — je comprends la valeur business derrière la technologie.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "automation",
    kicker: "Ops & productivité augmentée",
    title: "Automatisation IA avec n8n",
    subtitle: "Workflows intelligents pour automatiser les tâches répétitives.",
    description:
      "Mise en place de scénarios d'automatisation avec n8n : déclencheurs, synchronisation de données, enrichissement via IA, alertes intelligentes et reporting. Objectif : gagner du temps et fiabiliser les processus métiers.",
    tags: ["Automation", "IA", "n8n", "Ops"],
    value: "Réduit fortement les tâches manuelles et améliore la fiabilité des flux de données.",
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
  },
];
