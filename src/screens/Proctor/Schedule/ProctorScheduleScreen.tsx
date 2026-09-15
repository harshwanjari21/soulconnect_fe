/**
 * ProctorScheduleScreen — Astrologer Appointments & Working Hours Manager
 *
 *   - Appointments tab: real day-based filtering, status badges,
 *     accept/decline/cancel actions, empty states
 *   - Working Hours tab: per-day toggle with Morning/Evening slot editor
 *     using the native time picker
 */
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/common/PrimaryButton';
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

type ScheduleTab = 'appointments' | 'hours';

type TimeSlot = {
  enabled: boolean;
  start: Date;
  end: Date;
};

type DayAvailability = {
  key: string;
  label: string;
  short: string;
  enabled: boolean;
  morning: TimeSlot;
  evening: TimeSlot;
};

type EditingSlot = {
  dayKey: string;
  slot: 'morning' | 'evening';
  edge: 'start' | 'end';
};

const time = (h: number, m: number) => new Date(2000, 0, 1, h, m);

const DEFAULT_AVAILABILITY: DayAvailability[] = [
  { key: 'mon', label: 'Monday', short: 'Mon', enabled: true, morning: { enabled: true, start: time(10, 0), end: time(13, 0) }, evening: { enabled: true, start: time(16, 0), end: time(21, 0) } },
  { key: 'tue', label: 'Tuesday', short: 'Tue', enabled: true, morning: { enabled: true, start: time(10, 0), end: time(13, 0) }, evening: { enabled: true, start: time(16, 0), end: time(21, 0) } },
  { key: 'wed', label: 'Wednesday', short: 'Wed', enabled: true, morning: { enabled: true, start: time(10, 0), end: time(13, 0) }, evening: { enabled: true, start: time(16, 0), end: time(21, 0) } },
  { key: 'thu', label: 'Thursday', short: 'Thu', enabled: true, morning: { enabled: true, start: time(10, 0), end: time(13, 0) }, evening: { enabled: true, start: time(16, 0), end: time(21, 0) } },
  { key: 'fri', label: 'Friday', short: 'Fri', enabled: true, morning: { enabled: true, start: time(10, 0), end: time(13, 0) }, evening: { enabled: true, start: time(16, 0), end: time(21, 0) } },
  { key: 'sat', label: 'Saturday', short: 'Sat', enabled: true, morning: { enabled: true, start: time(11, 0), end: time(14, 0) }, evening: { enabled: false, start: time(16, 0), end: time(21, 0) } },
  { key: 'sun', label: 'Sunday', short: 'Sun', enabled: false, morning: { enabled: false, start: time(10, 0), end: time(13, 0) }, evening: { enabled: false, start: time(16, 0), end: time(21, 0) } },
];

const STATUS_META: Record<ScheduledAppointment['status'], { label: string; bg: string; color: string; icon: keyof typeof Ionicons.glyphMap }> = {
  CONFIRMED: { label: 'Confirmed', bg: Colors.tealSoft, color: Colors.teal, icon: 'checkmark-circle' },
  PENDING: { label: 'Pending', bg: Colors.goldSoft, color: Colors.gold, icon: 'time' },
  COMPLETED: { label: 'Completed', bg: Colors.sage, color: Colors.accentForest, icon: 'checkmark-done' },
  CANCELLED: { label: 'Cancelled', bg: Colors.coralSoft, color: Colors.accentCoral, icon: 'close-circle' },
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function buildUpcomingDays(count: number): { label: string; isSpecial: boolean }[] {
  const result: { label: string; isSpecial: boolean }[] = [
    { label: 'Today', isSpecial: true },
    { label: 'Tomorrow', isSpecial: true },
  ];
  const today = new Date();
  for (let i = 2; i < count; i += 1) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const label = d.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' });
    result.push({ label, isSpecial: false });
  }
  return result;
}

