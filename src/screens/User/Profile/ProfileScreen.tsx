import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useUser } from '@/data/user/UserContext';
import { BOTTOM_NAV_HEIGHT, Colors, Radius, SCREEN_PADDING_H, Shadows, Spacing, Typography } from '@/theme';

type SettingItem = {
  id: string;
  label: string;
  icon: string;
  route: string | null;
  value?: string;
  isToggle?: boolean;
  isDestructive?: boolean;
};

type SettingSection = {
  title: string;
  items: SettingItem[];
};

const SETTINGS_SECTIONS: SettingSection[] = [
  {
    title: 'Account',
    items: [
      { id: 'wallet', label: 'My Wallet', icon: 'wallet-outline', route: '/wallet' },
      { id: 'sessions', label: 'My Sessions', icon: 'time-outline', route: '/sessions' },
      { id: 'password', label: 'Change Password', icon: 'lock-closed-outline', route: null },
      { id: 'saved', label: 'Saved Experts', icon: 'heart-outline', route: null },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: 'notifications_push', label: 'Push Notifications', icon: 'notifications-outline', route: null, isToggle: true },
      { id: 'notifications_email', label: 'Email Notifications', icon: 'mail-outline', route: null, isToggle: true },
      { id: 'language', label: 'Language', icon: 'language-outline', route: null, value: 'English' },
      { id: 'dark_mode', label: 'Dark Mode', icon: 'moon-outline', route: null, isToggle: true },
    ],
  },
  {
    title: 'Support & Legal',
    items: [
      { id: 'help', label: 'Help Center', icon: 'help-circle-outline', route: null },
      { id: 'privacy', label: 'Privacy Policy', icon: 'shield-checkmark-outline', route: null },
      { id: 'logout', label: 'Log Out', icon: 'log-out-outline', route: null, isDestructive: true },
    ],
  },
];

