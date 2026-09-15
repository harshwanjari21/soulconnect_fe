/**
 * IncomingRequestModal — Real-time consultation incoming alert modal
 */
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ConsultationRequest } from '@/data/proctor';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

type IncomingRequestModalProps = {
  request: ConsultationRequest | null;
  visible: boolean;
  onAccept: (request: ConsultationRequest) => void;
  onDecline: (requestId: string) => void;
};

export function IncomingRequestModal({
  request,
  visible,
  onAccept,
  onDecline,
}: IncomingRequestModalProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(30);

  useEffect(() => {
    if (!visible || !request) {
      setSecondsRemaining(30);
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onDecline(request.id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [visible, request]);

  if (!request) return null;

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header & Rings */}
          <View style={styles.header}>
            <View style={styles.callBadge}>
              <Ionicons name="call" size={16} color={Colors.teal} />
              <Text style={styles.callBadgeText}>INCOMING CONSULTATION</Text>
            </View>
            <View style={styles.timerPill}>
              <Ionicons name="timer-outline" size={14} color={Colors.accentCoral} />
              <Text style={styles.timerText}>{secondsRemaining}s</Text>
            </View>
          </View>

          {/* Client Avatar & Name */}
          <View style={styles.clientSection}>
            <Image
              source={{ uri: request.clientAvatar }}
              style={styles.avatar}
              contentFit="cover"
            />
            <Text style={styles.clientName}>{request.clientName}</Text>
            <Text style={styles.rateSubtitle}>
              {request.consultationType.toUpperCase()} CONSULTATION • ₹{request.ratePerMin}/min
            </Text>
          </View>

          {/* Topic & Birth snapshot */}
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Inquiry Topic:</Text>
            <Text style={styles.topicText}>{request.topic}</Text>

            <View style={styles.divider} />

            <View style={styles.birthGrid}>
              <View style={styles.birthCol}>
                <Text style={styles.birthKey}>DOB</Text>
                <Text style={styles.birthVal}>{request.clientBirthDetails.dob}</Text>
              </View>
              <View style={styles.birthCol}>
                <Text style={styles.birthKey}>TOB</Text>
                <Text style={styles.birthVal}>{request.clientBirthDetails.tob}</Text>
              </View>
              <View style={styles.birthCol}>
                <Text style={styles.birthKey}>Moon Sign</Text>
                <Text style={styles.birthVal}>{request.clientBirthDetails.moonSign}</Text>
              </View>
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.declineButton}
              onPress={() => onDecline(request.id)}
              accessibilityRole="button"
              accessibilityLabel="Decline"
            >
              <Ionicons name="close-circle-outline" size={20} color={Colors.accentCoral} />
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => onAccept(request)}
              accessibilityRole="button"
              accessibilityLabel="Accept & Start"
            >
              <Ionicons name="call" size={20} color={Colors.backgroundWhite} />
              <Text style={styles.acceptButtonText}>Accept & Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.lg,
    gap: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.tealSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  callBadgeText: {
    ...Typography.caption,
    color: Colors.teal,
    fontWeight: '700',
    fontSize: 10,
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.dangerSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  timerText: {
    ...Typography.caption,
    color: Colors.accentCoral,
    fontWeight: '700',
  },
  clientSection: {
    alignItems: 'center',
    gap: 4,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: Radius.pill,
    borderWidth: 2,
    borderColor: Colors.teal,
  },
  clientName: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
    fontSize: 18,
  },
  rateSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: Colors.backgroundPrimary,
    padding: Spacing.md,
    borderRadius: Radius.md,
    gap: Spacing.xs,
  },
  infoLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSoftPlum,
  },
  topicText: {
    ...Typography.secondaryBody,
    color: Colors.textPrimary,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  birthGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  birthCol: {
    gap: 2,
  },
  birthKey: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
  },
  birthVal: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textPrimary,
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: 4,
  },
  declineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: Radius.md,
    backgroundColor: Colors.dangerSoftAlt,
    borderWidth: 1,
    borderColor: Colors.dangerBorder,
  },
  declineButtonText: {
    ...Typography.button,
    color: Colors.accentCoral,
    fontWeight: '700',
  },
  acceptButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: Radius.md,
    backgroundColor: Colors.teal,
    ...Shadows.sm,
  },
  acceptButtonText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
    fontWeight: '700',
  },
});
