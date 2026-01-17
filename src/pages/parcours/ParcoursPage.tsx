import { useState } from "react";
import ParcoursCaps from "../../components/parcours/ParcoursCaps";
import { parcoursCaps } from "../../data/parcoursCaps";
import "../../styles/parcours.css";

export default function ParcoursPage() {
  const current = parcoursCaps.find((cap) => cap.isCurrent);
  const others = parcoursCaps.filter((cap) => !cap.isCurrent);
  const [openId, setOpenId] = useState<string | null>(current?.id ?? null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="section parcours-page">
      <h1>Parcours</h1>
      <p className="muted">
        Progression non linéaire: focus sur le niveau actuel, puis exploration des étapes clés.
      </p>

      {current && (
        <ParcoursCaps caps={[current]} openId={openId} onToggle={handleToggle} />
      )}

      <ParcoursCaps caps={others} openId={openId} onToggle={handleToggle} />
    </section>
  );
}
