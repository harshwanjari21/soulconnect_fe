/**
 * CosmicInsight — Today's celestial/astrological insight section
 *
 * The strongest astrology-focused visual on the Discovery screen.
 * Warm gold/cream surface with radial geometry and celestial chart aesthetic.
 */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { CelestialBackground } from '@/components/common/CelestialBackground';
import { SectionHeader } from '@/components/common/SectionHeader';
import { COSMIC_INSIGHT } from '@/data/discovery';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

type CosmicInsightProps = {
  onReadMore?: () => void;
};

export function CosmicInsight({ onReadMore }: CosmicInsightProps) {
  const { width } = useWindowDimensions();
  const cardWidth = width - Spacing.lg * 2;
  const cardHeight = 160;

  return (
    <View style={styles.container}>
      <SectionHeader title="Today's Cosmic Insight" />

      {/* Card */}
      <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
        {/* Radial geometry */}
        <CelestialBackground
          width={cardWidth}
          height={cardHeight}
          color={Colors.gold}
          opacity={0.18}
          variant="insight"
        />

        {/* Content */}
        <View style={styles.cardContent}>
          {/* Top row — label and date */}
          <View style={styles.topRow}>
            <View style={styles.labelBadge}>
              <Text style={styles.labelText}>{COSMIC_INSIGHT.label}</Text>
            </View>
            <View style={styles.metaRight}>
              <Text style={styles.signText}>{COSMIC_INSIGHT.sign}</Text>
              <Text style={styles.dateText}>{COSMIC_INSIGHT.date}</Text>
            </View>
          </View>

          {/* Insight title */}
          <Text style={styles.insightTitle} numberOfLines={2}>
            {COSMIC_INSIGHT.title}
          </Text>

          {/* Description */}
          <Text style={styles.description} numberOfLines={2}>
            {COSMIC_INSIGHT.description}
          </Text>

          {/* CTA */}
          <TouchableOpacity
            style={styles.cta}
            onPress={onReadMore}
            accessibilityRole="button"
            accessibilityLabel={COSMIC_INSIGHT.cta}
          >
            <Text style={styles.ctaText}>{COSMIC_INSIGHT.cta}</Text>
            <Ionicons name="arrow-forward" size={13} color={Colors.teal} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  card: {
    backgroundColor: Colors.goldSoft,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(215, 166, 74, 0.25)',
    ...Shadows.sm,
  },
  cardContent: {
    flex: 1,
    padding: Spacing.lg,
    gap: Spacing.xs,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  labelBadge: {
    backgroundColor: 'rgba(215, 166, 74, 0.3)',
    borderRadius: Radius.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  labelText: {
    ...Typography.caption,
    color: '#8B6914',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  metaRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  signText: {
    ...Typography.caption,
    color: '#8B6914',
    fontWeight: '500',
  },
  dateText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  insightTitle: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  description: {
    ...Typography.secondaryBody,
    color: Colors.textSecondary,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  ctaText: {
    ...Typography.label,
    color: Colors.teal,
    fontWeight: '600',
  },
});