export function ProctorScheduleScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ScheduleTab>('appointments');
  const [appointments, setAppointments] = useState<ScheduledAppointment[]>(MOCK_SCHEDULED_APPOINTMENTS);
  const [selectedDay, setSelectedDay] = useState('Today');
  const [availability, setAvailability] = useState<DayAvailability[]>(DEFAULT_AVAILABILITY);
  const [editingSlot, setEditingSlot] = useState<EditingSlot | null>(null);

  const days = useMemo(() => buildUpcomingDays(7), []);

  const filteredAppointments = useMemo(
    () => appointments.filter((app) => app.date === selectedDay),
    [appointments, selectedDay],
  );

  const handleConfirm = (id: string) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'CONFIRMED' } : a)));
  };

  const handleDecline = (id: string) => {
    Alert.alert('Decline Appointment', 'Are you sure you want to decline this booking request?', [
      { text: 'Keep It', style: 'cancel' },
      {
        text: 'Decline',
        style: 'destructive',
        onPress: () => setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'CANCELLED' } : a))),
      },
    ]);
  };

  const handleCancel = (id: string) => {
    Alert.alert('Cancel Appointment', 'This will notify the client that the session is cancelled.', [
      { text: 'Go Back', style: 'cancel' },
      {
        text: 'Cancel Session',
        style: 'destructive',
        onPress: () => setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'CANCELLED' } : a))),
      },
    ]);
  };

  const toggleDayEnabled = (dayKey: string) => {
    setAvailability((prev) =>
      prev.map((d) => (d.key === dayKey ? { ...d, enabled: !d.enabled } : d)),
    );
  };

  const toggleSlotEnabled = (dayKey: string, slot: 'morning' | 'evening') => {
    setAvailability((prev) =>
      prev.map((d) =>
        d.key === dayKey ? { ...d, [slot]: { ...d[slot], enabled: !d[slot].enabled } } : d,
      ),
    );
  };

  const handleTimeChange = (event: any, selected?: Date) => {
    const editing = editingSlot;
    setEditingSlot(null);
    if (!selected || !editing) return;
    setAvailability((prev) =>
      prev.map((d) => {
        if (d.key !== editing.dayKey) return d;
        return {
          ...d,
          [editing.slot]: { ...d[editing.slot], [editing.edge]: selected },
        };
      }),
    );
  };

  const handleSaveAvailability = () => {
    Alert.alert('Working Hours Updated', 'Your availability schedule has been saved.');
  };

  const editingSlotValue = useMemo(() => {
    if (!editingSlot) return null;
    const day = availability.find((d) => d.key === editingSlot.dayKey);
    if (!day) return null;
    return day[editingSlot.slot][editingSlot.edge];
  }, [editingSlot, availability]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Schedule</Text>
        <TouchableOpacity
          style={styles.addSlotBtn}
          onPress={() => setActiveTab('hours')}
          accessibilityRole="button"
          accessibilityLabel="Manage working hours"
        >
          <Ionicons name="options-outline" size={16} color={Colors.teal} />
          <Text style={styles.addSlotText}>Manage Slots</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'appointments' && styles.tabBtnActive]}
          onPress={() => setActiveTab('appointments')}
          accessibilityRole="button"
          accessibilityLabel="Appointments tab"
        >
          <Text style={[styles.tabBtnText, activeTab === 'appointments' && styles.tabBtnTextActive]}>
            Appointments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'hours' && styles.tabBtnActive]}
          onPress={() => setActiveTab('hours')}
          accessibilityRole="button"
          accessibilityLabel="Working hours tab"
        >
          <Text style={[styles.tabBtnText, activeTab === 'hours' && styles.tabBtnTextActive]}>
            Working Hours
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'appointments' ? (
        <>
          {/* Date Filter Tabs */}
          <View style={styles.dateSelector}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScroll}>
              {days.map((day) => {
                const isSelected = day.label === selectedDay;
                return (
                  <TouchableOpacity
                    key={day.label}
                    style={[styles.dayChip, isSelected && styles.dayChipSelected]}
                    onPress={() => setSelectedDay(day.label)}
                    accessibilityRole="button"
                    accessibilityLabel={day.label}
                  >
                    <Text style={[styles.dayChipText, isSelected && styles.dayChipTextSelected]}>
                      {day.label}
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
            {filteredAppointments.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="calendar-clear-outline" size={40} color={Colors.textTertiary} />
                <Text style={styles.emptyTitle}>No appointments</Text>
                <Text style={styles.emptySubtitle}>
                  You have no bookings scheduled for {selectedDay === 'Today' ? 'today' : selectedDay.toLowerCase()}.
                </Text>
              </View>
            ) : (
              <View style={styles.list}>
                {filteredAppointments.map((app) => {
                  const meta = STATUS_META[app.status];
                  const isActionable = app.status === 'CONFIRMED' || app.status === 'PENDING';

                  return (
                    <View key={app.id} style={[styles.card, app.status === 'CANCELLED' && styles.cardMuted]}>
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

                        <View style={[styles.statusBadge, { backgroundColor: meta.bg }]}>
                          <Ionicons name={meta.icon} size={11} color={meta.color} />
                          <Text style={[styles.statusBadgeText, { color: meta.color }]}>{meta.label}</Text>
                        </View>
                      </View>

                      <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                          <Ionicons name="time-outline" size={13} color={Colors.textSecondary} />
                          <Text style={styles.metaText}>{app.time}</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Ionicons name="hourglass-outline" size={13} color={Colors.textSecondary} />
                          <Text style={styles.metaText}>{app.durationMinutes} mins</Text>
                        </View>
                      </View>

                      {app.notes && (
                        <View style={styles.noteBox}>
                          <Text style={styles.noteText}>Note: {app.notes}</Text>
                        </View>
                      )}

                      <View style={styles.actionRow}>
                        {app.status === 'PENDING' && (
                          <>
                            <TouchableOpacity
                              style={styles.declineBtn}
                              onPress={() => handleDecline(app.id)}
                              accessibilityRole="button"
                              accessibilityLabel="Decline appointment"
                            >
                              <Text style={styles.declineBtnText}>Decline</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.confirmBtn}
                              onPress={() => handleConfirm(app.id)}
                              accessibilityRole="button"
                              accessibilityLabel="Confirm appointment"
                            >
                              <Ionicons name="checkmark" size={14} color={Colors.backgroundWhite} />
                              <Text style={styles.confirmBtnText}>Confirm</Text>
                            </TouchableOpacity>
                          </>
                        )}

                        {app.status === 'CONFIRMED' && (
                          <>
                            <TouchableOpacity
                              style={styles.cancelTextBtn}
                              onPress={() => handleCancel(app.id)}
                              accessibilityRole="button"
                              accessibilityLabel="Cancel appointment"
                            >
                              <Text style={styles.cancelTextBtnText}>Cancel</Text>
                            </TouchableOpacity>
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
                              accessibilityRole="button"
                              accessibilityLabel="Launch session"
                            >
                              <Ionicons name="videocam" size={14} color={Colors.backgroundWhite} />
                              <Text style={styles.startBtnText}>Launch Session</Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            <View style={{ height: BOTTOM_NAV_HEIGHT + Spacing.xxl }} />
          </ScrollView>
        </>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hoursIntro}>
            <Ionicons name="information-circle" size={16} color={Colors.teal} />
            <Text style={styles.hoursIntroText}>
              Toggle the days you're available and set your Morning / Evening consultation windows.
            </Text>
          </View>

          <View style={styles.list}>
            {availability.map((day) => (
              <View key={day.key} style={styles.dayCard}>
                <View style={styles.dayCardHeader}>
                  <Text style={styles.dayCardLabel}>{day.label}</Text>
                  <Switch
                    value={day.enabled}
                    onValueChange={() => toggleDayEnabled(day.key)}
                    trackColor={{ false: Colors.border, true: Colors.teal }}
                    thumbColor={Colors.backgroundWhite}
                    accessibilityLabel={`Toggle ${day.label} availability`}
                  />
                </View>

                {day.enabled ? (
                  <View style={styles.slotList}>
                    {(['morning', 'evening'] as const).map((slotKey) => {
                      const slot = day[slotKey];
                      return (
                        <View key={slotKey} style={styles.slotRow}>
                          <View style={styles.slotLabelGroup}>
                            <Ionicons
                              name={slotKey === 'morning' ? 'sunny-outline' : 'moon-outline'}
                              size={15}
                              color={slot.enabled ? Colors.teal : Colors.textTertiary}
                            />
                            <Text style={[styles.slotLabel, !slot.enabled && styles.slotLabelDisabled]}>
                              {slotKey === 'morning' ? 'Morning' : 'Evening'}
                            </Text>
                          </View>

                          {slot.enabled ? (
                            <View style={styles.slotTimesGroup}>
                              <TouchableOpacity
                                style={styles.timeChip}
                                onPress={() => setEditingSlot({ dayKey: day.key, slot: slotKey, edge: 'start' })}
                                accessibilityRole="button"
                                accessibilityLabel={`Edit ${day.label} ${slotKey} start time`}
                              >
                                <Text style={styles.timeChipText}>{formatTime(slot.start)}</Text>
                              </TouchableOpacity>
                              <Text style={styles.slotDash}>–</Text>
                              <TouchableOpacity
                                style={styles.timeChip}
                                onPress={() => setEditingSlot({ dayKey: day.key, slot: slotKey, edge: 'end' })}
                                accessibilityRole="button"
                                accessibilityLabel={`Edit ${day.label} ${slotKey} end time`}
                              >
                                <Text style={styles.timeChipText}>{formatTime(slot.end)}</Text>
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <Text style={styles.slotOffText}>Off</Text>
                          )}

                          <Switch
                            value={slot.enabled}
                            onValueChange={() => toggleSlotEnabled(day.key, slotKey)}
                            trackColor={{ false: Colors.border, true: Colors.tealLight }}
                            thumbColor={Colors.backgroundWhite}
                            style={styles.slotSwitch}
                            accessibilityLabel={`Toggle ${day.label} ${slotKey} slot`}
                          />
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <Text style={styles.dayOffText}>Not available this day</Text>
                )}
              </View>
            ))}
          </View>

          <PrimaryButton label="Save Working Hours" onPress={handleSaveAvailability} />

          <View style={{ height: BOTTOM_NAV_HEIGHT + Spacing.xxl }} />
        </ScrollView>
      )}

      {editingSlot && editingSlotValue && (
        <DateTimePicker
          value={editingSlotValue}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}
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
    fontSize: 24,
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
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: SCREEN_PADDING_H,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 4,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: Colors.cosmosPlum,
  },
  tabBtnText: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSecondary,
    fontSize: 12,
  },
  tabBtnTextActive: {
    color: Colors.backgroundWhite,
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing['4xl'],
    gap: 6,
  },
  emptyTitle: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 16,
    marginTop: Spacing.sm,
  },
  emptySubtitle: {
    ...Typography.secondaryBody,
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
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
  cardMuted: {
    opacity: 0.6,
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  statusBadgeText: {
    ...Typography.caption,
    fontWeight: '700',
    fontSize: 11,
  },
  metaRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    ...Typography.caption,
    color: Colors.textSecondary,
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: 4,
  },
  declineBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  declineBtnText: {
    ...Typography.button,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.accentForest,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.md,
  },
  confirmBtnText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
    fontSize: 12,
  },
  cancelTextBtn: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  cancelTextBtnText: {
    ...Typography.button,
    color: Colors.accentCoral,
    fontSize: 12,
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
  hoursIntro: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.infoBg,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.infoBorder,
    marginBottom: Spacing.md,
  },
  hoursIntroText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontSize: 12,
    flex: 1,
    lineHeight: 17,
  },
  dayCard: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    ...Shadows.xs,
    gap: Spacing.sm,
  },
  dayCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayCardLabel: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 15,
  },
  dayOffText: {
    ...Typography.caption,
    color: Colors.textTertiary,
    fontSize: 12,
  },
  slotList: {
    gap: Spacing.sm,
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  slotLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 78,
  },
  slotLabel: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '600',
    fontSize: 12,
  },
  slotLabelDisabled: {
    color: Colors.textTertiary,
  },
  slotTimesGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  timeChip: {
    backgroundColor: Colors.backgroundCream,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.sm,
  },
  timeChipText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 11,
  },
  slotDash: {
    color: Colors.textTertiary,
    fontSize: 12,
  },
  slotOffText: {
    ...Typography.caption,
    color: Colors.textTertiary,
    fontSize: 12,
    flex: 1,
  },
  slotSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});
