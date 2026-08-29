/**
 * GuidanceTile — Single guidance category tile (2-column grid)
 *
 * Intentionally quiet — the tile background is subtle.
 * The icon container is a soft white circle so all icons read consistently
 * regardless of tile background color.
 */
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
        imageStyle={{ opacity: 0.6 }} // Soften the image
      >
        <LinearGradient
          colors={item.gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 1 }} // angle the gradient so the bottom is solid
          style={StyleSheet.absoluteFill}
        />
        
        {/* Extremely subtle celestial geometry integrated into the background */}
        <View style={[StyleSheet.absoluteFill, { opacity: 0.08 }]} pointerEvents="none">
          <PracticePattern width={200} height={100} color={item.iconColor} pattern={item.pattern} />
        </View>

        {/* Content must be positioned relatively to sit on top of the absolute gradient */}
        <View style={styles.content}>
          {/* Top row: icon + subtle chevron */}
          <View style={styles.topRow}>
            <View style={styles.iconContainer}>
              <Ionicons name={item.iconName as any} size={17} color={item.iconColor} />
            </View>
            <Ionicons name="chevron-forward-outline" size={16} color={item.iconColor} style={styles.chevron} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(255,255,255,0.45)',
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
