/**
 * PracticeGrid — 3-column grid of spiritual practice tiles
 *
 * No horizontal scroll. No carousel. All 6 tiles visible at once.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { SectionHeader } from '@/components/common/SectionHeader';
import { PRACTICES, Practice } from '@/data/discovery';
import { Spacing } from '@/theme';

import { PracticeTile } from './PracticeTile';

type PracticeGridProps = {
  onPracticePress?: (item: Practice) => void;
};

export function PracticeGrid({ onPracticePress }: PracticeGridProps) {
  // Split 6 practices into rows of 3
  const rows: Practice[][] = [];
  for (let i = 0; i < PRACTICES.length; i += 3) {
    rows.push(PRACTICES.slice(i, i + 3));
  }

  return (
    <View style={styles.container}>
      <SectionHeader title="Explore practices" />

      <View style={styles.grid}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <PracticeTile
                key={item.id}
                item={item}
                onPress={onPracticePress}
              />
            ))}
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
  grid: {
    gap: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
});
