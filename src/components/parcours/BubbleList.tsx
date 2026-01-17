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
      {caps.map((cap) => (
        <ParcoursBubble
          key={cap.id}
          cap={cap}
          isSelected={cap.id === selectedId}
          onSelect={onSelect}
          onDragHover={onDragHover}
          onDrop={onDrop}
          getDropRect={getDropRect}
        />
      ))}
    </div>
  );
}
