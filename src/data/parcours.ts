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
    year: "2027 (prévision)",
    title: "Diplôme ingénieur généraliste",
    place: "ESME, Campus de Lyon Auvergne Rhône-Alpes",
    summary: "Parcours d’ingénieur généraliste orienté innovation.",
    details: [
      "Consolidation des bases scientifiques et techniques avec des projets appliqués.",
      "Approche multidisciplinaire centrée sur la résolution de problèmes concrets.",
    ],
    skills: ["Gestion de projet", "Rigueur scientifique", "Collaboration"],
    images: [
      { src: "/parcours/esme.jpg", alt: "Campus ESME Lyon" },
    ],
  },
  {
    id: "esme-2024",
    year: "2024–2025",
    title: "Cycle ingénieur 1ère année",
    place: "ESME Lyon",
    summary: "Formation pluridisciplinaire en sciences et ingénierie.",
    details: [
      "Mise en pratique via projets techniques et ateliers d’innovation.",
      "Approfondissement des méthodologies d’analyse et de conception.",
    ],
    skills: ["Analyse", "Prototypage", "Communication"],
    images: [
      { src: "/parcours/innovation.jpg", alt: "Atelier innovation" },
    ],
  },
  {
    id: "prep-2022",
    year: "2022–2024",
    title: "Classe préparatoire intégrée",
    place: "ESME Lyon",
    summary: "Fondamentaux scientifiques et projets techniques.",
    details: [
      "Renforcement en mathématiques, physique et informatique.",
      "Premiers projets d’ingénierie en équipe avec livrables cadrés.",
    ],
    skills: ["Esprit d’équipe", "Méthode", "Résolution de problèmes"],
  },
  {
    id: "advance-2021",
    year: "2021–2022",
    title: "Admission Concours ADVANCE",
    place: "ESME, IPSA, SUPBIOTECH, EPITA",
    summary: "Concours d’entrée aux écoles du groupe IONIS.",
    details: [
      "Sélection sur dossier et épreuves d’admission.",
      "Validation d’un parcours scientifique exigeant.",
    ],
    skills: ["Organisation", "Persévérance", "Autonomie"],
  },
  {
    id: "bac-2021",
    year: "2021–2022",
    title: "Baccalauréat général mention bien",
    place: "Lycée de la Tour du Pin",
    summary: "Spécialités Maths, Physique/Chimie, SVT.",
    details: [
      "Approche scientifique solide et ouverture aux matières transverses.",
    ],
    skills: ["Curiosité", "Bases scientifiques", "Rigueur"],
  },
  {
    id: "rise-2025",
    year: "2025",
    title: "Cofondateur — RISE",
    place: "Projet startup",
    summary: "Plateforme de mobilité internationale étudiants.",
    details: [
      "Projet lauréat Calendrier de l’Avent 2024 ESME.",
      "Sélection Concours IONIS INNOVATION 2025.",
      "Conception produit, validation des besoins, MVP et itérations.",
    ],
    skills: ["Produit", "Entrepreneuriat", "Leadership"],
    images: [
      { src: "/parcours/rise.jpg", alt: "Projet RISE" },
    ],
  },
  {
    id: "rosi-2024",
    year: "2024",
    title: "Stage — ROSI ALPES (1 mois)",
    place: "Industrie photovoltaïque",
    summary: "Développement logiciel pour gestion des stocks.",
    details: [
      "Amélioration des outils de suivi et valorisation des matériaux.",
      "Automatisation de flux de données internes.",
    ],
    skills: ["Développement logiciel", "Automatisation", "Logistique"],
    images: [
      { src: "/parcours/rosi.jpg", alt: "Site industriel ROSI ALPES" },
    ],
  },
  {
    id: "inovalp-2023",
    year: "2023",
    title: "Stage — INOVALP (1 mois)",
    place: "Industrie poêles à granulés",
    summary: "Optimisation logicielle & mécanique.",
    details: [
      "Analyse des processus et propositions d’amélioration.",
      "Support technique pour la performance des équipements.",
    ],
    skills: ["Optimisation", "Analyse terrain", "Méthodologie"],
    images: [
      { src: "/parcours/inovalp.jpg", alt: "Atelier INOVALP" },
    ],
  },
  {
    id: "cnrs-2018",
    year: "2018/2019",
    title: "Stages courts — LPSC/LPNC (CNRS)",
    place: "Grenoble",
    summary: "Découverte laboratoire et recherche.",
    details: [
      "Physique subatomique, cosmologie et neurocognition.",
      "Découverte des méthodes de recherche en équipe.",
    ],
    skills: ["Recherche", "Curiosité scientifique", "Observation"],
    images: [
      { src: "/parcours/cnrs.jpg", alt: "Laboratoire CNRS Grenoble" },
    ],
  },
];
