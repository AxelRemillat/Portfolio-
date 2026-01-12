export type SkillGroup = {
  title: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["React", "TypeScript", "CSS", "Vite"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Firebase", "REST APIs"],
  },
  {
    title: "Tools",
    items: ["Git", "Figma", "VS Code"],
  },
];
