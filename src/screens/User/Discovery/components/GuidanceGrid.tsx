/**
 * GuidanceGrid — 2-column grid of guidance category tiles
 *
 * Renders GUIDANCE_CATEGORIES as a 2-column grid.
 * Uses View-based grid (not FlatList) since the count is fixed at 6.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SectionHeader } from '@/components/common/SectionHeader';
import { GUIDANCE_CATEGORIES, GuidanceCategory } from '@/data/discovery';
import { Colors, Spacing, Typography } from '@/theme';

import { GuidanceTile } from './GuidanceTile';

type GuidanceGridProps = {
  onCategoryPress?: (item: GuidanceCategory) => void;
};

export function GuidanceGrid({ onCategoryPress }: GuidanceGridProps) {
  // Split categories into rows of 2
  const rows: GuidanceCategory[][] = [];
  for (let i = 0; i < GUIDANCE_CATEGORIES.length; i += 2) {
    rows.push(GUIDANCE_CATEGORIES.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>What are you looking for guidance on?</Text>

      <View style={styles.grid}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <GuidanceTile
                key={item.id}
                item={item}
                onPress={onCategoryPress}
              />
            ))}
            {/* Fill last row if odd number of items */}
            {row.length === 1 && <View style={{ flex: 1 }} />}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  question: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
  },
  grid: {
    gap: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
});
