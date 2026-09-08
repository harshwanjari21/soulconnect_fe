import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useUser } from '@/data/user/UserContext';
import { BOTTOM_NAV_HEIGHT, Colors, Radius, SCREEN_PADDING_H, Shadows, Spacing, Typography } from '@/theme';

export function SessionsScreen() {
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'PAST'>('UPCOMING');
  const { upcomingSessions, pastSessions } = useUser();
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
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Sessions</Text>
      </View>

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
            Past
          </Text>
        </TouchableOpacity>
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
              <View key={session.id} style={styles.sessionCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.statusBadge}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>Upcoming</Text>
                  </View>
                  <Text style={styles.dateText}>{session.date}</Text>
                </View>

                <View style={styles.cardBody}>
                  <Image source={typeof session.expertImageUri === 'string' ? { uri: session.expertImageUri } : session.expertImageUri} style={styles.avatar} />
                  <View style={styles.info}>
                    <Text style={styles.expertName}>{session.expertName}</Text>
                    <Text style={styles.details}>{session.durationMinutes} mins • ₹{session.cost}</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <TouchableOpacity
                    style={styles.actionBtnPrimary}
                    onPress={() => router.push(`/consultation/${session.expertId}` as any)}
                  >
                    <Ionicons name="call" size={16} color={Colors.backgroundWhite} />
                    <Text style={styles.actionBtnTextPrimary}>Join Call</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )
        ) : (
          pastSessions.length === 0 ? (
            renderEmptyState('PAST')
          ) : (
            pastSessions.map((session) => (
              <View key={session.id} style={styles.sessionCard}>
                <View style={styles.cardHeader}>
                  <View style={[styles.statusBadge, styles.statusBadgePast]}>
                    <Ionicons name="checkmark-circle" size={12} color={Colors.textSecondary} />
                    <Text style={[styles.statusText, { color: Colors.textSecondary }]}>Completed</Text>
                  </View>
                  <Text style={styles.dateText}>{session.date}</Text>
                </View>

                <View style={styles.cardBody}>
                  <Image source={typeof session.expertImageUri === 'string' ? { uri: session.expertImageUri } : session.expertImageUri} style={styles.avatar} />
                  <View style={styles.info}>
                    <Text style={styles.expertName}>{session.expertName}</Text>
                    <Text style={styles.details}>{session.durationMinutes} mins • ₹{session.cost}</Text>
                  </View>
                </View>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  header: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  pageTitle: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
    fontSize: 26,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: SCREEN_PADDING_H,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  tabActive: {
    borderColor: Colors.teal,
  },
  tabText: {
    ...Typography.button,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.teal,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.xs,
    gap: Spacing.md,
  },
  sessionCard: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.xs,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.goldSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  statusBadgePast: {
    backgroundColor: Colors.backgroundCream,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gold,
  },
  statusText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 10,
  },
  dateText: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  expertName: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  details: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: Spacing.sm,
    borderTopWidth: 1,
    borderColor: Colors.borderSubtle,
    paddingTop: Spacing.md,
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
});
