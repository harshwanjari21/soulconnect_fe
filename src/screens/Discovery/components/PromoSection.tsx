/**
 * PromoSection — "New to ConsultLive" first-reading offer
 *
 * Feels like a gentle invitation, not a promotional banner.
 * Calm, airy, with quiet celestial geometry.
 * Warm peach surface. Teal CTA.
 */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { CelestialBackground } from '@/components/common/CelestialBackground';
import { Colors, Radius, Spacing, Typography } from '@/theme';

type PromoSectionProps = {
  onExplorePress?: () => void;
};

export function PromoSection({ onExplorePress }: PromoSectionProps) {
  const { width } = useWindowDimensions();
  const cardWidth = width - Spacing.lg * 2;
  const cardHeight = 136;

  return (
    <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
      <CelestialBackground
        width={cardWidth}
        height={cardHeight}
        color={Colors.teal}
        opacity={0.06}
        variant="insight"
      />

      <View style={styles.content}>
        {/* Label row */}
        <Text style={styles.label}>NEW TO CONSULTLIVE</Text>

        {/* Offer + description row — side by side for compactness */}
        <View style={styles.bodyRow}>
          <View style={styles.textBlock}>
            <Text style={styles.headline}>50% off your first reading</Text>
            <Text style={styles.description} numberOfLines={2}>
              Connect with a highly rated expert and find the right guidance for you.
            </Text>
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={onExplorePress}
          accessibilityRole="button"
          accessibilityLabel="Explore experts"
        >
          <Text style={styles.ctaText}>Explore experts</Text>
          <Ionicons name="arrow-forward-outline" size={14} color={Colors.backgroundWhite} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.peach,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    justifyContent: 'space-between',
  },
  label: {
    ...Typography.caption,
    color: Colors.accentCoral,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textBlock: {
    flex: 1,
    gap: 3,
  },
  headline: {
    ...Typography.sectionHeading,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.textPrimary,
  },
  description: {
    ...Typography.secondaryBody,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.teal,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs + 2,
    alignSelf: 'flex-start',
    gap: Spacing.xs,
  },
  ctaText: {
    ...Typography.button,
    fontSize: 13,
    color: Colors.backgroundWhite,
  },
});
