/**
 * PracticePattern — Practice-specific celestial/geometric SVG background
 *
 * Each practice has a unique but extremely subtle geometric pattern
 * that references its visual identity:
 *
 *   orbital    → Astrology: concentric orbital arcs
 *   stacked    → Tarot: layered card-edge geometry
 *   curves     → Palmistry: curved life/heart line references
 *   directional → Vastu: directional compass cross
 *   dotgrid    → Numerology: mathematical dot grid
 *   radial     → Healing: soft radiating ring pattern
 *
 * Pattern is BARELY visible — 5–9% opacity.
 * Icon and text remain the focus.
 */
import React from 'react';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

import type { Practice } from '@/data/discovery';

type Props = {
  width: number;
  height: number;
  color: string;
  pattern: Practice['pattern'];
};

export function PracticePattern({ width, height, color, pattern }: Props) {
  const op = 0.18;
  const cx = width * 0.5;
  const cy = height * 0.5;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  switch (pattern) {
    // ── Astrology: orbital rings ─────────────────────────────────────────────
    case 'orbital': {
      const arcPath = (r: number, start: number, end: number) => {
        const sx = cx + r * Math.cos(toRad(start));
        const sy = cy + r * Math.sin(toRad(start));
        const ex = cx + r * Math.cos(toRad(end));
        const ey = cy + r * Math.sin(toRad(end));
        const large = end - start > 180 ? 1 : 0;
        return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
      };
      return (
        <Svg width={width} height={height} style={{ position: 'absolute' }} pointerEvents="none">
          <Path d={arcPath(width * 0.38, -30, 200)} stroke={color} strokeWidth={0.7} fill="none" opacity={op} />
          <Path d={arcPath(width * 0.55, -20, 190)} stroke={color} strokeWidth={0.5} fill="none" opacity={op * 0.7} />
          <Circle cx={cx + width * 0.38 * Math.cos(toRad(90))} cy={cy + width * 0.38 * Math.sin(toRad(90))} r={1.8} fill={color} opacity={op * 1.2} />
        </Svg>
      );
    }

    // ── Tarot: stacked card-edge geometry ────────────────────────────────────
    case 'stacked': {
      const w = width * 0.45;
      const h = width * 0.6;
      const bx = cx - w / 2;
      const by = cy - h / 2;
      return (
        <Svg width={width} height={height} style={{ position: 'absolute' }} pointerEvents="none">
          <Rect x={bx + 6} y={by + 6} width={w} height={h} rx={3} fill="none" stroke={color} strokeWidth={0.6} opacity={op * 0.6} />
          <Rect x={bx + 3} y={by + 3} width={w} height={h} rx={3} fill="none" stroke={color} strokeWidth={0.6} opacity={op * 0.8} />
          <Rect x={bx} y={by} width={w} height={h} rx={3} fill="none" stroke={color} strokeWidth={0.7} opacity={op} />
        </Svg>
      );
    }

    // ── Palmistry: curved life/heart line ────────────────────────────────────
    case 'curves': {
      return (
        <Svg width={width} height={height} style={{ position: 'absolute' }} pointerEvents="none">
          <Path
            d={`M ${width * 0.1} ${height * 0.7} Q ${width * 0.4} ${height * 0.3} ${width * 0.9} ${height * 0.45}`}
            stroke={color} strokeWidth={0.8} fill="none" opacity={op}
          />
          <Path
            d={`M ${width * 0.1} ${height * 0.55} Q ${width * 0.5} ${height * 0.2} ${width * 0.9} ${height * 0.3}`}
            stroke={color} strokeWidth={0.6} fill="none" opacity={op * 0.7}
          />
          <Path
            d={`M ${width * 0.15} ${height * 0.8} Q ${width * 0.35} ${height * 0.6} ${width * 0.85} ${height * 0.65}`}
            stroke={color} strokeWidth={0.5} fill="none" opacity={op * 0.55}
          />
        </Svg>
      );
    }

    // ── Vastu: directional compass cross ────────────────────────────────────
    case 'directional': {
      const r = width * 0.42;
      return (
        <Svg width={width} height={height} style={{ position: 'absolute' }} pointerEvents="none">
          {/* Cardinal cross */}
          <Line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke={color} strokeWidth={0.6} opacity={op} />
          <Line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={color} strokeWidth={0.6} opacity={op} />
          {/* Diagonal intercardinal */}
          <Line x1={cx - r * 0.7} y1={cy - r * 0.7} x2={cx + r * 0.7} y2={cy + r * 0.7} stroke={color} strokeWidth={0.4} opacity={op * 0.6} />
          <Line x1={cx + r * 0.7} y1={cy - r * 0.7} x2={cx - r * 0.7} y2={cy + r * 0.7} stroke={color} strokeWidth={0.4} opacity={op * 0.6} />
          {/* Outer ring */}
          <Circle cx={cx} cy={cy} r={r * 0.8} stroke={color} strokeWidth={0.5} fill="none" opacity={op * 0.7} />
        </Svg>
      );
    }

    // ── Numerology: mathematical dot grid ────────────────────────────────────
    case 'dotgrid': {
      const cols = 5;
      const rows = 5;
      const spacing = width / (cols + 1);
      const dots: { x: number; y: number }[] = [];
      for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
          dots.push({ x: c * spacing, y: r * (height / (rows + 1)) });
        }
      }
      return (
        <Svg width={width} height={height} style={{ position: 'absolute' }} pointerEvents="none">
          {dots.map(({ x, y }, i) => (
            <Circle key={i} cx={x} cy={y} r={1} fill={color} opacity={op * 0.8} />
          ))}
        </Svg>
      );
    }

    // ── Healing: radiating soft rings ────────────────────────────────────────
    case 'radial': {
      return (
        <Svg width={width} height={height} style={{ position: 'absolute' }} pointerEvents="none">
          {[0.25, 0.42, 0.58, 0.75].map((scale, i) => (
            <Circle
              key={i}
              cx={cx} cy={cy}
              r={width * scale}
              stroke={color}
              strokeWidth={0.6 - i * 0.1}
              fill="none"
              opacity={op * (1.1 - i * 0.2)}
            />
          ))}
          <Circle cx={cx} cy={cy} r={2} fill={color} opacity={op * 1.3} />
        </Svg>
      );
    }

    default:
      return null;
  }
}
