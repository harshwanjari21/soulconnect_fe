import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Radius, SCREEN_PADDING_H, Shadows, Spacing, Typography } from '@/theme';

const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Your session is starting soon!',
    description: 'Dr. Aman Singh is ready for your consultation in 5 minutes.',
    time: '5m ago',
    icon: 'call',
    iconBg: Colors.tealSoft,
    iconColor: Colors.teal,
    isUnread: true,
  },
  {
    id: 'n2',
    title: 'Daily Horoscope Ready',
    description: 'The stars are aligned perfectly for you today. Read your full daily insight.',
    time: '2h ago',
    icon: 'star',
    iconBg: Colors.goldSoft,
    iconColor: Colors.gold,
    isUnread: true,
  },
  {
    id: 'n3',
    title: 'Recharge Successful',
    description: '₹2000 has been added to your SoulConnect Wallet.',
    time: '1d ago',
    icon: 'wallet',
    iconBg: Colors.backgroundCream,
    iconColor: Colors.textSecondary,
    isUnread: false,
  },
  {
    id: 'n4',
    title: 'Session Completed',
    description: 'Your 15-min palmistry session with Priya Sharma has ended. Please leave a review!',
    time: '3d ago',
    icon: 'checkmark-circle',
    iconBg: Colors.backgroundCream,
    iconColor: Colors.textSecondary,
    isUnread: false,
  },
];

export function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {MOCK_NOTIFICATIONS.map((notif) => (
          <View key={notif.id} style={[styles.notificationCard, notif.isUnread && styles.notificationCardUnread]}>
            <View style={[styles.iconContainer, { backgroundColor: notif.iconBg }]}>
              <Ionicons name={notif.icon as any} size={20} color={notif.iconColor} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.notifTitle}>{notif.title}</Text>
              <Text style={styles.notifDesc} numberOfLines={2}>{notif.description}</Text>
              <Text style={styles.notifTime}>{notif.time}</Text>
            </View>
            {notif.isUnread && <View style={styles.unreadDot} />}
          </View>
        ))}
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
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  backBtn: {
    padding: Spacing.xs,
  },
  pageTitle: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
    fontSize: 20,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    ...Shadows.sm,
  },
  notificationCardUnread: {
    borderColor: Colors.tealSoft,
    backgroundColor: '#FDFAFD',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  notifTitle: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.cosmosPlum,
    marginBottom: 4,
  },
  notifDesc: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 6,
    lineHeight: 18,
  },
  notifTime: {
    ...Typography.caption,
    color: Colors.textTertiary,
    fontSize: 11,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.teal,
    marginTop: 6,
  },
});
