/**
 * GuidanceTile — Single guidance category tile (2-column grid)
 *
 * Intentionally quiet — the tile background is subtle.
 * The icon container is a soft white circle so all icons read consistently
 * regardless of tile background color.
 */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { GuidanceCategory } from '@/data/discovery';
import { Colors, Radius, Spacing, Typography } from '@/theme';

type GuidanceTileProps = {
  item: GuidanceCategory;
  onPress?: (item: GuidanceCategory) => void;
};

export function GuidanceTile({ item, onPress }: GuidanceTileProps) {
  return (
    <TouchableOpacity
      style={[styles.tile, { backgroundColor: item.backgroundColor }]}
      onPress={() => onPress?.(item)}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={`${item.title}: ${item.description}`}
    >
      {/* Top row: icon + subtle chevron */}
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <Ionicons name={item.iconName as any} size={17} color={item.iconColor} />
        </View>
        <Ionicons
          name="chevron-forward-outline"
          size={11}
          color={item.iconColor}
          style={styles.chevron}
        />
      </View>

      {/* Text */}
      <View style={styles.textGroup}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    borderRadius: Radius.md,
    padding: Spacing.md,
    minHeight: 88,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    opacity: 0.45,
  },
  textGroup: {
    gap: 2,
  },
  title: {
    ...Typography.label,
    color: Colors.textPrimary,
    fontWeight: '600',
    fontSize: 13,
  },
  description: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
