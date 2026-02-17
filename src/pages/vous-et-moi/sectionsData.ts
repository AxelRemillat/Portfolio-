export type SectionLayout = "a" | "b" | "c";

export type SectionData = {
  id: string;
  title: string;
  body: string[];
  image: string;
  layout: SectionLayout;
};

export const sectionsData: SectionData[] = [
  {
    id: "construis",
    title: "Ce que je construis",
    body: [
      "Je m’appelle Axel.",
      "J’évolue dans la tech avec une spécialisation en Big Data et intelligence artificielle, mais ce qui me motive vraiment, c’est de transformer une idée en projet concret et utile.",
      "J’aime comprendre rapidement un contexte, structurer une solution et aller jusqu’au bout. J’ai besoin que ce que je construis ait du sens, réponde à un vrai besoin et apporte une vraie valeur.",
      "Curieux, polyvalent et orienté résultat, je progresse vite et je prends mes responsabilités quand il faut faire avancer un projet.",
      "Aujourd’hui, je construis mon expérience autour de l’IA, de l’automatisation et de la data, avec une ambition claire : développer des projets solides, durables et impactants."
    ],
    image: "/images/photo_1_Vous_et_Moi.webp",
    layout: "a",
  },
  {
    id: "travailler",
    title: "Ma façon de travailler",
    body: [
      "J’aborde un projet avec une méthode claire : comprendre rapidement, structurer précisément et exécuter efficacement.",
      "J’analyse la faisabilité et les enjeux concrets dès le départ, puis j’avance par cycles courts et maîtrisés. Mon objectif n’est pas d’ajouter de la complexité, mais de construire des solutions fonctionnelles, robustes et évolutives.",
      "L’IA est un accélérateur puissant, mais je reste aux commandes. Je m’assure de comprendre en profondeur chaque structure, chaque logique et chaque choix technique afin de garder un contrôle total sur le projet.",
      "La pression ne me freine pas, elle me canalise. Je reste concentré sur l’essentiel : livrer un résultat solide, cohérent et abouti dans les délais fixés."
    ],
    image: "/images/photo_bureau_V2.jpg",
    layout: "b",
  },
  {
    id: "apporter",
    title: "Ce que je peux apporter",
    body: [
      "L’intelligence artificielle est aujourd’hui un enjeu stratégique majeur que chaque entreprise doit apprendre à maîtriser et exploiter à son plein potentiel.",
      "Je peux contribuer à son intégration concrète : automatisation de processus, mise en place d’outils intelligents, optimisation des workflows et structuration d’usages pertinents selon les besoins métier.",
      "En parallèle, la gestion et l’exploitation des données représentent un enjeu tout aussi central. Structurer, organiser et rendre la donnée exploitable est un levier clé de performance et de prise de décision.",
      "J’interviens sur ces deux dimensions avec une approche pragmatique : transformer des enjeux technologiques en solutions opérationnelles et concrètes."
    ],
    image: "/images/stylo_pc_lunette.JPG",
    layout: "c",
  },
];
