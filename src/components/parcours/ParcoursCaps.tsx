import type { ParcoursCap } from "../../data/parcoursCaps";
import ParcoursCapCard from "./ParcoursCapCard";

type ParcoursCapsProps = {
  caps: ParcoursCap[];
  openId: string | null;
  onToggle: (id: string) => void;
};

export default function ParcoursCaps({ caps, openId, onToggle }: ParcoursCapsProps) {
  return (
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
  );
}
