/**
 * GuidanceTile — Single guidance category tile (2-column grid)
 *
 * Intentionally quiet — the tile background is subtle.
 * The icon container is a soft white circle so all icons read consistently
 * regardless of tile background color.
 */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { PracticePattern } from '@/components/common/PracticePattern';
import type { GuidanceCategory } from '@/data/discovery';
import { Colors, Radius, Spacing, Typography } from '@/theme';

type GuidanceTileProps = {
  item: GuidanceCategory;
  onPress?: (item: GuidanceCategory) => void;
};

export function GuidanceTile({ item, onPress }: GuidanceTileProps) {
  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => onPress?.(item)}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={`${item.title}: ${item.description}`}
    >
      <ImageBackground
        source={item.image}
        style={styles.tile}
        // Scale 1.05 zooms in slightly to hide the white border artifacts in the cropped images
        imageStyle={{ opacity: 1, transform: [{ scale: 1.05 }] }}
      >
        {/* Content sits on top of the image */}
        <View style={styles.content}>
          {/* Top row: clean icon (no container) + chevron */}
          <View style={styles.topRow}>
            <Ionicons name={item.iconName as any} size={20} color={item.iconColor} />
            <Ionicons name="chevron-forward-outline" size={14} color={item.iconColor} style={styles.chevron} />
          </View>

          {/* Bottom row: text */}
          <View style={styles.textGroup}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    borderRadius: Radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  tile: {
    flex: 1,
    minHeight: 76,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  chevron: {
    opacity: 0.4,
  },
  textGroup: {
    gap: 2,
  },
  title: {
    ...Typography.cardTitle,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  description: {
    ...Typography.secondaryBody,
    fontWeight: '500',
    color: Colors.textPrimary,
    opacity: 0.8,
  },
});
