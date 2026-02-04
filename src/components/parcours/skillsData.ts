export type SkillSlice = {
  id: string;
  label: string;
  value: number;
  color: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  summary: string;
  bullets: string[];
  tools: string[];
  proofs: { label: string; href: string }[];
};

export const skillSlices: SkillSlice[] = [
  {
    id: "data-engineering",
    label: "Data Engineering",
    value: 25,
    color: "#22c55e",
    level: "Avancé",
    summary: "Pipelines fiables, données propres, perf SQL et modèles robustes.",
    bullets: [
      "ETL/ELT, ingestion, qualité & validation",
      "SQL avancé, modélisation, optimisation",
      "Structuration des datasets pour analytics/ML",
    ],
    tools: ["Python", "SQL", "Airflow", "dbt", "PostgreSQL"],
    proofs: [{ label: "Projets liés", href: "/projects" }],
  },
  {
    id: "ml-ai",
    label: "Machine Learning & IA",
    value: 22,
    color: "#60a5fa",
    level: "Avancé",
    summary: "Modèles utiles, évaluation propre, focus impact produit.",
    bullets: [
      "Supervisé, métriques, validation",
      "Feature engineering, interprétabilité",
      "NLP/vision (si projets) + démonstrations",
    ],
    tools: ["Python", "scikit-learn", "PyTorch", "Pandas", "NumPy"],
    proofs: [{ label: "Projets IA", href: "/projects" }],
  },
  {
    id: "mlops",
    label: "MLOps",
    value: 18,
    color: "#f97316",
    level: "Intermédiaire",
    summary: "Industrialisation : versionning, déploiement, monitoring.",
    bullets: [
      "Packaging + API (serve/batch)",
      "CI/CD, tests, traçabilité",
      "Monitoring basique & drift (si applicable)",
    ],
    tools: ["Docker", "FastAPI", "GitHub Actions", "MLflow"],
    proofs: [{ label: "Déploiements", href: "/projects" }],
  },
  {
    id: "cloud-archi",
    label: "Cloud & Archi Data",
    value: 15,
    color: "#a78bfa",
    level: "Intermédiaire",
    summary: "Compréhension système : stockage, IAM, architectures data.",
    bullets: [
      "Stockage, permissions, bonnes pratiques",
      "Archi lake/warehouse (selon projets)",
      "Notions stream/event (si utilisées)",
    ],
    tools: ["GCP/AWS", "BigQuery/S3", "Terraform (si)", "Docker"],
    proofs: [{ label: "Architecture", href: "/projects" }],
  },
  {
    id: "analytics-bi",
    label: "Analytics / BI",
    value: 12,
    color: "#eab308",
    level: "Intermédiaire",
    summary: "KPI, dataviz, storytelling orienté décision.",
    bullets: [
      "Exploration, insights, segmentation",
      "Dashboards, KPI, reporting",
      "Data viz lisible (produit / business)",
    ],
    tools: ["Power BI", "Tableau", "Matplotlib", "Excel"],
    proofs: [{ label: "Dashboards", href: "/projects" }],
  },
  {
    id: "product-startup",
    label: "Produit & Startup",
    value: 8,
    color: "#14b8a6",
    level: "Intermédiaire",
    summary: "Autonomie, itération rapide, communication claire.",
    bullets: [
      "Priorisation, scope MVP, itération",
      "Collaboration, feedback, clarté",
      "Sens produit : impact + vitesse + qualité",
    ],
    tools: ["Notion", "Figma", "Git", "Agile"],
    proofs: [{ label: "Vous & moi", href: "/vous-et-moi" }],
  },
];

export default skillSlices;
