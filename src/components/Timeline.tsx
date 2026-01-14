import type { ParcoursItem } from "../data/parcours";

type TimelineProps = {
  items: ParcoursItem[];
  onSelect: (item: ParcoursItem) => void;
};

export default function Timeline({ items, onSelect }: TimelineProps) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="card timeline-card"
          onClick={() => onSelect(item)}
        >
          <span
            className="timeline-dot"
            data-tooltip={`${item.year} • ${item.title}`}
            aria-hidden="true"
          />
          <div className="timeline-content">
            <p className="timeline-year">{item.year}</p>
            <h3>{item.title}</h3>
            <p className="timeline-place">{item.place}</p>
            <p className="muted">{item.summary}</p>
            <span className="timeline-hint">Cliquer pour voir les détails</span>
          </div>
        </button>
      ))}
    </div>
  );
}
