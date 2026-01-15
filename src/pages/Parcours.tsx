import { useEffect, useMemo, useState } from "react";
import Modal from "../components/Modal";
import Timeline from "../components/Timeline";
import { parcoursItems } from "../data/parcours";
import type { ParcoursItem } from "../data/parcours";

type ImageErrorState = Record<string, boolean>;

export default function Parcours() {
  const [selectedItem, setSelectedItem] = useState<ParcoursItem | null>(null);
  const [imageErrors, setImageErrors] = useState<ImageErrorState>({});

  useEffect(() => {
    setImageErrors({});
  }, [selectedItem?.id]);

  const grouped = useMemo(() => {
    const education = parcoursItems.filter((item) =>
      ["esme", "prep", "advance", "bac"].some((key) => item.id.includes(key)),
    );
    const experience = parcoursItems.filter((item) =>
      ["rise", "rosi", "inovalp", "cnrs"].some((key) => item.id.includes(key)),
    );

    return { education, experience };
  }, []);

  const handleImageError = (key: string) => {
    setImageErrors((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className="page-stack">
      <section className="section">
        <h1>Parcours</h1>
        <p className="muted">Chronologie claire, orientée impact et facilement lisible.</p>
        <Timeline items={grouped.education} onSelect={setSelectedItem} />
      </section>

      <section className="section">
        <h2>Expériences</h2>
        <p className="muted">Stages et projets entrepreneuriaux marquants.</p>
        <Timeline items={grouped.experience} onSelect={setSelectedItem} />
      </section>

      <Modal
        isOpen={Boolean(selectedItem)}
        title={selectedItem?.title ?? ""}
        onClose={() => setSelectedItem(null)}
      >
        {selectedItem && (
          <div className="parcours-modal">
            <p className="modal-subtitle">{selectedItem.place}</p>
            <p className="modal-year">{selectedItem.year}</p>
            <p className="modal-summary">{selectedItem.summary}</p>

            <div className="modal-section">
              <h3>Détails</h3>
              <ul>
                {selectedItem.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>

            <div className="modal-section">
              <h3>Compétences clés</h3>
              <ul className="modal-skills">
                {selectedItem.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="modal-images">
              {selectedItem.images?.map((image, index) => {
                const key = `${selectedItem.id}-${index}`;

                if (imageErrors[key]) {
                  return (
                    <div key={key} className="modal-image-fallback">
                      Image
                    </div>
                  );
                }

                return (
                  <img
                    key={key}
                    src={image.src}
                    alt={image.alt}
                    onError={() => handleImageError(key)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
