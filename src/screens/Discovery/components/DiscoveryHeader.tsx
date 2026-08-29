/**
 * DiscoveryHeader — Top section of the Discovery screen
 *
 * Establishes the ConsultLive visual identity immediately:
 *   - "Discover" in editorial serif
 *   - Subtitle in clean sans
 *   - Notification button (white circle)
 *   - Intentional orbital geometry anchored at top-right
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
  const headerHeight = 96;

  return (
    <View style={[styles.container, { height: headerHeight }]}>
      {/* Orbital geometry — intentional, not decorative */}
      <CelestialBackground
        width={width}
        height={headerHeight}
        color={Colors.gold}
        opacity={0.13}
        variant="header"
      />

      <View style={styles.content}>
        <View style={styles.textGroup}>
          <Text style={styles.title}>Discover</Text>
          <Text style={styles.subtitle}>Astrology, guidance & trusted experts.</Text>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={onNotificationPress}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
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
    justifyContent: 'flex-end',
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  textGroup: {
    flex: 1,
    gap: 3,
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
    marginBottom: 2,
  },
});
