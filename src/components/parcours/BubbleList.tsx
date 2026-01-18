import type { ParcoursCap } from "../../data/parcoursCaps";
import ParcoursBubble from "./ParcoursBubble";

type BubbleListProps = {
  caps: ParcoursCap[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDragHover: (isOver: boolean) => void;
  onDrop: (id: string, didDrop: boolean) => void;
  getDropRect: () => DOMRect | null;
};

type OffsetVars = React.CSSProperties & {
  ["--stack-offset-x"]?: string;
  ["--stack-offset-y"]?: string;
};

export default function BubbleList({
  caps,
  selectedId,
  onSelect,
  onDragHover,
  onDrop,
  getDropRect,
}: BubbleListProps) {
  return (
    <div className="parcours-bubble-list" role="list">
      {caps.map((cap, index) => {
        /**
         * Objectif : casser l’alignement parfait, sans “random” instable.
         * Pattern: alternance gauche/droite + micro-variations selon l’index.
         * (Le drag continue de fonctionner car on n’altère pas la logique pointer,
         * juste la position visuelle via variables CSS.)
         */
        const sign = index % 2 === 0 ? -1 : 1;

        // offsets doux (évite de décaler trop)
        const x = sign * (10 + (index % 3) * 6); // -10/-16/-22 puis +10/+16/+22
        const y = (index % 4) * 2; // 0/2/4/6

        const style: OffsetVars = {
          "--stack-offset-x": `${x}px`,
          "--stack-offset-y": `${y}px`,
        };

        return (
          <div key={cap.id} role="listitem" style={style}>
            <ParcoursBubble
              cap={cap}
              isSelected={cap.id === selectedId}
              onSelect={onSelect}
              onDragHover={onDragHover}
              onDrop={onDrop}
              getDropRect={getDropRect}
            />
          </div>
        );
      })}
    </div>
  );
}
