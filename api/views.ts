// Vercel serverless function — proxy compteur de vues (évite CORS côté client)
// Utilise counterapi.dev (gratuit, sans inscription)
const BASE = "https://api.counterapi.dev/v1/axelremillat/portfolio-views";

export default async function handler(
  req: { query: Record<string, string> },
  res: {
    setHeader: (k: string, v: string) => void;
    json: (d: unknown) => void;
    status: (n: number) => { json: (d: unknown) => void };
  }
) {
  res.setHeader("Cache-Control", "no-store, no-cache");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const url = req.query.hit === "1" ? `${BASE}/up` : BASE;

  try {
    const r = await fetch(url);
    const data = (await r.json()) as { count?: number };
    res.json({ count: typeof data.count === "number" ? data.count : null });
  } catch {
    res.status(500).json({ count: null });
  }
}
