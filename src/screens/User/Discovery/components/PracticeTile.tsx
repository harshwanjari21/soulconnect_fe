/**
 * PracticeTile — Single spiritual practice tile
 *
 * 3-column grid tile with:
 *   - Practice-specific geometric SVG background pattern
 *   - Ionicons icon (consistent stroke weight)
 *   - Practice name
 */
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

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
        styles.touchable,
        { width: tileWidth, height: tileHeight }
      ]}
      onPress={() => onPress?.(item)}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`Explore ${item.title}`}
    >
      <ImageBackground
        source={item.image}
        style={styles.tile}
        imageStyle={{ opacity: 0.95 }}
      >
        {/* Dark gradient scrim focused only at the bottom to ensure crisp white text */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.9)']}
          locations={[0.4, 0.75, 1]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.content}>
          <Text style={styles.label} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  tile: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  label: {
    ...Typography.label,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.backgroundWhite,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
