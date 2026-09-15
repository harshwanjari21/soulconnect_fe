/**
 * KundliChart — North Indian Vedic Astrology Chart (SVG)
 *
 * Renders the traditional diamond-layout Vedic Kundli with 12 houses.
 * Uses react-native-svg for crisp, vector-based planetary visualization.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Line, Polygon, Rect, Text as SvgText } from 'react-native-svg';

import { Colors, Radius, Shadows, Typography } from '@/theme';

type KundliChartProps = {
  lagnaSign?: string;
  size?: number;
};

export function KundliChart({
  lagnaSign = 'Libra (7)',
  size = 300,
}: KundliChartProps) {
  const half = size / 2;

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.chartTitle}>Lagna Kundli (D-1)</Text>
        <Text style={styles.lagnaText}>Asc: {lagnaSign}</Text>
      </View>

      <View style={styles.svgWrapper}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Outer Border */}
          <Rect
            x="2"
            y="2"
            width={size - 4}
            height={size - 4}
            fill={Colors.chartBackground}
            stroke={Colors.gold}
            strokeWidth="2"
            rx="4"
          />

          {/* Diagonals from corners */}
          <Line x1="2" y1="2" x2={size - 2} y2={size - 2} stroke={Colors.gold} strokeWidth="1.5" />
          <Line x1={size - 2} y1="2" x2="2" y2={size - 2} stroke={Colors.gold} strokeWidth="1.5" />

          {/* Inner Diamond connecting midpoints of edges */}
          <Polygon
            points={`${half},2 ${size - 2},${half} ${half},${size - 2} 2,${half}`}
            fill="none"
            stroke={Colors.gold}
            strokeWidth="1.5"
          />

          {/* House 1: Lagna (Top Diamond) */}
          <SvgText x={half} y={half * 0.35} fontSize="11" fill={Colors.textSecondary} textAnchor="middle">
            1
          </SvgText>
          <SvgText x={half} y={half * 0.65} fontSize="12" fontWeight="bold" fill={Colors.textPrimary} textAnchor="middle">
            Asc / Su
          </SvgText>

          {/* House 2: (Top Left Triangle) */}
          <SvgText x={half * 0.45} y={half * 0.22} fontSize="10" fill={Colors.textSecondary} textAnchor="middle">
            2
          </SvgText>
          <SvgText x={half * 0.38} y={half * 0.42} fontSize="11" fontWeight="bold" fill={Colors.teal} textAnchor="middle">
            Me
          </SvgText>

          {/* House 3: (Left Top Triangle) */}
          <SvgText x={half * 0.22} y={half * 0.45} fontSize="10" fill={Colors.textSecondary} textAnchor="middle">
            3
          </SvgText>
          <SvgText x={half * 0.22} y={half * 0.68} fontSize="11" fill={Colors.textPrimary} textAnchor="middle">
            Ve
          </SvgText>

          {/* House 4: (Left Diamond) */}
          <SvgText x={half * 0.55} y={half} fontSize="11" fill={Colors.textSecondary} textAnchor="middle">
            4
          </SvgText>
          <SvgText x={half * 0.35} y={half} fontSize="12" fontWeight="bold" fill={Colors.accentCoral} textAnchor="middle">
            Mo
          </SvgText>

          {/* House 5: (Left Bottom Triangle) */}
          <SvgText x={half * 0.22} y={half * 1.45} fontSize="10" fill={Colors.textSecondary} textAnchor="middle">
            5
          </SvgText>
          <SvgText x={half * 0.22} y={half * 1.65} fontSize="11" fill={Colors.textPrimary} textAnchor="middle">
            Ma
          </SvgText>

          {/* House 6: (Bottom Left Triangle) */}
          <SvgText x={half * 0.45} y={half * 1.78} fontSize="10" fill={Colors.textSecondary} textAnchor="middle">
            6
          </SvgText>

          {/* House 7: (Bottom Diamond) */}
          <SvgText x={half} y={half * 1.65} fontSize="11" fill={Colors.textSecondary} textAnchor="middle">
            7
          </SvgText>
          <SvgText x={half} y={half * 1.35} fontSize="12" fontWeight="bold" fill={Colors.cosmosPlum} textAnchor="middle">
            Sa (R)
          </SvgText>

          {/* House 8: (Bottom Right Triangle) */}
          <SvgText x={half * 1.55} y={half * 1.78} fontSize="10" fill={Colors.textSecondary} textAnchor="middle">
            8
          </SvgText>
          <SvgText x={half * 1.55} y={half * 1.6} fontSize="11" fill={Colors.accentAmber} textAnchor="middle">
            Ra
          </SvgText>

          {/* House 9: (Right Bottom Triangle) */}
          <SvgText x={half * 1.78} y={half * 1.45} fontSize="10" fill={Colors.textSecondary} textAnchor="middle">
            9
          </SvgText>
          <SvgText x={half * 1.78} y={half * 1.65} fontSize="11" fill={Colors.textPrimary} textAnchor="middle">
            Ju
          </SvgText>

          {/* House 10: (Right Diamond) */}
          <SvgText x={half * 1.45} y={half} fontSize="11" fill={Colors.textSecondary} textAnchor="middle">
            10
          </SvgText>
          <SvgText x={half * 1.65} y={half} fontSize="12" fontWeight="bold" fill={Colors.teal} textAnchor="middle">
            Ke
          </SvgText>

          {/* House 11: (Right Top Triangle) */}
          <SvgText x={half * 1.78} y={half * 0.45} fontSize="10" fill={Colors.textSecondary} textAnchor="middle">
            11
          </SvgText>

          {/* House 12: (Top Right Triangle) */}
          <SvgText x={half * 1.55} y={half * 0.22} fontSize="10" fill={Colors.textSecondary} textAnchor="middle">
            12
          </SvgText>
        </Svg>
      </View>

      <Text style={styles.chartFootnote}>
        Planets: Su (Sun), Mo (Moon), Ma (Mars), Me (Mercury), Ju (Jupiter), Ve (Venus), Sa (Saturn), Ra (Rahu), Ke (Ketu)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    ...Shadows.xs,
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  chartTitle: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 15,
  },
  lagnaText: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.gold,
  },
  svgWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  chartFootnote: {
    ...Typography.caption,
    color: Colors.textTertiary,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 8,
  },
});
