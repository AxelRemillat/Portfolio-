import { useMemo, useState } from "react";
import type { SkillSlice } from "./skillsData";

type Props = {
  slices: SkillSlice[];
  activeId: string;
  onSelect: (id: string) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function hexToRgb(hex: string) {
  const raw = hex.replace("#", "").trim();
  const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function darken(hex: string, amt = 0.45) {
  const { r, g, b } = hexToRgb(hex);
  const f = (x: number) => Math.round(x * (1 - amt));
  return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
}

function lighten(hex: string, amt = 0.08) {
  const { r, g, b } = hexToRgb(hex);
  const f = (x: number) => Math.min(255, Math.round(x + (255 - x) * amt));
  return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
}

function getPoint(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number,
  scaleY: number
) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad) * scaleY,
  };
}

function SkillsPie3D({ slices, activeId, onSelect }: Props) {
  const [hoverId, setHoverId] = useState<string | null>(null);

  const total = useMemo(() => slices.reduce((a, s) => a + s.value, 0), [slices]);

  const layout = useMemo(() => {
    let angle = 0;
    return slices.map((s) => {
      const sweep = (s.value / total) * 360;
      const start = angle;
      const end = angle + sweep;
      const mid = (start + end) / 2;
      angle = end;
      return { ...s, start, end, mid };
    });
  }, [slices, total]);

  const cx = 150;

  // ✅ 1) RECENTRAGE VERTICAL
  // Avant: 65 (trop haut). On descend le centre => camembert centré dans sa carte.
  const cy = 92;

  const radius = 100;
  const depth = 40;
  const scaleY = 0.65;

  const active = slices.find((s) => s.id === activeId) ?? null;

  // ✅ Tri par profondeur réelle (arrière -> avant) pour éviter les chevauchements
  const sorted = useMemo(() => {
    const depthKey = (midDeg: number) => {
      const midRad = ((midDeg - 90) * Math.PI) / 180;
      return Math.sin(midRad); // -1..1 (avant = +)
    };
    const xKey = (midDeg: number) => {
      const midRad = ((midDeg - 90) * Math.PI) / 180;
      return Math.cos(midRad); // tie-break
    };

    return [...layout].sort((a, b) => {
      const da = depthKey(a.mid);
      const db = depthKey(b.mid);
      if (da !== db) return da - db; // arrière -> avant
      return xKey(a.mid) - xKey(b.mid);
    });
  }, [layout]);

  return (
    <div className="skills-pie">
      <svg viewBox="0 0 300 250" className="skills-pie__svg" aria-hidden="true">
        <defs>
          {layout.map((s) => (
            <filter
              key={`glow-${s.id}`}
              id={`glow-${s.id}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="4" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}

          <radialGradient id="topLight" cx="40%" cy="25%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Ombre globale (ré-alignée avec le nouveau cy) */}
        <ellipse
          cx={cx}
          cy={cy + depth + 28}
          rx="110"
          ry="28"
          fill="rgba(0,0,0,0.5)"
          filter="blur(10px)"
          opacity="0.7"
        />

        {/* =========================
            TRANCHES (faces latérales)
            ========================= */}
        {sorted.map((s) => {
          const isActive = s.id === activeId;
          const isHover = s.id === hoverId;

          // ✅ 2) ANIMATION PLUS LENTE / VISIBLE
          // On garde la même distance mais on anime via CSS (transform CSS) => glissement visible
          const offset = isActive ? 14 : isHover ? 8 : 0;

          const midRad = ((s.mid - 90) * Math.PI) / 180;
          const dx = Math.cos(midRad) * offset;
          const dy = Math.sin(midRad) * offset * scaleY;

          const sweep = s.end - s.start;
          const largeArc = sweep > 180 ? 1 : 0;

          const topStart = getPoint(cx, cy, radius, s.start, scaleY);
          const topEnd = getPoint(cx, cy, radius, s.end, scaleY);
          const botStart = getPoint(cx, cy + depth, radius, s.start, scaleY);
          const botEnd = getPoint(cx, cy + depth, radius, s.end, scaleY);

          const outerArc = `
            M ${topStart.x} ${topStart.y}
            A ${radius} ${radius * scaleY} 0 ${largeArc} 1 ${topEnd.x} ${topEnd.y}
            L ${botEnd.x} ${botEnd.y}
            A ${radius} ${radius * scaleY} 0 ${largeArc} 0 ${botStart.x} ${botStart.y}
            Z
          `;

          const sideColor = darken(s.color, 0.45);

          return (
            <g
              key={`side-${s.id}`}
              className={`skills-pie__move ${isActive ? "is-active" : ""} ${
                isHover ? "is-hover" : ""
              }`}
              style={{
                transform: `translate(${dx}px, ${dy}px)`,
              }}
            >
              <path
                d={outerArc}
                fill={sideColor}
                fillOpacity="1"
                stroke={darken(s.color, 0.7)}
                strokeWidth="1.2"
                strokeOpacity="1"
              />
            </g>
          );
        })}

        {/* =========================
            TOPS (faces supérieures)
            ========================= */}
        {sorted.map((s) => {
          const isActive = s.id === activeId;
          const isHover = s.id === hoverId;

          const offset = isActive ? 14 : isHover ? 8 : 0;

          const midRad = ((s.mid - 90) * Math.PI) / 180;
          const dx = Math.cos(midRad) * offset;
          const dy = Math.sin(midRad) * offset * scaleY;

          const sweep = s.end - s.start;
          const largeArc = sweep > 180 ? 1 : 0;

          const start = getPoint(cx, cy, radius, s.start, scaleY);
          const end = getPoint(cx, cy, radius, s.end, scaleY);

          const topPath = `
            M ${cx} ${cy}
            L ${start.x} ${start.y}
            A ${radius} ${radius * scaleY} 0 ${largeArc} 1 ${end.x} ${end.y}
            Z
          `;

          const percent = clamp(Math.round((s.value / total) * 100), 1, 99);
          const textPos = getPoint(cx, cy, radius * 0.63, s.mid, scaleY);

          return (
            <g
              key={`top-${s.id}`}
              className={`skills-pie__slice skills-pie__move ${
                isActive ? "is-active" : ""
              } ${isHover ? "is-hover" : ""}`}
              onMouseEnter={() => setHoverId(s.id)}
              onMouseLeave={() => setHoverId(null)}
              onClick={() => onSelect(s.id)}
              style={{
                cursor: "pointer",
                transform: `translate(${dx}px, ${dy}px)`,
                filter: isActive
                  ? `url(#glow-${s.id}) drop-shadow(0 4px 12px ${s.color}80)`
                  : undefined,
              }}
            >
              <path
                d={topPath}
                fill={isActive ? lighten(s.color, 0.08) : s.color}
                fillOpacity="1"
                stroke="rgba(0,0,0,0.35)"
                strokeWidth="2.2"
                strokeOpacity="1"
              />

              <path d={topPath} fill="url(#topLight)" style={{ pointerEvents: "none" }} />

              <text
                x={textPos.x}
                y={textPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: "17px",
                  fontWeight: 800,
                  fill: "#fff",
                  paintOrder: "stroke",
                  stroke: "rgba(0,0,0,0.8)",
                  strokeWidth: "5px",
                  strokeLinejoin: "round",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.7))",
                  pointerEvents: "none",
                }}
              >
                {percent}%
              </text>
            </g>
          );
        })}

        {/* Label central (ré-aligné via cy) */}
        {active ? (
          <g style={{ pointerEvents: "none" }}>
            <text
              x={cx}
              y={cy - 6}
              textAnchor="middle"
              style={{
                fontSize: "16px",
                fontWeight: 800,
                fill: "rgba(255,255,255,0.98)",
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))",
              }}
            >
              {active.label}
            </text>
            <text
              x={cx}
              y={cy + 14}
              textAnchor="middle"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                fill: "rgba(255,255,255,0.82)",
                filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))",
              }}
            >
              {active.level}
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
}

export default SkillsPie3D;
export { SkillsPie3D };
