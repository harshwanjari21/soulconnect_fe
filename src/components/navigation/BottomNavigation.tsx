/**
 * BottomNavigation — ConsultLive custom bottom tab bar
 *
 * Tabs: Discover | Sessions | Wallet | Profile
 *
 * Active state:
 *   - Filled icon in teal
 *   - Teal label
 *   - Soft teal pill behind the icon (not a hard top-edge dot)
 *
 * Inactive state:
 *   - Outline icon in muted slate
 *   - Muted slate label
 */
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NAV_ITEMS } from '@/data/discovery';
import {
  BOTTOM_NAV_HEIGHT,
  Colors,
  Radius,
  Shadows,
  Spacing,
  Typography,
} from '@/theme';

export function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const activeId =
    NAV_ITEMS.find((item) =>
      item.route === '/'
        ? pathname === '/' || pathname === '/index'
        : pathname === item.route,
    )?.id ?? 'discover';

  const handlePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          const iconName = (isActive ? item.iconActive : item.iconInactive) as any;

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.tab}
              onPress={() => handlePress(item.route)}
              accessibilityRole="tab"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: isActive }}
            >
              {/* Active pill background behind the icon */}
              <View
                style={[
                  styles.iconPill,
                  isActive && styles.iconPillActive,
                ]}
              >
                <Ionicons
                  name={iconName}
                  size={22}
                  color={isActive ? Colors.navActive : Colors.navInactive}
                />
              </View>

              <Text
                style={[
                  styles.label,
                  { color: isActive ? Colors.navActive : Colors.navInactive },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Bottom safe area fill */}
      {Platform.OS === 'ios' && <View style={styles.iosSafeArea} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.navBackground,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadows.md,
  },
  container: {
    flexDirection: 'row',
    height: BOTTOM_NAV_HEIGHT,
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    height: BOTTOM_NAV_HEIGHT,
  },
  /** Container around the icon — becomes a soft pill when active */
  iconPill: {
    width: 44,
    height: 28,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconPillActive: {
    backgroundColor: Colors.tealSoft,
  },
  label: {
    ...Typography.navLabel,
  },
  iosSafeArea: {
    height: 20,
    backgroundColor: Colors.navBackground,
  },
});
