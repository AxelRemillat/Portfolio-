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
      "Des produits web sobres, lisibles et orientés impact:",
      "interfaces claires, parcours efficaces et expériences premium",
      "pensées pour les utilisateurs finaux.",
    ],
    image: "/images/vous-et-moi-1.svg",
    layout: "a",
  },
  {
    id: "travailler",
    title: "Ma façon de travailler",
    body: [
      "J’avance par itérations rapides, en restant proche des besoins métier.",
      "J’aime clarifier les priorités, prototyper vite et livrer des",
      "fonctionnalités qui créent de la valeur.",
    ],
    image: "/images/vous-et-moi-2.svg",
    layout: "b",
  },
  {
    id: "apporter",
    title: "Ce que je peux apporter",
    body: [
      "Une combinaison de rigueur technique et de sens produit:",
      "autonomie, vision claire des parcours utilisateurs et capacité",
      "à transformer une idée en produit utilisable.",
    ],
    image: "/images/vous-et-moi-3.svg",
    layout: "c",
  },
];
