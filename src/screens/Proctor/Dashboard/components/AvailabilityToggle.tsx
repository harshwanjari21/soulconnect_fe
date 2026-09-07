/**
 * AvailabilityToggle — Astrologer Live Status Controller
 *
 * Toggles between:
 *  - AVAILABLE (Online & accepting live calls/chats)
 *  - BREAK (Pause incoming calls for short break)
 *  - OFFLINE (Unavailable)
 */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ProctorStatus } from '@/data/proctor';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

type AvailabilityToggleProps = {
  status: ProctorStatus;
  onStatusChange: (newStatus: ProctorStatus) => void;
};

export function AvailabilityToggle({
  status,
  onStatusChange,
}: AvailabilityToggleProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'AVAILABLE':
        return {
          label: 'You are Online',
          subtext: 'Ready to receive calls & chats',
          indicatorColor: Colors.online,
          bgBadge: '#E8F8EE',
          icon: 'radio-button-on' as const,
        };
      case 'IN_SESSION':
        return {
          label: 'In Consultation',
          subtext: 'Session in progress',
          indicatorColor: Colors.gold,
          bgBadge: Colors.goldSoft,
          icon: 'call-outline' as const,
        };
      case 'BREAK':
        return {
          label: 'On a Break',
          subtext: 'Incoming calls temporarily paused',
          indicatorColor: Colors.accentAmber,
          bgBadge: '#FFF3DB',
          icon: 'pause-circle-outline' as const,
        };
      case 'OFFLINE':
      default:
        return {
          label: 'You are Offline',
          subtext: 'Turn online to start receiving requests',
          indicatorColor: Colors.offline,
          bgBadge: '#F0F3F7',
          icon: 'radio-button-off' as const,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.statusInfo}>
          <View style={[styles.badge, { backgroundColor: config.bgBadge }]}>
            <View style={[styles.dot, { backgroundColor: config.indicatorColor }]} />
            <Text style={[styles.badgeText, { color: config.indicatorColor }]}>
              {status}
            </Text>
          </View>
          <Text style={styles.title}>{config.label}</Text>
          <Text style={styles.subtitle}>{config.subtext}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[
            styles.statusBtn,
            status === 'AVAILABLE' && styles.statusBtnActiveOnline,
          ]}
          onPress={() => onStatusChange('AVAILABLE')}
          accessibilityRole="button"
          accessibilityLabel="Go Online"
        >
          <Ionicons
            name="radio-button-on"
            size={16}
            color={status === 'AVAILABLE' ? Colors.backgroundWhite : Colors.online}
          />
          <Text
            style={[
              styles.statusBtnText,
              status === 'AVAILABLE' && styles.statusBtnTextActive,
            ]}
          >
            Online
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusBtn,
            status === 'BREAK' && styles.statusBtnActiveBreak,
          ]}
          onPress={() => onStatusChange('BREAK')}
          accessibilityRole="button"
          accessibilityLabel="Take a Break"
        >
          <Ionicons
            name="time-outline"
            size={16}
            color={status === 'BREAK' ? Colors.backgroundWhite : Colors.accentAmber}
          />
          <Text
            style={[
              styles.statusBtnText,
              status === 'BREAK' && styles.statusBtnTextActive,
            ]}
          >
            Break
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusBtn,
            status === 'OFFLINE' && styles.statusBtnActiveOffline,
          ]}
          onPress={() => onStatusChange('OFFLINE')}
          accessibilityRole="button"
          accessibilityLabel="Go Offline"
        >
          <Ionicons
            name="power-outline"
            size={16}
            color={status === 'OFFLINE' ? Colors.backgroundWhite : Colors.textSecondary}
          />
          <Text
            style={[
              styles.statusBtnText,
              status === 'OFFLINE' && styles.statusBtnTextActive,
            ]}
          >
            Offline
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    ...Shadows.xs,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  statusInfo: {
    flex: 1,
    gap: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.pill,
    marginBottom: 2,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: Radius.pill,
  },
  badgeText: {
    ...Typography.caption,
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  title: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.secondaryBody,
    color: Colors.textSecondary,
    fontSize: 13,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
  },
  statusBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: Radius.md,
    backgroundColor: Colors.backgroundCream,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusBtnActiveOnline: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  statusBtnActiveBreak: {
    backgroundColor: Colors.accentAmber,
    borderColor: Colors.accentAmber,
  },
  statusBtnActiveOffline: {
    backgroundColor: Colors.textSecondary,
    borderColor: Colors.textSecondary,
  },
  statusBtnText: {
    ...Typography.caption,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  statusBtnTextActive: {
    color: Colors.backgroundWhite,
  },
});
