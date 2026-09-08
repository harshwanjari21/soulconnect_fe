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
      route: '/proctor/earnings',
    },
    {
      id: 'minutes',
      label: 'Consult Minutes',
      value: `${metrics.todayMinutes}m`,
      icon: 'time-outline' as const,
      color: Colors.teal,
      route: '/proctor/earnings',
    },
    {
      id: 'sessions',
      label: 'Completed',
      value: `${metrics.completedSessions} calls`,
      icon: 'checkmark-done-outline' as const,
      color: Colors.accentViolet,
      route: '/proctor/schedule',
    },
    {
      id: 'rating',
      label: 'Rating',
      value: `★ ${metrics.rating}`,
      icon: 'star-outline' as const,
      color: Colors.gold,
      route: '/proctor/reviews',
    },
  ];

  const handlePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.row}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => handlePress(item.route)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`${item.label}: ${item.value}`}
          >
            <Ionicons name={item.icon} size={16} color={item.color} />
            <View style={styles.textCol}>
              <Text style={styles.valueText} numberOfLines={1}>
                {item.value}
              </Text>
              <Text style={styles.labelText} numberOfLines={1}>
                {item.label}
              </Text>
            </View>
          </TouchableOpacity>
          {index < items.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    ...Shadows.xs,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.xs,
  },
  textCol: {
    flex: 1,
    gap: 1,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.border,
  },
  valueText: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 13,
  },
  labelText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
  },
});