export function ProfileScreen() {
  const router = useRouter();
  const { walletBalance } = useUser();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  const getToggleState = (id: string) => {
    if (id === 'dark_mode') return isDarkMode;
    if (id === 'notifications_push') return pushEnabled;
    if (id === 'notifications_email') return emailEnabled;
    return false;
  };

  const handleToggle = (id: string) => {
    if (id === 'dark_mode') setIsDarkMode(!isDarkMode);
    if (id === 'notifications_push') setPushEnabled(!pushEnabled);
    if (id === 'notifications_email') setEmailEnabled(!emailEnabled);
  };

  const handlePress = (item: any) => {
    if (item.route) {
      router.push(item.route);
    } else if (item.isToggle) {
      handleToggle(item.id);
    } else if (item.isDestructive) {
      Alert.alert('Log Out', 'Are you sure you want to log out?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => router.push('/proctor' as any) },
      ]);
    } else {
      Alert.alert(item.label, 'This feature is coming soon!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Identity Card */}
        <View style={styles.identityCard}>
          <View style={styles.identityLeft}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>AD</Text>
            </View>
            <View style={styles.identityInfo}>
              <Text style={styles.userName}>Aisha Desai</Text>
              <Text style={styles.userPhone}>+91 98765 43210</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn} onPress={() => router.push('/edit-profile' as any)}>
            <Ionicons name="pencil" size={16} color={Colors.teal} />
          </TouchableOpacity>
        </View>

        {/* Zodiac Badge */}
        <View style={styles.zodiacCard}>
          <View style={styles.zodiacLeft}>
            <Ionicons name="moon" size={24} color={Colors.cosmosPlum} />
            <View>
              <Text style={styles.zodiacTitle}>Scorpio</Text>
              <Text style={styles.zodiacSubtitle}>Water Sign • Intense & Intuitive</Text>
            </View>
          </View>
        </View>

        {/* Astrological Data */}
        <View style={styles.astroDataCard}>
          <View style={styles.astroHeader}>
            <Ionicons name="planet" size={20} color={Colors.gold} />
            <Text style={styles.astroHeaderTitle}>Astrological Profile</Text>
          </View>
          <View style={styles.astroGrid}>
            <View style={styles.astroItem}>
              <Text style={styles.astroLabel}>Sun Sign</Text>
              <Text style={styles.astroValue}>Scorpio</Text>
            </View>
            <View style={styles.astroItem}>
              <Text style={styles.astroLabel}>Moon Sign</Text>
              <Text style={styles.astroValue}>Pisces</Text>
            </View>
            <View style={styles.astroItem}>
              <Text style={styles.astroLabel}>Rising (Lagna)</Text>
              <Text style={styles.astroValue}>Cancer</Text>
            </View>
            <View style={styles.astroItem}>
              <Text style={styles.astroLabel}>Nakshatra</Text>
              <Text style={styles.astroValue}>Revati</Text>
            </View>
          </View>
        </View>

        {/* Settings List */}
        <View style={styles.settingsContainer}>
          {SETTINGS_SECTIONS.map((section, idx) => (
            <View key={idx} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionCard}>
                {section.items.map((item, itemIdx) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.row,
                      itemIdx < section.items.length - 1 && styles.rowBorder,
                    ]}
                    onPress={() => handlePress(item)}
                  >
                    <View style={styles.rowLeft}>
                      <Ionicons
                        name={item.icon as any}
                        size={20}
                        color={item.isDestructive ? '#E53E3E' : Colors.cosmosPlum}
                      />
                      <Text
                        style={[
                          styles.rowLabel,
                          item.isDestructive && styles.rowLabelDestructive,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </View>
                    <View style={styles.rowRight}>
                      {item.value && <Text style={styles.rowValue}>{item.value}</Text>}
                      {item.id === 'wallet' && (
                        <Text style={styles.walletValue}>₹{walletBalance}</Text>
                      )}
                      {item.isToggle ? (
                        <View style={[styles.toggleTrack, getToggleState(item.id) && styles.toggleTrackActive]}>
                          <View style={[styles.toggleThumb, getToggleState(item.id) && styles.toggleThumbActive]} />
                        </View>
                      ) : (
                        <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>

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
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  pageTitle: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
    fontSize: 26,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.xs,
    gap: Spacing.lg,
  },
  identityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundWhite,
    padding: Spacing.lg,
    borderRadius: Radius.xl,
    ...Shadows.sm,
  },
  identityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.tealSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...Typography.pageTitle,
    color: Colors.teal,
    fontSize: 22,
  },
  identityInfo: {
    gap: 2,
  },
  userName: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 18,
  },
  userPhone: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  editBtn: {
    padding: Spacing.sm,
    backgroundColor: Colors.backgroundCream,
    borderRadius: Radius.pill,
  },
  zodiacCard: {
    backgroundColor: Colors.backgroundWhite,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.xs,
  },
  zodiacLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  zodiacTitle: {
    ...Typography.cardTitle,
    color: Colors.cosmosPlum,
    fontSize: 16,
  },
  zodiacSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  astroDataCard: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    ...Shadows.xs,
  },
  astroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  astroHeaderTitle: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  astroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  astroItem: {
    width: '45%',
  },
  astroLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  astroValue: {
    ...Typography.body,
    color: Colors.cosmosPlum,
    fontWeight: '600',
  },
  settingsContainer: {
    gap: Spacing.xl,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.caption,
    fontWeight: '800',
    color: '#8A92A0',
    fontSize: 11,
    letterSpacing: 0.8,
    marginLeft: Spacing.xs,
  },
  sectionCard: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...Shadows.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    backgroundColor: Colors.backgroundWhite,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  rowLabel: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  rowLabelDestructive: {
    color: '#E53E3E',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  rowValue: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  walletValue: {
    ...Typography.cardTitle,
    color: Colors.gold,
    fontSize: 15,
    marginRight: Spacing.xs,
  },
  toggleTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleTrackActive: {
    backgroundColor: Colors.teal,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.backgroundWhite,
    ...Shadows.sm,
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },
});
