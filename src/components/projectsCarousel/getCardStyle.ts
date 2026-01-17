import type { CSSProperties } from "react";
import { CARD_GAP_PX } from "./constants";

type CardStyleOptions = {
  offset: number;
  cardWidth: number;
  smoothedOffset: number;
  isDragging: boolean;
  prefersReducedMotion: boolean;
};

export default function getCardStyle({
  offset,
  cardWidth,
  smoothedOffset,
  isDragging,
  prefersReducedMotion,
}: CardStyleOptions): CSSProperties {
  const abs = Math.abs(offset);
  const direction = Math.sign(offset);
  let scale = 1.02;
  let opacity = 1;
  let blur = 0;
  let translateZ = 0;
  let rotateY = 0;
  let translateX = 0;

  if (abs === 0) {
    scale = 1.04;
  } else if (abs === 1) {
    scale = 0.96;
    opacity = 0.86;
    blur = 0.5;
    translateZ = -40;
    rotateY = direction * 10;
    translateX = direction * (cardWidth + CARD_GAP_PX);
  } else if (abs === 2) {
    scale = 0.9;
    opacity = 0.6;
    blur = 1.2;
    translateZ = -90;
    rotateY = direction * 18;
    translateX = direction * (cardWidth + CARD_GAP_PX) * 2;
  } else if (abs >= 3) {
    scale = 0.78;
    opacity = 0;
    blur = 6;
    translateZ = -160;
    rotateY = direction * 26;
    translateX = direction * (cardWidth + CARD_GAP_PX) * abs;
  }

  return {
    transform: `translateX(${translateX + smoothedOffset}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    filter: prefersReducedMotion ? "none" : `blur(${blur}px)`,
    zIndex: 10 - abs,
    pointerEvents: abs >= 3 ? "none" : "auto",
    transition: prefersReducedMotion || isDragging ? "none" : undefined,
  };
}
