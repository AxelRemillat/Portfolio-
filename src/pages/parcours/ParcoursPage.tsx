import { useCallback, useMemo, useRef, useState } from "react";
import BubbleList from "../../components/parcours/BubbleList";
import DropScreen from "../../components/parcours/DropScreen";
import { parcoursCaps } from "../../data/parcoursCaps";
import "../../styles/parcours.css";

export default function ParcoursPage() {
  const current = useMemo(() => parcoursCaps.find((cap) => cap.isCurrent), []);

  const [selectedId, setSelectedId] = useState<string | null>(
    current?.id ?? parcoursCaps[0]?.id ?? null,
  );
  const [isDropActive, setIsDropActive] = useState(false);

  const dropRef = useRef<HTMLDivElement | null>(null);

  const selectedCap = useMemo(() => {
    return (
      parcoursCaps.find((cap) => cap.id === selectedId) ??
      current ??
      parcoursCaps[0] ??
      null
    );
  }, [current, selectedId]);

  const getDropRect = useCallback(() => {
    return dropRef.current?.getBoundingClientRect() ?? null;
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleDragHover = useCallback((isOver: boolean) => {
    setIsDropActive(isOver);
  }, []);

  const handleDrop = useCallback((id: string, didDrop: boolean) => {
    setIsDropActive(false);
    if (didDrop) setSelectedId(id);
  }, []);

  const accentColor = selectedCap?.color ?? "rgba(148, 163, 184, 0.35)";

  return (
    <section className="section parcours-page">
      <h1>Parcours</h1>
      <p className="muted">
        Glissez une bulle dans l’écran ou cliquez pour afficher le détail de
        l’étape.
      </p>

      <div className="parcours-layout">
        <BubbleList
          caps={parcoursCaps}
          selectedId={selectedId}
          onSelect={handleSelect}
          onDragHover={handleDragHover}
          onDrop={handleDrop}
          getDropRect={getDropRect}
        />

        {selectedCap && (
          <DropScreen
            ref={dropRef}
            cap={selectedCap}
            isDropActive={isDropActive}
            accentColor={accentColor}
          />
        )}
      </div>
    </section>
  );
}
