import type { ParcoursCap } from "../../data/parcoursCaps";
import ParcoursBackground from "./ParcoursBackground";
import ParcoursCapCard from "./ParcoursCapCard";

type ParcoursCapsProps = {
  caps: ParcoursCap[];
  openId: string | null;
  onToggle: (id: string) => void;
};

export default function ParcoursCaps({
  caps,
  openId,
  onToggle,
}: ParcoursCapsProps) {
  return (
    <section className="parcours-wrap">
      {/* ✅ Fond animé Parcours (1 seule rappelle, derrière tout) */}
      <ParcoursBackground />

      {/* ✅ Contenu au-dessus */}
      <div className="parcours-caps">
        <div className="parcours-rail" aria-hidden="true" />
        <div className="parcours-caps-list">
          {caps.map((cap, index) => (
            <ParcoursCapCard
              key={cap.id}
              cap={cap}
              isOpen={openId === cap.id}
              align={index % 2 === 0 ? "left" : "right"}
              onToggle={onToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
