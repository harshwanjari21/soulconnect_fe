/**
 * SettingsScreen — Proctor Settings Page
 *
 * Sections (matching reference design):
 *   Account Setup  — Profile Info, Schedule, Expertise, Bank, Reviews
 *   Settings       — Push Notifications, Email Notifications
 *   Legal & Support — Privacy, Terms, Help
 *   Log Out button (prominent coral, bottom)
 */
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  BOTTOM_NAV_HEIGHT,
  Colors,
  Radius,
  SCREEN_PADDING_H,
  Shadows,
  Spacing,
  Typography,
} from '@/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface SettingsItem {
  id: string;
  label: string;
  subtitle: string;
  icon: IconName;
  iconBg: string;
  iconColor: string;
  onPress?: () => void;
  toggle?: {
    value: boolean;
    onValueChange: (value: boolean) => void;
  };
}

interface SettingsSection {
  title: string;
  items: SettingsItem[];
}

export function SettingsScreen() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out from SoulConnect?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => router.replace('/' as any),
      },
    ]);
  };

  const SECTIONS: SettingsSection[] = [
    {
      title: 'Account Setup',
      items: [
        {
          id: 'profile-info',
          label: 'Profile Information',
          subtitle: 'Update your personal details',
          icon: 'person-outline',
          iconBg: '#EEE7F5',
          iconColor: Colors.accentViolet,
          onPress: () => router.push('/proctor/edit-profile' as any),
        },
        {
          id: 'schedule',
          label: 'Availability Schedule',
          subtitle: 'Set your working hours',
          icon: 'time-outline',
          iconBg: Colors.goldSoft,
          iconColor: Colors.gold,
          onPress: () => router.push('/proctor/schedule' as any),
        },
        {
          id: 'expertise',
          label: 'Expertise & Categories',
          subtitle: 'Manage tags like Vastu, Kundli',
          icon: 'star-outline',
          iconBg: Colors.tealSoft,
          iconColor: Colors.teal,
          onPress: () => Alert.alert('Expertise & Categories', 'Coming soon.'),
        },
        {
          id: 'bank',
          label: 'Bank Account',
          subtitle: 'Payout settings & KYC',
          icon: 'business-outline',
          iconBg: '#FDECEA',
          iconColor: Colors.accentCoral,
          onPress: () => Alert.alert('Bank Account', 'Coming soon.'),
        },
        {
          id: 'reviews',
          label: 'Client Reviews',
          subtitle: 'View feedback & ratings',
          icon: 'star-half-outline',
          iconBg: '#EEE7F5',
          iconColor: Colors.accentViolet,
          onPress: () => router.push('/proctor/reviews' as any),
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          id: 'push-notifications',
          label: 'Push Notifications',
          subtitle: 'Get instant alerts for new requests',
          icon: 'notifications-outline',
          iconBg: '#FDECEA',
          iconColor: Colors.accentCoral,
          toggle: { value: pushEnabled, onValueChange: setPushEnabled },
        },
        {
          id: 'email-notifications',
          label: 'Email Notifications',
          subtitle: 'Receive updates and summaries via email',
          icon: 'mail-outline',
          iconBg: Colors.tealSoft,
          iconColor: Colors.teal,
          toggle: { value: emailEnabled, onValueChange: setEmailEnabled },
        },
      ],
    },
    {
      title: 'Legal & Support',
      items: [
        {
          id: 'privacy',
          label: 'Privacy Policy',
          subtitle: 'Review how your information is handled',
          icon: 'shield-outline',
          iconBg: Colors.tealSoft,
          iconColor: Colors.teal,
          onPress: () => Alert.alert('Privacy Policy', 'Coming soon.'),
        },
        {
          id: 'terms',
          label: 'Terms of Service',
          subtitle: 'Review platform terms',
          icon: 'document-text-outline',
          iconBg: '#EEE7F5',
          iconColor: Colors.accentViolet,
          onPress: () => Alert.alert('Terms of Service', 'Coming soon.'),
        },
        {
          id: 'help',
          label: 'Help & Support',
          subtitle: 'Get help with your account',
          icon: 'help-circle-outline',
          iconBg: Colors.goldSoft,
          iconColor: Colors.gold,
          onPress: () => Alert.alert('Help & Support', 'Coming soon.'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerTextGroup}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <Text style={styles.headerSubtitle}>Update your details</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.card}>
              {section.items.map((item, index) => {
                const rowContent = (
                  <>
                    <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
                      <Ionicons name={item.icon} size={20} color={item.iconColor} />
                    </View>
                    <View style={styles.rowText}>
                      <Text style={styles.rowLabel}>{item.label}</Text>
                      <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
                    </View>
                    {item.toggle ? (
                      <Switch
                        value={item.toggle.value}
                        onValueChange={item.toggle.onValueChange}
                        trackColor={{ false: Colors.border, true: Colors.teal }}
                        thumbColor={Colors.backgroundWhite}
                        accessibilityLabel={item.label}
                      />
                    ) : (
                      <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
                    )}
                  </>
                );

                return (
                  <React.Fragment key={item.id}>
                    {item.toggle ? (
                      <View style={styles.row}>{rowContent}</View>
                    ) : (
                      <TouchableOpacity
                        style={styles.row}
                        onPress={item.onPress}
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        accessibilityLabel={item.label}
                      >
                        {rowContent}
                      </TouchableOpacity>
                    )}
                    {index < section.items.length - 1 && (
                      <View style={styles.divider} />
                    )}
                  </React.Fragment>
                );
              })}
            </View>
          </View>
        ))}

        {/* Log Out button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Log out"
        >
          <Ionicons name="log-out-outline" size={20} color={Colors.accentCoral} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: BOTTOM_NAV_HEIGHT + Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextGroup: {
    alignItems: 'center',
    gap: 2,
  },
  headerTitle: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
    fontSize: 22,
  },
  headerSubtitle: {
    ...Typography.caption,
    color: Colors.teal,
    fontSize: 13,
    fontWeight: '500',
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.lg,
    gap: Spacing.xl,
  },
  section: { gap: Spacing.sm },
  sectionTitle: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
    fontSize: 18,
  },
  card: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 15,
  },
  rowSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 42 + Spacing.md + SCREEN_PADDING_H,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: '#FDECEA',
    borderRadius: Radius.xl,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#F5C6C2',
    ...Shadows.xs,
  },
  logoutText: {
    ...Typography.button,
    color: Colors.accentCoral,
    fontSize: 16,
    fontWeight: '700',
  },
});
