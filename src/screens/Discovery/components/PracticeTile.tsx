/**
 * PracticeTile — Single spiritual practice tile
 *
 * 3-column grid tile with:
 *   - Practice-specific geometric SVG background pattern
 *   - Ionicons icon (consistent stroke weight)
 *   - Practice name
 */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { PracticePattern } from '@/components/common/PracticePattern';
import type { Practice } from '@/data/discovery';
import { Colors, Radius, Spacing, Typography } from '@/theme';
import { SCREEN_PADDING_H } from '@/theme/spacing';

type PracticeTileProps = {
  item: Practice;
  onPress?: (item: Practice) => void;
};

export function PracticeTile({ item, onPress }: PracticeTileProps) {
  const { width } = useWindowDimensions();
  // 3 columns with 2 gaps + horizontal screen padding on both sides
  const tileWidth = (width - SCREEN_PADDING_H * 2 - Spacing.sm * 2) / 3;
  const tileHeight = Math.round(tileWidth * 1.1);

  return (
    <TouchableOpacity
      style={[
        styles.tile,
        {
          backgroundColor: item.backgroundColor,
          width: tileWidth,
          height: tileHeight,
        },
      ]}
      onPress={() => onPress?.(item)}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={item.title}
    >
      {/* Practice-specific geometry — barely visible */}
      <PracticePattern
        width={tileWidth}
        height={tileHeight}
        color={item.iconColor}
        pattern={item.pattern}
      />

      {/* Content layer */}
      <View style={styles.content}>
        <Ionicons
          name={item.iconName as any}
          size={22}
          color={item.iconColor}
        />
        <Text style={[styles.label, { color: Colors.textPrimary }]} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: Radius.md,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    gap: Spacing.xs,
    zIndex: 1,
  },
  label: {
    ...Typography.label,
    fontWeight: '500',
    textAlign: 'center',
  },
});
