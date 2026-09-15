import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { useUser, Session } from '@/data/user/UserContext';
import { BOTTOM_NAV_HEIGHT, Colors, Radius, SCREEN_PADDING_H, Shadows, Spacing, Typography } from '@/theme';

export function SessionsScreen() {
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'PAST'>('UPCOMING');
  const [sessionToCancel, setSessionToCancel] = useState<Session | null>(null);
  const { upcomingSessions, pastSessions, cancelSession } = useUser();
  const router = useRouter();

  const renderEmptyState = (type: 'UPCOMING' | 'PAST') => (
    <View style={styles.emptyState}>
      <Ionicons name="time-outline" size={48} color={Colors.tealSoft} />
      <Text style={styles.emptyTitle}>No {type.toLowerCase()} sessions</Text>
      <Text style={styles.emptySubtitle}>
        {type === 'UPCOMING'
          ? "You don't have any sessions scheduled right now."
          : "Your past consultation history will appear here."}
      </Text>
      {type === 'UPCOMING' && (
        <TouchableOpacity style={styles.exploreBtn} onPress={() => router.push('/')}>
          <Text style={styles.exploreBtnText}>Explore Experts</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: Colors.backgroundPrimary }} />
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pageTitle}>Your Sessions</Text>
            <Text style={styles.pageSubtitle}>Manage your spiritual journey</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => router.push('/notifications' as any)}
          >
            <Ionicons name="notifications-outline" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Thematic Light Pill Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'UPCOMING' && styles.tabActive]}
            onPress={() => setActiveTab('UPCOMING')}
          >
            <Text style={[styles.tabText, activeTab === 'UPCOMING' && styles.tabTextActive]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'PAST' && styles.tabActive]}
            onPress={() => setActiveTab('PAST')}
          >
            <Text style={[styles.tabText, activeTab === 'PAST' && styles.tabTextActive]}>
              Past History
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'UPCOMING' ? (
          upcomingSessions.length === 0 ? (
            renderEmptyState('UPCOMING')
          ) : (
            upcomingSessions.map((session) => (
              <View key={session.id} style={styles.upcomingCard}>
                <View style={styles.ticketTop}>
                  <View style={styles.statusBadgeUpcoming}>
                    <View style={styles.statusDotUpcoming} />
                    <Text style={styles.statusTextUpcoming}>Upcoming</Text>
                  </View>
                  <Text style={styles.dateTextUpcoming}>{session.date}</Text>
                </View>

                <View style={styles.cardBody}>
                  <Image source={typeof session.expertImageUri === 'string' ? { uri: session.expertImageUri } : session.expertImageUri} style={styles.avatarUpcoming} />
                  <View style={styles.info}>
                    <Text style={styles.expertNameUpcoming}>{session.expertName}</Text>
                    <Text style={styles.detailsUpcoming}>₹{session.cost}/min • Video Call</Text>
                  </View>
                </View>

                <View style={styles.ticketDivider} />

                <View style={styles.cardFooter}>
                  {session.expertJoined ? (
                    <TouchableOpacity
                      style={styles.actionBtnPrimary}
                      onPress={() => router.push(`/consultation/${session.expertId}` as any)}
                    >
                      <Ionicons name="call" size={16} color={Colors.backgroundWhite} />
                      <Text style={styles.actionBtnTextPrimary}>Join Call</Text>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={styles.actionBtnSecondary}
                        onPress={() => {}}
                      >
                        <Ionicons name="calendar-outline" size={16} color={Colors.teal} />
                        <Text style={styles.actionBtnTextSecondary}>Reschedule</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionBtnSecondary, { borderColor: Colors.accentCoral }]}
                        onPress={() => setSessionToCancel(session)}
                      >
                        <Ionicons name="close-circle-outline" size={16} color={Colors.accentCoral} />
                        <Text style={[styles.actionBtnTextSecondary, { color: Colors.accentCoral }]}>Cancel</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            ))
          )
        ) : (
          pastSessions.length === 0 ? (
            renderEmptyState('PAST')
          ) : (
            pastSessions.map((session) => (
              <View key={session.id} style={styles.pastCard}>
                <View style={styles.ticketTop}>
                  <View style={styles.statusBadgePast}>
                    <Ionicons name="checkmark-circle" size={12} color={Colors.textSecondary} />
                    <Text style={styles.statusTextPast}>Completed</Text>
                  </View>
                  <Text style={styles.dateTextPast}>{session.date}</Text>
                </View>

                <View style={styles.cardBody}>
                  <Image source={typeof session.expertImageUri === 'string' ? { uri: session.expertImageUri } : session.expertImageUri} style={styles.avatarPast} />
                  <View style={styles.info}>
                    <Text style={styles.expertNamePast}>{session.expertName}</Text>
                    <Text style={styles.detailsPast}>₹{session.cost}/min • Video Call</Text>
                  </View>
                </View>

                <View style={styles.ticketDividerPast} />

                <View style={styles.cardFooter}>
                  <TouchableOpacity
                    style={styles.actionBtnSecondary}
                    onPress={() => router.push(`/expert/${session.expertId}` as any)}
                  >
                    <Ionicons name="refresh" size={16} color={Colors.teal} />
                    <Text style={styles.actionBtnTextSecondary}>Consult Again</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )
        )}
        <View style={{ height: BOTTOM_NAV_HEIGHT + Spacing.xxl }} />
      </ScrollView>

      {/* Cancel Confirmation Modal */}
      {sessionToCancel && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Cancel Session</Text>
            <Text style={styles.modalText}>
              Canceling this session with {sessionToCancel.expertName} will charge a cancellation fee equivalent to 1 minute of consultation (₹{sessionToCancel.cost / sessionToCancel.durationMinutes}). The remaining balance will be refunded to your wallet.
              {'\n\n'}Do you wish to proceed?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setSessionToCancel(null)}>
                <Text style={styles.modalCancelText}>Keep Session</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalConfirm} 
                onPress={() => {
                  cancelSession(sessionToCancel.id);
                  setSessionToCancel(null);
                }}
              >
                <Text style={styles.modalConfirmText}>Confirm Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  headerContainer: {
    backgroundColor: Colors.backgroundPrimary,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  notificationButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  pageTitle: {
    ...Typography.pageTitle,
    color: Colors.cosmosPlum,
    fontSize: 28,
  },
  pageSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: SCREEN_PADDING_H,
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  tabActive: {
    backgroundColor: Colors.tealSoft,
    borderColor: Colors.teal,
  },
  tabText: {
    ...Typography.button,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  tabTextActive: {
    color: Colors.teal,
    fontWeight: '800',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.xl,
    gap: Spacing.xl,
  },
  
  // Upcoming Ticket Styling
  upcomingCard: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.tealSoft,
    ...Shadows.sm,
  },
  ticketTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statusBadgeUpcoming: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.goldSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  statusDotUpcoming: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gold,
  },
  statusTextUpcoming: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  dateTextUpcoming: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  avatarUpcoming: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.tealSoft,
  },
  expertNameUpcoming: {
    ...Typography.sectionHeading,
    color: Colors.cosmosPlum,
    fontSize: 19,
  },
  detailsUpcoming: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontSize: 13,
  },
  ticketDivider: {
    height: 1,
    backgroundColor: Colors.borderSubtle,
    marginVertical: Spacing.md,
  },

  // Past Ticket Styling
  pastCard: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    ...Shadows.sm,
  },
  statusBadgePast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.backgroundCream,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  statusTextPast: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '700',
    fontSize: 11,
  },
  dateTextPast: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
  avatarPast: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  expertNamePast: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
    fontSize: 19,
  },
  detailsPast: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontSize: 13,
  },
  ticketDividerPast: {
    height: 1,
    backgroundColor: Colors.borderSubtle,
    marginVertical: Spacing.md,
  },

  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionBtnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.teal,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
  },
  actionBtnTextPrimary: {
    ...Typography.button,
    color: Colors.backgroundWhite,
    fontSize: 14,
  },
  actionBtnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.teal,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
  },
  actionBtnTextSecondary: {
    ...Typography.button,
    color: Colors.teal,
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: Spacing.sm,
  },
  emptyTitle: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
    marginTop: Spacing.md,
  },
  emptySubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
  exploreBtn: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.teal,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
  },
  exploreBtnText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(63, 41, 64, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: Spacing.xl,
  },
  modalCard: {
    width: '100%',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    ...Shadows.lg,
  },
  modalTitle: { ...Typography.sectionHeading, color: Colors.textPrimary, marginBottom: Spacing.sm },
  modalText: { ...Typography.body, color: Colors.textSecondary, marginBottom: Spacing.xl },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: Spacing.md },
  modalCancel: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md },
  modalCancelText: { ...Typography.button, color: Colors.textSecondary },
  modalConfirm: {
    backgroundColor: Colors.accentCoral,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.pill,
  },
  modalConfirmText: { ...Typography.button, color: Colors.backgroundWhite },
});
