/**
 * DiscoveryHeader — Top section of the Discovery screen
 *
 * Intentionally compact — the status bar safe area is handled by the
 * parent SafeAreaView. This component only adds minimal breathing space
 * between the status bar and the "Discover" heading.
 *
 * Structure (top to bottom):
 *   [safe area inset — handled by parent]
 *   small top padding (8px)
 *   Content row: "Discover" + subtitle | notification bell
 *   bottom padding (14px)
 *   [search below]
 */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { CelestialBackground } from '@/components/common/CelestialBackground';
import { Colors, Radius, Spacing, Typography } from '@/theme';

type DiscoveryHeaderProps = {
  onNotificationPress?: () => void;
};

export function DiscoveryHeader({ onNotificationPress }: DiscoveryHeaderProps) {
  const { width } = useWindowDimensions();
  // Height is auto — padding-driven, not fixed
  // We pass a representative height for the SVG canvas
  const svgHeight = 88;

  return (
    <View style={styles.container}>
      {/* Orbital geometry — uses full width, fixed canvas height for SVG */}
      <View style={[styles.celestialCanvas, { height: svgHeight }]} pointerEvents="none">
        <CelestialBackground
          width={width}
          height={svgHeight}
          color={Colors.gold}
          opacity={0.16}
          variant="header"
        />
      </View>

      {/* Content — sits above the celestial layer visually */}
      <View style={styles.content}>
        <View style={styles.textGroup}>
          <Text style={styles.title} accessibilityRole="header">Discover</Text>
          <Text style={styles.subtitle}>Astrology, guidance & trusted experts.</Text>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={onNotificationPress}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="notifications-outline" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundPrimary,
    overflow: 'hidden',
    paddingTop: Spacing.sm,           // small breathing space after safe area
    paddingBottom: Spacing.md + 2,    // 14px — measured breathing before search
    paddingHorizontal: Spacing.lg,
  },
  /** Celestial SVG canvas — absolute behind content */
  celestialCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textGroup: {
    flex: 1,
    gap: 4,
  },
  title: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.heroSubtitle,
    color: Colors.textSecondary,
  },
  notificationButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginLeft: Spacing.md,
    marginTop: 2,
  },
});
