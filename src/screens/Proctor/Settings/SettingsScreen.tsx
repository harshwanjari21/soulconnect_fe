/**
 * SettingsScreen — Proctor Settings Page
 *
 * Sections (matching reference design):
 *   Account Setup  — Profile Info, Schedule, Expertise, Bank, Reviews
 *   Preferences    — Push Notifications, Email Notifications
 *   Legal & Support — Privacy, Terms, Help
 *   Log Out button (prominent coral, bottom)
 */
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/common/ScreenHeader';
import { SettingsSection, SettingsSectionData } from '@/components/settings/SettingsSection';
import { BOTTOM_NAV_HEIGHT, Colors, Radius, SCREEN_PADDING_H, Shadows, Spacing, Typography } from '@/theme';

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

  const SECTIONS: SettingsSectionData[] = [
    {
      title: 'Account Setup',
      items: [
        {
          id: 'profile-info',
          label: 'Profile Information',
          subtitle: 'Update your personal details',
          icon: 'person-outline',
          iconBg: Colors.lavender,
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
          onPress: () => router.push('/proctor/expertise' as any),
        },
        {
          id: 'bank',
          label: 'Bank Account',
          subtitle: 'Payout settings & KYC',
          icon: 'business-outline',
          iconBg: Colors.coralSoft,
          iconColor: Colors.accentCoral,
          onPress: () => router.push('/proctor/bank-account' as any),
        },
        {
          id: 'reviews',
          label: 'Client Reviews',
          subtitle: 'View feedback & ratings',
          icon: 'star-half-outline',
          iconBg: Colors.lavender,
          iconColor: Colors.accentViolet,
          onPress: () => router.push('/proctor/reviews' as any),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'push-notifications',
          label: 'Push Notifications',
          subtitle: 'Get instant alerts for new requests',
          icon: 'notifications-outline',
          iconBg: Colors.coralSoft,
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
          onPress: () => router.push('/proctor/privacy-policy' as any),
        },
        {
          id: 'terms',
          label: 'Terms of Service',
          subtitle: 'Review platform terms',
          icon: 'document-text-outline',
          iconBg: Colors.lavender,
          iconColor: Colors.accentViolet,
          onPress: () => router.push('/proctor/terms-of-service' as any),
        },
        {
          id: 'help',
          label: 'Help & Support',
          subtitle: 'Get help with your account',
          icon: 'help-circle-outline',
          iconBg: Colors.goldSoft,
          iconColor: Colors.gold,
          onPress: () => router.push('/proctor/help-support' as any),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScreenHeader title="My Profile" subtitle="Update your details" centered />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {SECTIONS.map((section) => (
          <SettingsSection key={section.title} section={section} titleVariant="heading" />
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
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.lg,
    gap: Spacing.xl,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.coralSoft,
    borderRadius: Radius.xl,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: Colors.coralBorder,
    ...Shadows.xs,
  },
  logoutText: {
    ...Typography.button,
    color: Colors.accentCoral,
    fontSize: 16,
    fontWeight: '700',
  },
});
