export type TimelineEntry = {
  year: string;
  title: string;
  place: string;
  description: string;
};

export const timeline: TimelineEntry[] = [
  {
    year: "2027 (prévision)",
    title: "Diplôme ingénieur généraliste",
    place: "ESME, Campus de Lyon Auvergne Rhône-Alpes",
    description: "Parcours ingénieur généraliste orienté innovation.",
  },
  {
    year: "2024–2025",
    title: "Cycle ingénieur 1ère année",
    place: "ESME Lyon",
    description: "Formation pluridisciplinaire en sciences et ingénierie.",
  },
  {
    year: "2022–2024",
    title: "Classe préparatoire intégrée",
    place: "ESME Lyon",
    description: "Fondamentaux scientifiques et projets techniques.",
  },
  {
    year: "2021–2022",
    title: "Admission Concours ADVANCE",
    place: "ESME, IPSA, SUPBIOTECH, EPITA",
    description: "Concours d’entrée aux écoles du groupe IONIS.",
  },
  {
    year: "2021–2022",
    title: "Baccalauréat général mention bien",
    place: "Lycée de la Tour du Pin",
    description: "Spécialités Maths, Physique/Chimie, SVT.",
  },
];
