/**
 * CelestialBackground — Intentional orbital system geometry
 *
 * Renders partial orbital arcs, radial spokes, and tiny planet-position
 * markers referencing astrological chart geometry.
 *
 * Design intent:
 *   "Visible on inspection, not consciously noticed as decoration."
 *   The user should subconsciously register 'celestial' — not see stickers.
 *
 * Opacity range: 0.12–0.18 for header, 0.14–0.20 for insight card.
 *
 * Variants:
 *   header  — partial orbital arcs anchored upper-right, radii scale off width
 *   insight — fuller chart-wheel reference, zodiac tick marks
 *   tile    — single minimal arc at corner (nearly invisible)
 */
import React from 'react';
import Svg, { Circle, Line, Path } from 'react-native-svg';

type Props = {
  width: number;
  height: number;
  color?: string;
  opacity?: number;
  variant?: 'header' | 'insight' | 'tile';
};

const toRad = (deg: number) => (deg * Math.PI) / 180;

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const sx = cx + r * Math.cos(toRad(startDeg));
  const sy = cy + r * Math.sin(toRad(startDeg));
  const ex = cx + r * Math.cos(toRad(endDeg));
  const ey = cy + r * Math.sin(toRad(endDeg));
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
}

export function CelestialBackground({
  width,
  height,
  color = '#D7A64A',
  opacity = 0.14,
  variant = 'header',
}: Props) {

  // ── HEADER — orbital arcs anchored upper-right ─────────────────────────────
  if (variant === 'header') {
    // Anchor: upper-right corner, slightly outside the frame
    const cx = width * 0.9;
    const cy = -8;

    // Radii scale off WIDTH so they adapt to any screen size
    const r1 = width * 0.28;   // ~90px on 390px wide screen
    const r2 = width * 0.45;   // ~175px
    const r3 = width * 0.65;   // ~253px

    // Arc sweep: bottom-left quadrant only (130°–240°) — partial, not full circles
    const sweep: [number, number] = [120, 250];

    return (
      <Svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0 }}
        pointerEvents="none"
      >
        {/* Three partial orbital arcs — progressively fainter */}
        <Path
          d={arcPath(cx, cy, r1, ...sweep)}
          stroke={color} strokeWidth={0.8} fill="none"
          opacity={opacity}
        />
        <Path
          d={arcPath(cx, cy, r2, ...sweep)}
          stroke={color} strokeWidth={0.6} fill="none"
          opacity={opacity * 0.75}
        />
        <Path
          d={arcPath(cx, cy, r3, ...sweep)}
          stroke={color} strokeWidth={0.4} fill="none"
          opacity={opacity * 0.5}
        />

        {/* Two radial spokes — like chart axis lines pointing into the content */}
        <Line
          x1={cx} y1={cy}
          x2={cx + r3 * Math.cos(toRad(145))}
          y2={cy + r3 * Math.sin(toRad(145))}
          stroke={color} strokeWidth={0.4} opacity={opacity * 0.55}
        />
        <Line
          x1={cx} y1={cy}
          x2={cx + r3 * Math.cos(toRad(195))}
          y2={cy + r3 * Math.sin(toRad(195))}
          stroke={color} strokeWidth={0.3} opacity={opacity * 0.4}
        />

        {/* Planet position markers — tiny dots on the orbital rings */}
        {/* Dot on ring 1 at ~170° */}
        <Circle
          cx={cx + r1 * Math.cos(toRad(170))}
          cy={cy + r1 * Math.sin(toRad(170))}
          r={2.4} fill={color} opacity={opacity * 1.3}
        />
        {/* Dot on ring 1 at ~215° */}
        <Circle
          cx={cx + r1 * Math.cos(toRad(215))}
          cy={cy + r1 * Math.sin(toRad(215))}
          r={1.6} fill={color} opacity={opacity * 1.1}
        />
        {/* Dot on ring 2 at ~185° */}
        <Circle
          cx={cx + r2 * Math.cos(toRad(185))}
          cy={cy + r2 * Math.sin(toRad(185))}
          r={1.8} fill={color} opacity={opacity * 1.0}
        />
      </Svg>
    );
  }

  // ── INSIGHT — fuller chart-wheel reference ─────────────────────────────────
  if (variant === 'insight') {
    const cx = width * 0.78;
    const cy = height * 0.5;

    const r1 = 34;
    const r2 = 58;
    const r3 = 88;
    const r4 = 118;

    // 12 evenly-spaced zodiac tick marks around ring 2
    const ticks = Array.from({ length: 12 }, (_, i) => i * 30);

    return (
      <Svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0 }}
        pointerEvents="none"
      >
        {/* Inner full rings — chart wheel core */}
        <Circle cx={cx} cy={cy} r={r1} stroke={color} strokeWidth={0.9} fill="none" opacity={opacity * 1.2} />
        <Circle cx={cx} cy={cy} r={r2} stroke={color} strokeWidth={0.65} fill="none" opacity={opacity} />

        {/* Outer partial arcs */}
        <Path
          d={arcPath(cx, cy, r3, -70, 185)}
          stroke={color} strokeWidth={0.5} fill="none" opacity={opacity * 0.8}
        />
        <Path
          d={arcPath(cx, cy, r4, -50, 165)}
          stroke={color} strokeWidth={0.35} fill="none" opacity={opacity * 0.5}
        />

        {/* Zodiac-degree tick marks */}
        {ticks.map((deg) => {
          const innerR = r2 - 4;
          const outerR = r2 + 5;
          return (
            <Line
              key={deg}
              x1={cx + innerR * Math.cos(toRad(deg))}
              y1={cy + innerR * Math.sin(toRad(deg))}
              x2={cx + outerR * Math.cos(toRad(deg))}
              y2={cy + outerR * Math.sin(toRad(deg))}
              stroke={color} strokeWidth={0.55} opacity={opacity * 0.75}
            />
          );
        })}

        {/* Cardinal cross axis */}
        <Line x1={cx - r3} y1={cy} x2={cx + r3} y2={cy} stroke={color} strokeWidth={0.35} opacity={opacity * 0.4} />
        <Line x1={cx} y1={cy - r3} x2={cx} y2={cy + r3} stroke={color} strokeWidth={0.35} opacity={opacity * 0.4} />

        {/* Planet markers */}
        <Circle cx={cx + r2 * Math.cos(toRad(30))}  cy={cy + r2 * Math.sin(toRad(30))}  r={2.5} fill={color} opacity={opacity * 1.2} />
        <Circle cx={cx + r2 * Math.cos(toRad(150))} cy={cy + r2 * Math.sin(toRad(150))} r={1.8} fill={color} opacity={opacity * 1.0} />
        <Circle cx={cx + r1 * Math.cos(toRad(225))} cy={cy + r1 * Math.sin(toRad(225))} r={1.5} fill={color} opacity={opacity * 0.9} />

        {/* Center point */}
        <Circle cx={cx} cy={cy} r={2.5} fill={color} opacity={opacity * 1.4} />
      </Svg>
    );
  }

  // ── TILE — single minimal arc at corner ────────────────────────────────────
  const tcx = width + 8;
  const tcy = -8;
  const tr = width * 0.6;

  return (
    <Svg
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0 }}
      pointerEvents="none"
    >
      <Path
        d={arcPath(tcx, tcy, tr, 135, 225)}
        stroke={color} strokeWidth={0.65} fill="none" opacity={opacity}
      />
      <Path
        d={arcPath(tcx, tcy, tr * 1.35, 140, 220)}
        stroke={color} strokeWidth={0.4} fill="none" opacity={opacity * 0.6}
      />
    </Svg>
  );
}
