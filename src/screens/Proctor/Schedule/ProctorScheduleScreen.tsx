/**
 * ProctorScheduleScreen — Astrologer Appointments & Booking Slot Manager
 */
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  MOCK_SCHEDULED_APPOINTMENTS,
  ScheduledAppointment,
} from '@/data/proctor';
import {
  BOTTOM_NAV_HEIGHT,
  Colors,
  Radius,
  SCREEN_PADDING_H,
  Shadows,
  Spacing,
  Typography,
} from '@/theme';

export function ProctorScheduleScreen() {
  const router = useRouter();
  const [appointments] = useState<ScheduledAppointment[]>(MOCK_SCHEDULED_APPOINTMENTS);
  const [selectedDay, setSelectedDay] = useState('Today');

  const days = ['Today', 'Tomorrow', 'Wed, 29 Oct', 'Thu, 30 Oct'];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Appointments</Text>
        <TouchableOpacity style={styles.addSlotBtn}>
          <Ionicons name="add" size={18} color={Colors.teal} />
          <Text style={styles.addSlotText}>Manage Slots</Text>
        </TouchableOpacity>
      </View>

      {/* Date Filter Tabs */}
      <View style={styles.dateSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScroll}>
          {days.map((day) => {
            const isSelected = day === selectedDay;
            return (
              <TouchableOpacity
                key={day}
                style={[styles.dayChip, isSelected && styles.dayChipSelected]}
                onPress={() => setSelectedDay(day)}
              >
                <Text style={[styles.dayChipText, isSelected && styles.dayChipTextSelected]}>
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Working Hours Notice */}
        <View style={styles.noticeCard}>
          <Ionicons name="time" size={18} color={Colors.teal} />
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>Active Slot Window</Text>
            <Text style={styles.noticeSubtext}>
              Morning: 10:00 AM – 01:00 PM • Evening: 04:00 PM – 09:00 PM
            </Text>
          </View>
        </View>

        {/* Appointments List */}
        <View style={styles.list}>
          {appointments.map((app) => (
            <View key={app.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.clientRow}>
                  <Image
                    source={{ uri: app.clientAvatar }}
                    style={styles.avatar}
                    contentFit="cover"
                  />
                  <View>
                    <Text style={styles.clientName}>{app.clientName}</Text>
                    <Text style={styles.serviceText}>{app.serviceType}</Text>
                  </View>
                </View>

                <View style={styles.timeBadge}>
                  <Ionicons name="calendar-outline" size={12} color={Colors.teal} />
                  <Text style={styles.timeBadgeText}>{app.time}</Text>
                </View>
              </View>

              {app.notes && (
                <View style={styles.noteBox}>
                  <Text style={styles.noteText}>Note: {app.notes}</Text>
                </View>
              )}

              <View style={styles.actionRow}>
                <View style={styles.durationPill}>
                  <Ionicons name="hourglass-outline" size={12} color={Colors.textSecondary} />
                  <Text style={styles.durationText}>{app.durationMinutes} mins slot</Text>
                </View>

                <TouchableOpacity
                  style={styles.startBtn}
                  onPress={() => {
                    router.push({
                      pathname: '/proctor/consultation',
                      params: {
                        clientName: app.clientName,
                        topic: app.serviceType,
                        consultationType: 'video',
                        ratePerMin: 65,
                      },
                    } as any);
                  }}
                >
                  <Ionicons name="videocam" size={14} color={Colors.backgroundWhite} />
                  <Text style={styles.startBtnText}>Launch Session</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Clearance for navigation */}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING_H,
    paddingVertical: Spacing.md,
  },
  pageTitle: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
  },
  addSlotBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.tealSoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  addSlotText: {
    ...Typography.caption,
    color: Colors.teal,
    fontWeight: '700',
    fontSize: 12,
  },
  dateSelector: {
    paddingBottom: Spacing.sm,
  },
  dateScroll: {
    paddingHorizontal: SCREEN_PADDING_H,
    gap: Spacing.sm,
  },
  dayChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dayChipSelected: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  dayChipText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  dayChipTextSelected: {
    color: Colors.backgroundWhite,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.xs,
    gap: Spacing.md,
  },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#E8F7F5',
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: '#C6EBE4',
  },
  noticeContent: {
    flex: 1,
    gap: 2,
  },
  noticeTitle: {
    ...Typography.cardTitle,
    color: Colors.teal,
    fontSize: 13,
  },
  noticeSubtext: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontSize: 11,
  },
  list: {
    gap: Spacing.md,
  },
  card: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    ...Shadows.xs,
    gap: Spacing.sm,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    backgroundColor: Colors.border,
  },
  clientName: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 15,
  },
  serviceText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.tealSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  timeBadgeText: {
    ...Typography.caption,
    color: Colors.teal,
    fontWeight: '700',
    fontSize: 11,
  },
  noteBox: {
    backgroundColor: Colors.backgroundCream,
    padding: Spacing.sm,
    borderRadius: Radius.sm,
  },
  noteText: {
    ...Typography.caption,
    color: Colors.textSoftPlum,
    fontSize: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  durationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.teal,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.md,
  },
  startBtnText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
    fontSize: 12,
  },
});
