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

function darken(hex: string, amt = 0.35) {
  const { r, g, b } = hexToRgb(hex);
  const f = (x: number) => Math.round(x * (1 - amt));
  return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
}

function polarToCartesian(cx: number, cy: number, r: number, aDeg: number) {
  const a = ((aDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function donutPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startDeg: number,
  endDeg: number
) {
  const sweep = endDeg - startDeg;
  const largeArc = sweep > 180 ? 1 : 0;

  const p1 = polarToCartesian(cx, cy, rOuter, endDeg);
  const p2 = polarToCartesian(cx, cy, rOuter, startDeg);
  const p3 = polarToCartesian(cx, cy, rInner, startDeg);
  const p4 = polarToCartesian(cx, cy, rInner, endDeg);

  return [
    `M ${p2.x} ${p2.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${p1.x} ${p1.y}`,
    `L ${p4.x} ${p4.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${p3.x} ${p3.y}`,
    "Z",
  ].join(" ");
}

function SkillsPie3D({ slices, activeId, onSelect }: Props) {
  const [hoverId, setHoverId] = useState<string | null>(null);

  const total = useMemo(() => slices.reduce((a, s) => a + s.value, 0), [slices]);

  const layout = useMemo(() => {
    let a = 0;
    return slices.map((s) => {
      const frac = s.value / total;
      const sweep = frac * 360;
      const start = a;
      const end = a + sweep;
      a = end;
      return { ...s, start, end };
    });
  }, [slices, total]);

  const cx = 150;
  const cy = 110;
  const rOuter = 88;
  const rInner = 48;
  const depth = 16;

  const active = slices.find((s) => s.id === activeId) ?? null;

  return (
    <div className="skills-pie">
      <svg viewBox="0 0 300 240" className="skills-pie__svg" aria-hidden="true">
        <ellipse className="skills-pie__shadow" cx={cx} cy={cy + depth + 10} rx="94" ry="20" />

        {/* Depth (bottom) */}
        {layout.map((s) => {
          const mid = (s.start + s.end) / 2;
          const isActive = s.id === activeId;
          const isHover = s.id === hoverId;
          const lift = isActive ? 10 : isHover ? 7 : 0;

          const radians = ((mid - 90) * Math.PI) / 180;
          const ox = Math.cos(radians) * lift;
          const oy = Math.sin(radians) * lift;

          const d = donutPath(cx, cy + depth, rOuter, rInner, s.start, s.end);

          return (
            <g
              key={`${s.id}-bottom`}
              className="skills-pie__slice"
              style={{ transform: `translate(${ox}px, ${oy}px)` }}
            >
              <path d={d} fill={darken(s.color)} />
            </g>
          );
        })}

        {/* Top */}
        {layout.map((s) => {
          const mid = (s.start + s.end) / 2;
          const isActive = s.id === activeId;
          const isHover = s.id === hoverId;
          const lift = isActive ? 10 : isHover ? 7 : 0;

          const radians = ((mid - 90) * Math.PI) / 180;
          const ox = Math.cos(radians) * lift;
          const oy = Math.sin(radians) * lift;

          const d = donutPath(cx, cy, rOuter, rInner, s.start, s.end);
          const percent = clamp(Math.round((s.value / total) * 100), 1, 99);

          return (
            <g
              key={s.id}
              className={`skills-pie__slice ${isActive ? "is-active" : ""}`}
              style={{ transform: `translate(${ox}px, ${oy}px)` }}
              onMouseEnter={() => setHoverId(s.id)}
              onMouseLeave={() => setHoverId(null)}
              onClick={() => onSelect(s.id)}
              role="button"
            >
              <path d={d} fill={s.color} />
              {percent >= 9 ? (
                <text
                  x={cx + Math.cos(radians) * 70}
                  y={cy + Math.sin(radians) * 70}
                  className="skills-pie__pct"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {percent}%
                </text>
              ) : null}
            </g>
          );
        })}

        {/* Center label */}
        {active ? (
          <g className="skills-pie__center">
            <text x={cx} y={cy - 2} textAnchor="middle" className="skills-pie__title">
              {active.label}
            </text>
            <text x={cx} y={cy + 18} textAnchor="middle" className="skills-pie__sub">
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
