/**
 * PromoSection — "New to ConsultLive" first-reading offer
 *
 * Feels like a gentle invitation, not a promotional banner.
 * Calm, airy, with quiet celestial geometry.
 * Warm peach surface. Teal CTA.
 */
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
  const cardHeight = 164;

  return (
    <LinearGradient
      colors={[Colors.textPrimary, Colors.cosmosPlum]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, { width: cardWidth, height: cardHeight }]}
    >
      <CelestialBackground
        width={cardWidth}
        height={cardHeight}
        color={Colors.gold}
        opacity={0.28}
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
          <Ionicons name="arrow-forward-outline" size={14} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    // Premium soft shadow
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 6,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    justifyContent: 'flex-start',
  },
  label: {
    ...Typography.caption,
    color: Colors.gold,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: Spacing.sm,
  },
  textBlock: {
    flex: 1,
    gap: 3,
  },
  headline: {
    ...Typography.sectionHeading,
    color: Colors.backgroundWhite,
  },
  description: {
    ...Typography.secondaryBody,
    color: Colors.backgroundCream,
    opacity: 0.85,
    lineHeight: 18,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gold,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs + 2,
    alignSelf: 'flex-start',
    gap: Spacing.xs,
    marginTop: Spacing.md,
  },
  ctaText: {
    ...Typography.button,
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
});
