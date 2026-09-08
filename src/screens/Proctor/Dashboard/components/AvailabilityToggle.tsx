/**
 * AvailabilityToggle — Astrologer Live Status Controller
 *
 * Segmented control between:
 *  - AVAILABLE (Online & accepting live calls/chats)
 *  - BREAK (Pause incoming calls for short break)
 *  - OFFLINE (Unavailable)
 *
 * The selected segment's fill color communicates status; no separate label/badge needed.
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
  return (
    <View style={styles.card}>
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
    padding: Spacing.sm,
    ...Shadows.xs,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statusBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
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
