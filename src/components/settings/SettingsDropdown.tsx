/**
 * SettingsDropdown — Gear icon dropdown menu
 *
 * Shows a floating menu anchored near the top-right of the screen
 * with the following items:
 *   1. Legal & Support
 *   2. Privacy Policy
 *   3. Terms & Conditions
 *   4. Help
 *   5. Logout (destructive)
 *
 * Usage:
 *   const [open, setOpen] = useState(false);
 *   <SettingsDropdown visible={open} onClose={() => setOpen(false)} />
 */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  destructive?: boolean;
  onPress: () => void;
}

interface SettingsDropdownProps {
  visible: boolean;
  onClose: () => void;
  /** Optional: called after logout is confirmed */
  onLogout?: () => void;
  /** Optional: called when a navigation item is pressed (receives item id) */
  onNavigate?: (id: string) => void;
}

export function SettingsDropdown({
  visible,
  onClose,
  onLogout,
  onNavigate,
}: SettingsDropdownProps) {
  const handleLogout = () => {
    onClose();
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => onLogout?.(),
      },
    ]);
  };

  const handleNavigate = (id: string) => {
    onClose();
    onNavigate?.(id);
  };

  const MENU_ITEMS: MenuItem[] = [
    {
      id: 'legal',
      label: 'Legal & Support',
      icon: 'shield-checkmark-outline',
      onPress: () => handleNavigate('legal'),
    },
    {
      id: 'privacy',
      label: 'Privacy Policy',
      icon: 'lock-closed-outline',
      onPress: () => handleNavigate('privacy'),
    },
    {
      id: 'terms',
      label: 'Terms & Conditions',
      icon: 'document-text-outline',
      onPress: () => handleNavigate('terms'),
    },
    {
      id: 'help',
      label: 'Help',
      icon: 'help-circle-outline',
      onPress: () => handleNavigate('help'),
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: 'log-out-outline',
      destructive: true,
      onPress: handleLogout,
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop — tap to close */}
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* Dropdown panel — stop propagation to prevent backdrop close on inner tap */}
        <Pressable style={styles.menu} onPress={(e) => e.stopPropagation()}>
          {MENU_ITEMS.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={item.onPress}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={item.label}
              >
                <Ionicons
                  name={item.icon}
                  size={18}
                  color={item.destructive ? Colors.accentCoral : Colors.textSecondary}
                  style={styles.menuIcon}
                />
                <Text
                  style={[
                    styles.menuLabel,
                    item.destructive && styles.menuLabelDestructive,
                  ]}
                >
                  {item.label}
                </Text>
                {!item.destructive && (
                  <Ionicons
                    name="chevron-forward"
                    size={14}
                    color={Colors.textTertiary}
                  />
                )}
              </TouchableOpacity>

              {/* Divider between items, not after the last one */}
              {index < MENU_ITEMS.length - 1 && (
                <View style={styles.divider} />
              )}
            </React.Fragment>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    /** Align dropdown to top-right corner below the header */
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 90,
    paddingRight: Spacing.lg,
  },
  menu: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    width: 220,
    ...Shadows.md,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  menuIcon: {
    width: 20,
  },
  menuLabel: {
    ...Typography.secondaryBody,
    color: Colors.textPrimary,
    fontSize: 14,
    flex: 1,
  },
  menuLabelDestructive: {
    color: Colors.accentCoral,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.lg,
  },
});
