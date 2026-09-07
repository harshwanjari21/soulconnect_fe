/**
 * QueueList — Displays waiting seekers in the consultation queue
 */
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ConsultationRequest } from '@/data/proctor';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

type QueueListProps = {
  queue: ConsultationRequest[];
  onAcceptRequest: (request: ConsultationRequest) => void;
  onRejectRequest: (requestId: string) => void;
};

export function QueueList({
  queue,
  onAcceptRequest,
  onRejectRequest,
}: QueueListProps) {
  if (queue.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconBg}>
          <Ionicons name="sparkles-outline" size={28} color={Colors.gold} />
        </View>
        <Text style={styles.emptyTitle}>Queue is Clear</Text>
        <Text style={styles.emptySubtext}>
          Keep your status Online. Incoming consultation requests from seekers will appear here in real time.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      {queue.map((req) => {
        const typeIcon =
          req.consultationType === 'video'
            ? 'videocam-outline'
            : req.consultationType === 'chat'
            ? 'chatbubble-ellipses-outline'
            : 'call-outline';

        return (
          <View key={req.id} style={styles.card}>
            {/* Header: Client info & Type badge */}
            <View style={styles.topRow}>
              <View style={styles.clientRow}>
                <Image
                  source={{ uri: req.clientAvatar }}
                  style={styles.avatar}
                  contentFit="cover"
                />
                <View style={styles.clientInfo}>
                  <Text style={styles.clientName}>{req.clientName}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.waitingText}>
                      Waiting: {req.waitingDurationSec}s
                    </Text>
                    <Text style={styles.dotSeparator}>•</Text>
                    <Text style={styles.rateText}>₹{req.ratePerMin}/min</Text>
                  </View>
                </View>
              </View>

              <View style={styles.typeBadge}>
                <Ionicons name={typeIcon as any} size={14} color={Colors.teal} />
                <Text style={styles.typeText}>
                  {req.consultationType.toUpperCase()}
                </Text>
              </View>
            </View>

            {/* Topic & Birth Preview */}
            <View style={styles.topicBox}>
              <Text style={styles.topicLabel}>Inquiry:</Text>
              <Text style={styles.topicText} numberOfLines={2}>
                {req.topic}
              </Text>
            </View>

            <View style={styles.birthPillsRow}>
              <View style={styles.birthPill}>
                <Ionicons name="calendar-outline" size={12} color={Colors.textSecondary} />
                <Text style={styles.birthPillText}>{req.clientBirthDetails.dob}</Text>
              </View>
              <View style={styles.birthPill}>
                <Ionicons name="time-outline" size={12} color={Colors.textSecondary} />
                <Text style={styles.birthPillText}>{req.clientBirthDetails.tob}</Text>
              </View>
              <View style={styles.birthPill}>
                <Ionicons name="moon-outline" size={12} color={Colors.gold} />
                <Text style={styles.birthPillText}>{req.clientBirthDetails.moonSign}</Text>
              </View>
            </View>

            {/* Action buttons */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.declineBtn}
                onPress={() => onRejectRequest(req.id)}
                accessibilityRole="button"
                accessibilityLabel="Decline Request"
              >
                <Ionicons name="close" size={18} color={Colors.textSecondary} />
                <Text style={styles.declineText}>Pass</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => onAcceptRequest(req)}
                accessibilityRole="button"
                accessibilityLabel="Accept & Start Consultation"
              >
                <Ionicons name="checkmark-sharp" size={18} color={Colors.backgroundWhite} />
                <Text style={styles.acceptText}>Connect Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.md,
  },
  card: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    ...Shadows.sm,
    gap: Spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: Radius.pill,
    backgroundColor: Colors.border,
  },
  clientInfo: {
    flex: 1,
    gap: 2,
  },
  clientName: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 15,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  waitingText: {
    ...Typography.caption,
    color: Colors.accentCoral,
    fontWeight: '600',
  },
  dotSeparator: {
    color: Colors.border,
  },
  rateText: {
    ...Typography.caption,
    color: Colors.teal,
    fontWeight: '600',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.tealSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  typeText: {
    ...Typography.caption,
    color: Colors.teal,
    fontWeight: '700',
    fontSize: 10,
  },
  topicBox: {
    backgroundColor: Colors.backgroundPrimary,
    padding: Spacing.sm,
    borderRadius: Radius.sm,
    gap: 2,
  },
  topicLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSoftPlum,
    fontSize: 11,
  },
  topicText: {
    ...Typography.secondaryBody,
    color: Colors.textPrimary,
    fontSize: 13,
  },
  birthPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  birthPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.backgroundCream,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.pill,
  },
  birthPillText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontSize: 11,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: 4,
  },
  declineBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
    borderRadius: Radius.md,
    backgroundColor: Colors.backgroundCream,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  declineText: {
    ...Typography.button,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  acceptBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: Radius.md,
    backgroundColor: Colors.teal,
  },
  acceptText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
    fontSize: 14,
    fontWeight: '700',
  },
  emptyContainer: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  emptyIconBg: {
    width: 52,
    height: 52,
    borderRadius: Radius.pill,
    backgroundColor: Colors.goldSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  emptySubtext: {
    ...Typography.secondaryBody,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
    fontSize: 13,
  },
});
