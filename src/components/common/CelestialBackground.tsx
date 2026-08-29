/**
 * CelestialBackground — Intentional orbital system geometry
 *
 * Uses react-native-svg to render partial orbital arcs, radial structure,
 * and tiny position markers — referencing astrological chart geometry.
 *
 * The effect should read as "celestial" subconsciously without being
 * consciously noticed as decoration. Keep opacity very low (0.08–0.15).
 *
 * Variants:
 *   header  — partial arcs + position dots, anchored at top-right
 *   insight — fuller chart-wheel geometry, anchored at right-center
 *   tile    — extremely minimal single arc per tile corner
 */
import React from 'react';
import Svg, { Circle, G, Line, Path } from 'react-native-svg';

type Props = {
  width: number;
  height: number;
  color?: string;
  opacity?: number;
  variant?: 'header' | 'insight' | 'tile';
};

/** Tiny orbit position dot — like a planet marker on a chart */
function OrbitDot({
  cx, cy, r, color, opacity,
}: { cx: number; cy: number; r: number; color: string; opacity: number }) {
  return <Circle cx={cx} cy={cy} r={r} fill={color} opacity={opacity} />;
}

export function CelestialBackground({
  width,
  height,
  color = '#D7A64A',
  opacity = 0.11,
  variant = 'header',
}: Props) {

  // ── Header variant ─────────────────────────────────────────────────────────
  if (variant === 'header') {
    // Anchor point — upper right, partially off-screen
    const cx = width * 0.92;
    const cy = -height * 0.05;

    const r1 = height * 0.7;
    const r2 = height * 1.1;
    const r3 = height * 1.55;

    // Arc helpers — arc from -135° to 45° (partial orbital arc)
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const arcPath = (r: number, startDeg: number, endDeg: number) => {
      const sx = cx + r * Math.cos(toRad(startDeg));
      const sy = cy + r * Math.sin(toRad(startDeg));
      const ex = cx + r * Math.cos(toRad(endDeg));
      const ey = cy + r * Math.sin(toRad(endDeg));
      const large = endDeg - startDeg > 180 ? 1 : 0;
      return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
    };

    return (
      <Svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0 }}
        pointerEvents="none"
      >
        {/* Orbital arcs — partial, not complete circles */}
        <Path d={arcPath(r1, 100, 260)} stroke={color} strokeWidth={0.7} fill="none" opacity={opacity} />
        <Path d={arcPath(r2, 110, 250)} stroke={color} strokeWidth={0.5} fill="none" opacity={opacity * 0.75} />
        <Path d={arcPath(r3, 120, 240)} stroke={color} strokeWidth={0.4} fill="none" opacity={opacity * 0.5} />

        {/* Two radial spokes from center — like chart axis lines */}
        <Line
          x1={cx} y1={cy}
          x2={cx + r3 * Math.cos(toRad(150))}
          y2={cy + r3 * Math.sin(toRad(150))}
          stroke={color} strokeWidth={0.4} opacity={opacity * 0.5}
        />
        <Line
          x1={cx} y1={cy}
          x2={cx + r3 * Math.cos(toRad(200))}
          y2={cy + r3 * Math.sin(toRad(200))}
          stroke={color} strokeWidth={0.3} opacity={opacity * 0.4}
        />

        {/* Planet position markers on orbital ring 1 */}
        <OrbitDot
          cx={cx + r1 * Math.cos(toRad(160))}
          cy={cy + r1 * Math.sin(toRad(160))}
          r={2.2} color={color} opacity={opacity * 1.2}
        />
        <OrbitDot
          cx={cx + r1 * Math.cos(toRad(220))}
          cy={cy + r1 * Math.sin(toRad(220))}
          r={1.5} color={color} opacity={opacity}
        />

        {/* Position marker on ring 2 */}
        <OrbitDot
          cx={cx + r2 * Math.cos(toRad(180))}
          cy={cy + r2 * Math.sin(toRad(180))}
          r={1.8} color={color} opacity={opacity * 0.9}
        />
      </Svg>
    );
  }

  // ── Insight variant — fuller chart-wheel geometry ─────────────────────────
  if (variant === 'insight') {
    const cx = width * 0.8;
    const cy = height * 0.5;

    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const arcPath = (r: number, startDeg: number, endDeg: number) => {
      const sx = cx + r * Math.cos(toRad(startDeg));
      const sy = cy + r * Math.sin(toRad(startDeg));
      const ex = cx + r * Math.cos(toRad(endDeg));
      const ey = cy + r * Math.sin(toRad(endDeg));
      const large = endDeg - startDeg > 180 ? 1 : 0;
      return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
    };

    const r1 = 36;
    const r2 = 62;
    const r3 = 95;
    const r4 = 130;

    // Evenly spaced degree markers (like zodiac position ticks)
    const ticks = Array.from({ length: 12 }, (_, i) => i * 30);

    return (
      <Svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0 }}
        pointerEvents="none"
      >
        {/* Full rings for inner chart wheel */}
        <Circle cx={cx} cy={cy} r={r1} stroke={color} strokeWidth={0.8} fill="none" opacity={opacity * 1.2} />
        <Circle cx={cx} cy={cy} r={r2} stroke={color} strokeWidth={0.6} fill="none" opacity={opacity} />

        {/* Partial outer arcs */}
        <Path d={arcPath(r3, -60, 180)} stroke={color} strokeWidth={0.5} fill="none" opacity={opacity * 0.8} />
        <Path d={arcPath(r4, -40, 160)} stroke={color} strokeWidth={0.3} fill="none" opacity={opacity * 0.5} />

        {/* Zodiac-degree tick marks around ring 2 */}
        {ticks.map((deg) => {
          const innerR = r2 - 4;
          const outerR = r2 + 4;
          const x1 = cx + innerR * Math.cos(toRad(deg));
          const y1 = cy + innerR * Math.sin(toRad(deg));
          const x2 = cx + outerR * Math.cos(toRad(deg));
          const y2 = cy + outerR * Math.sin(toRad(deg));
          return (
            <Line
              key={deg}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={color} strokeWidth={0.5}
              opacity={opacity * 0.7}
            />
          );
        })}

        {/* Chart axis cross */}
        <Line x1={cx - r3} y1={cy} x2={cx + r3} y2={cy} stroke={color} strokeWidth={0.35} opacity={opacity * 0.4} />
        <Line x1={cx} y1={cy - r3} x2={cx} y2={cy + r3} stroke={color} strokeWidth={0.35} opacity={opacity * 0.4} />

        {/* Planet dots */}
        <OrbitDot cx={cx + r2 * Math.cos(toRad(30))} cy={cy + r2 * Math.sin(toRad(30))} r={2.5} color={color} opacity={opacity * 1.1} />
        <OrbitDot cx={cx + r2 * Math.cos(toRad(150))} cy={cy + r2 * Math.sin(toRad(150))} r={1.8} color={color} opacity={opacity * 0.9} />
        <OrbitDot cx={cx + r1 * Math.cos(toRad(220))} cy={cy + r1 * Math.sin(toRad(220))} r={1.5} color={color} opacity={opacity} />

        {/* Center point */}
        <Circle cx={cx} cy={cy} r={2.5} fill={color} opacity={opacity * 1.3} />
      </Svg>
    );
  }

  // ── Tile variant — almost invisible single arc ────────────────────────────
  const tcx = width + 10;
  const tcy = -10;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const tr = width * 0.65;
  const arcPath = (r: number, startDeg: number, endDeg: number) => {
    const sx = tcx + r * Math.cos(toRad(startDeg));
    const sy = tcy + r * Math.sin(toRad(startDeg));
    const ex = tcx + r * Math.cos(toRad(endDeg));
    const ey = tcy + r * Math.sin(toRad(endDeg));
    return `M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`;
  };

  return (
    <Svg
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0 }}
      pointerEvents="none"
    >
      <Path d={arcPath(tr, 140, 220)} stroke={color} strokeWidth={0.6} fill="none" opacity={opacity} />
      <Path d={arcPath(tr * 1.4, 140, 220)} stroke={color} strokeWidth={0.4} fill="none" opacity={opacity * 0.6} />
    </Svg>
  );
}
