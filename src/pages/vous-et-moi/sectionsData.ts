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
      "J’évolue dans la tech avec une double spécialisation en Big Data et intelligence artificielle. Ce qui me motive vraiment, c’est de transformer une idée en projet concret et utile.",
      "J’aime comprendre rapidement un contexte, trouver des solutions et aller jusqu’au bout. Je souhaite construire des outils qui ont du sens, répondent à un vrai besoin et apportent une réelle valeur ajoutée.",
      "Curieux, polyvalent et orienté résultat, je progresse vite et je sais prendre mes responsabilités lorsque c’est nécessaire.",
      "Aujourd’hui, je développe mon expérience autour de l’IA, de l’automatisation et de la data, avec une ambition claire : concevoir des projets solides, durables et impactants."
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
      "L’IA est un accélérateur puissant, mais nous restons aux commandes. Je m’assure de comprendre en profondeur chaque structure, chaque logique et chaque choix technique afin de garder un contrôle total. Un dialogue constant entre vous et moi vous permet de piloter le projet en toute transparence.",
      "La pression ne me freine pas, elle me stimule. Je reste concentré sur l’essentiel : livrer un résultat solide, cohérent et abouti dans les délais fixés."
    ],
    image: "/images/photo_bureau_V2.jpg",
    layout: "b",
  },
  {
    id: "apporter",
    title: "Ce que je peux apporter",
    body: [
      "L’intelligence artificielle est aujourd’hui un enjeu stratégique majeur que chaque entreprise doit apprendre à maîtriser et exploiter à son plein potentiel pour gagner du temps, réduire les coûts et rester compétitive.",
      "Je peux contribuer à son intégration concrète : automatisation de processus, mise en place d’outils intelligents, optimisation des workflows et structuration d’usages pertinents selon les besoins métier.",
      "En parallèle, la gestion et l’exploitation des données représentent un enjeu tout aussi central. Structurer, organiser et rendre la donnée exploitable constitue un levier clé de performance et de prise de décision.",
      "J’interviens sur ces deux dimensions avec une approche pragmatique : transformer des enjeux technologiques en solutions opérationnelles, concrètes et mesurables."
    ],
    image: "/images/stylo_pc_lunette.JPG",
    layout: "c",
  },
];
