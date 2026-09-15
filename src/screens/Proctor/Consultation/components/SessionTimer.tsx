/**
 * SessionTimer — Live consultation duration & earnings tracker
 */
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ConsultationType } from '@/data/proctor';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

type SessionTimerProps = {
  ratePerMin: number;
  consultationType: ConsultationType;
  isActive: boolean;
};

export function SessionTimer({
  ratePerMin,
  consultationType,
  isActive,
}: SessionTimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const minutesElapsed = Math.max(1, Math.ceil(seconds / 60));
  const currentEarnings = minutesElapsed * ratePerMin;

  return (
    <View style={styles.container}>
      {/* Live status badge */}
      <View style={styles.leftGroup}>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE {consultationType.toUpperCase()}</Text>
        </View>
        <Text style={styles.rateText}>₹{ratePerMin}/min</Text>
      </View>

      {/* Timer & running earnings */}
      <View style={styles.rightGroup}>
        <View style={styles.timeBox}>
          <Ionicons name="time-outline" size={16} color={Colors.textPrimary} />
          <Text style={styles.timeText}>{formatTime(seconds)}</Text>
        </View>

        <View style={styles.earningsBox}>
          <Text style={styles.earningsLabel}>Earned:</Text>
          <Text style={styles.earningsText}>₹{currentEarnings}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    ...Shadows.xs,
  },
  leftGroup: {
    gap: 2,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: Radius.pill,
    backgroundColor: Colors.danger,
  },
  liveText: {
    ...Typography.caption,
    fontWeight: '800',
    color: Colors.danger,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  rateText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.backgroundCream,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.sm,
  },
  timeText: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textPrimary,
    fontSize: 14,
    fontVariant: ['tabular-nums'],
  },
  earningsBox: {
    alignItems: 'flex-end',
  },
  earningsLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
  },
  earningsText: {
    ...Typography.cardTitle,
    color: Colors.accentForest,
    fontWeight: '800',
    fontSize: 15,
  },
});
