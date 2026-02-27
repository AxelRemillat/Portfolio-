export type ParcoursItem = {
  id: string;
  year: string;
  title: string;
  place: string;
  summary: string;
  details: string[];
  skills: string[];
  images?: { src: string; alt: string }[];
};

export const parcoursItems: ParcoursItem[] = [
  {
    id: "esme-2027",
    year: "2024 — Aujourd’hui",
    title: "Cycle ingénieur — Spécialisation Big Data & IA (4e année)",
    place: "ESME Paris — Lyon (3 ans) → Mapúa (Manille) → Ivry-sur-Seine",
    summary:
      "Spécialisation Big Data : Data Mining, ML/DL, Cloud, NoSQL, recommandation + e-marketing. En parallèle : autoformation IA, automatisation et traitement de données.",
    details: [
      "4e année en cours (début du 2e semestre) ; poursuite à Ivry-sur-Seine pour le 2e semestre et la 5e année.",
      "Semestre international à Mapúa University (Manille) durant le 1er semestre de 4e année.",
      "Majeure : Data Mining, Machine Learning & Deep Learning, Cloud, Services Web, NoSQL, Recommandation, Analyse des réseaux sociaux.",
      "Complément : E-Marketing, Distribution & Merchandising (vision business et produit).",
      "Autoformation continue : IA appliquée, automatisation, manipulation et structuration de données.",
    ],
    skills: [
      "Data Mining",
      "Machine Learning",
      "Deep Learning",
      "Cloud (bases)",
      "NoSQL",
      "Systèmes de recommandation",
      "Analyse réseaux sociaux",
      "E-Marketing",
      "Vision produit",
    ],
    images: [{ src: "/parcours/esme.jpg", alt: "ESME — parcours Big Data" }],
  },

  {
    id: "esme-2024",
    year: "2021 — 2024",
    title: "ESME — Tronc commun (3 premières années) — Campus Lyon",
    place: "ESME Lyon",
    summary:
      "3 ans à Lyon : consolidation des bases scientifiques + premières expériences projets. Montée progressive en autonomie et structuration de méthode de travail.",
    details: [
      "Fondamentaux scientifiques et techniques (maths/physique/info) + projets cadrés en équipe.",
      "Découverte et renforcement de la méthodologie : analyse, conception, livrables, itération.",
      "Début de montée en compétences web/outils et prise d’initiative sur des projets personnels.",
    ],
    skills: ["Rigueur", "Méthodologie", "Travail en équipe", "Analyse", "Autonomie"],
    images: [{ src: "/parcours/innovation.jpg", alt: "Projets ESME — Lyon" }],
  },

  {
    id: "prep-2022",
    year: "2022 — 2024",
    title: "Projets & bases scientifiques (continu)",
    place: "ESME Lyon",
    summary:
      "Période de consolidation : bases + projets d’ingénierie en équipe, avec recherche d’efficacité et de solutions concrètes.",
    details: [
      "Renforcement continu en maths/physique/info au travers d’exercices et projets.",
      "Travail en équipe : organisation, découpage des tâches, livrables, deadlines.",
      "Premiers réflexes de structuration : clarté, utilité, solution simple et efficace.",
    ],
    skills: ["Résolution de problèmes", "Organisation", "Travail en équipe"],
  },

  {
    id: "advance-2021",
    year: "2021",
    title: "Admission — Concours ADVANCE",
    place: "Groupe IONIS (ESME / EPITA / IPSA / SUPBIOTECH…)",
    summary: "Entrée en école d’ingénieur via concours.",
    details: [
      "Admission via concours et procédure de sélection.",
      "Point de départ du parcours ingénieur à l’ESME.",
    ],
    skills: ["Persévérance", "Organisation", "Autonomie"],
  },

  {
    id: "bac-2021",
    year: "2021",
    title: "Baccalauréat général — Mention Bien",
    place: "Lycée de la Tour du Pin",
    summary: "Spécialités : Maths, Physique-Chimie, SVT.",
    details: ["Socle scientifique solide et logique d’analyse."],
    skills: ["Rigueur", "Curiosité", "Bases scientifiques"],
  },

  {
    id: "rise-2025",
    year: "2023 — Aujourd’hui",
    title: "Cofondateur — RISE (startup)",
    place: "Projet entrepreneurial (ESME / IONIS)",
    summary:
      "Plateforme qui aide les étudiants à choisir leur destination internationale (témoignages, infos universités/pays, conseils). Modèle B2B : abonnement universités + comptes étudiants.",
    details: [
      "Création d’une startup de A à Z : idée → produit → juridique → communication → concours → mise en ligne bêta.",
      "Objectif principal : obtenir la collaboration et les données des BRI/universités partenaires (enjeu clé du produit).",
      "Concours gagnés : Calendrier de l’Avent ESME (1er), Concours IONIS Innovation (1er), Galets du Rhône (2e).",
      "Statut d’association, protection juridique / dépôt d’idée, bêta en cours de déploiement.",
      "Négociations en cours avec l’école pour l’accès aux données + insertion progressive dans l’incubateur.",
    ],
    skills: [
      "Produit",
      "Entrepreneuriat",
      "Pitch & communication",
      "Gestion de projet",
      "Leadership",
      "Business model",
    ],
    images: [{ src: "/parcours/rise.jpg", alt: "RISE — plateforme mobilité internationale" }],
  },

  {
    id: "n8n-2025",
    year: "2025 — En cours",
    title: "Automatisation & agents IA — N8N (projet en cours)",
    place: "Projets personnels",
    summary:
      "Exploration d’automatisation de tâches pour entreprises via workflows, intégrations et agents IA (objectif : gain de temps + process fiables).",
    details: [
      "Découverte et montée en compétences sur N8N pour orchestrer des workflows et automatisations.",
      "Utilisation d’IA généralistes (ChatGPT/Gemini/Claude) pour accélérer prototypage, scripts et intégrations.",
      "Objectif : construire des automatisations utiles, testées et réutilisables (logique ‘produit’).",
    ],
    skills: ["N8N", "Automatisation", "Agents IA", "Intégrations", "Prototypage rapide"],
    images: [{ src: "/parcours/n8n.jpg", alt: "Automatisation N8N" }],
  },

  {
    id: "rosi-2024",
    year: "2024 (1 mois)",
    title: "Stage — ROSI ALPES",
    place: "Industrie photovoltaïque",
    summary: "Développement logiciel : suivi/stock + automatisation de flux internes.",
    details: [
      "Amélioration d’outils de suivi et valorisation des matériaux.",
      "Automatisation de flux de données internes pour réduire le manuel.",
      "Approche terrain : compréhension du besoin + solution simple et efficace.",
    ],
    skills: ["Développement", "Automatisation", "Analyse terrain", "Rigueur"],
    images: [{ src: "/parcours/rosi.jpg", alt: "ROSI ALPES — photovoltaïque" }],
  },

  {
    id: "inovalp-2023",
    year: "2023 (1 mois)",
    title: "Stage — INOVALP",
    place: "Industrie poêles à granulés",
    summary: "Optimisation & support technique : analyse, amélioration, efficacité.",
    details: [
      "Analyse de processus et propositions d’amélioration.",
      "Support technique orienté performance des équipements.",
      "Découverte contraintes industrielles et pragmatisme d’exécution.",
    ],
    skills: ["Optimisation", "Analyse", "Méthodologie", "Pragmatisme"],
    images: [{ src: "/parcours/inovalp.jpg", alt: "INOVALP — atelier" }],
  },

  {
    id: "cnrs-2018",
    year: "2018 — 2019",
    title: "Stages courts — CNRS (LPSC/LPNC)",
    place: "Grenoble",
    summary: "Découverte laboratoire : recherche, observation, travail en équipe scientifique.",
    details: [
      "Découverte de domaines : physique subatomique, cosmologie, neurocognition.",
      "Première exposition à une démarche de recherche structurée.",
    ],
    skills: ["Curiosité scientifique", "Observation", "Esprit de recherche"],
    images: [{ src: "/parcours/cnrs.jpg", alt: "CNRS — Grenoble" }],
  },
];