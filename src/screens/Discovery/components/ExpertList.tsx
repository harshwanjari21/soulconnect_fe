/**
 * ExpertList — Horizontally scrollable list of Online Expert cards
 *
 * Horizontal scroll is intentional here — browsing practitioners
 * naturally maps to a horizontal carousel interaction.
 */
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { SectionHeader } from '@/components/common/SectionHeader';
import { EXPERTS, Expert } from '@/data/discovery';
import { Colors, SCREEN_PADDING_H, Spacing } from '@/theme';

import { ExpertCard } from './ExpertCard';

type ExpertListProps = {
  onSeeAll?: () => void;
  onExpertCall?: (expert: Expert) => void;
  onExpertPress?: (expert: Expert) => void;
};

export function ExpertList({ onSeeAll, onExpertCall, onExpertPress }: ExpertListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SectionHeader title="Online Experts" actionLabel="See all" onAction={onSeeAll} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={176} // card width + gap
        snapToAlignment="start"
      >
        {EXPERTS.map((expert) => (
          <ExpertCard
            key={expert.id}
            expert={expert}
            onCallPress={onExpertCall}
            onCardPress={onExpertPress}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  header: {
    paddingHorizontal: SCREEN_PADDING_H,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingVertical: Spacing.lg, // Give the shadow room to breathe without clipping
    gap: Spacing.md,
    paddingRight: SCREEN_PADDING_H + Spacing.sm,
  },
});
