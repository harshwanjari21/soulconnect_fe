/**
 * MetricsSummary — Astrologer daily performance snapshot
 *
 * Clickable metric cards:
 *   - Rating -> redirects to /proctor/reviews (View & manage all reviews)
 *   - Today's Earnings / Minutes -> redirects to /proctor/earnings (Wallet & Payouts)
 *   - Completed Sessions -> redirects to /proctor/schedule (Appointments & slots)
 */
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DailyMetrics } from '@/data/proctor';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

type MetricsSummaryProps = {
  metrics: DailyMetrics;
};

export function MetricsSummary({ metrics }: MetricsSummaryProps) {
  const router = useRouter();

  const items = [
    {
      id: 'earnings',
      label: "Today's Earnings",
      value: `₹${metrics.todayEarnings.toLocaleString()}`,
      icon: 'wallet-outline' as const,
      color: Colors.accentForest,
      bgColor: '#EBF7EE',
      route: '/proctor/earnings',
    },
    {
      id: 'minutes',
      label: 'Consult Minutes',
      value: `${metrics.todayMinutes}m`,
      icon: 'time-outline' as const,
      color: Colors.teal,
      bgColor: Colors.tealSoft,
      route: '/proctor/earnings',
    },
    {
      id: 'sessions',
      label: 'Completed',
      value: `${metrics.completedSessions} calls`,
      icon: 'checkmark-done-outline' as const,
      color: Colors.accentViolet,
      bgColor: Colors.lavender,
      route: '/proctor/schedule',
    },
    {
      id: 'rating',
      label: 'Rating',
      value: `★ ${metrics.rating}`,
      icon: 'star-outline' as const,
      color: Colors.gold,
      bgColor: Colors.goldSoft,
      route: '/proctor/reviews',
    },
  ];

  const handlePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.grid}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => handlePress(item.route)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`${item.label}: ${item.value}`}
        >
          <View style={styles.headerRow}>
            <View style={[styles.iconBox, { backgroundColor: item.bgColor }]}>
              <Ionicons name={item.icon} size={18} color={item.color} />
            </View>
            <View style={styles.valueRow}>
              <Text style={styles.valueText}>{item.value}</Text>
              <Ionicons name="chevron-forward" size={13} color={Colors.textTertiary} />
            </View>
          </View>
          <Text style={styles.labelText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  card: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    ...Shadows.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  valueText: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
  labelText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 12,
  },
});
