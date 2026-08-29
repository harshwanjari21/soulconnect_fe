/**
 * GettingStarted — Three-step editorial explanation
 *
 * Step numbers connected by a subtle SVG orbital curve — an arc path
 * rather than a straight line. References a journey/orbital path metaphor.
 */
import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { GETTING_STARTED_STEPS } from '@/data/discovery';
import { Colors, Radius, Spacing, Typography } from '@/theme';

const BUBBLE_SIZE = 34;

export function GettingStarted() {
  const { width } = useWindowDimensions();
  const contentWidth = width - Spacing.lg * 2;
  // The SVG connector sits in the left column (BUBBLE_SIZE wide)
  const connectorH = 44;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Getting started is simple</Text>

      <View style={styles.steps}>
        {GETTING_STARTED_STEPS.map((step, index) => {
          const isLast = index === GETTING_STARTED_STEPS.length - 1;
          return (
            <View key={step.id}>
              {/* Step row */}
              <View style={styles.stepRow}>
                {/* Left: step bubble */}
                <View style={styles.bubbleCol}>
                  <View style={styles.stepBubble}>
                    <Text style={styles.stepNumber}>{step.number}</Text>
                  </View>
                </View>

                {/* Right: text */}
                <View style={styles.stepText}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>

              {/* Orbital arc connector between steps */}
              {!isLast && (
                <View style={[styles.connectorRow, { height: connectorH }]}>
                  <View style={styles.bubbleCol}>
                    <Svg width={BUBBLE_SIZE} height={connectorH} style={styles.connectorSvg}>
                      {/*
                        Gentle S-like arc from bottom-center of bubble
                        to top-center of next bubble — references an orbital path
                      */}
                      <Path
                        d={`M ${BUBBLE_SIZE / 2} 0 C ${BUBBLE_SIZE * 0.1} ${connectorH * 0.4}, ${BUBBLE_SIZE * 0.9} ${connectorH * 0.6}, ${BUBBLE_SIZE / 2} ${connectorH}`}
                        stroke={Colors.teal}
                        strokeWidth={1.2}
                        fill="none"
                        strokeOpacity={0.25}
                        strokeDasharray="3,4"
                      />
                    </Svg>
                  </View>
                  {/* Empty right side during connector */}
                  <View style={{ flex: 1 }} />
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 3,
    gap: Spacing.xl,
  },
  heading: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  steps: {
    gap: 0,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  bubbleCol: {
    width: BUBBLE_SIZE,
    alignItems: 'center',
  },
  stepBubble: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: Radius.pill,
    backgroundColor: Colors.tealSoft,
    borderWidth: 1.5,
    borderColor: 'rgba(22,140,131,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    ...Typography.caption,
    color: Colors.teal,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  stepText: {
    flex: 1,
    gap: 3,
  },
  stepTitle: {
    ...Typography.label,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  stepDescription: {
    ...Typography.secondaryBody,
    color: Colors.textSecondary,
  },
  connectorRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  connectorSvg: {
    alignSelf: 'center',
  },
});
