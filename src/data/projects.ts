export type Project = {
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    title: "RISE (projet principal)",
    description: "Application React + Firebase (auth, base de données, etc.).",
    tags: ["React", "Firebase", "Auth"],
    repoUrl: "https://github.com/TON_USER/RISE",
  },
  {
    title: "Portfolio (celui-ci)",
    description: "CV en ligne responsive, propre et partageable.",
    tags: ["React", "Vite", "UI"],
    repoUrl: "https://github.com/TON_USER/portfolio",
  },
];
