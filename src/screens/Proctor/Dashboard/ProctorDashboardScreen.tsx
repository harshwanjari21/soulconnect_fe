/**
 * ProctorDashboardScreen — Main Astrologer Hub
 */
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CelestialBackground } from '@/components/common/CelestialBackground';
import {
  ConsultationRequest,
  MOCK_ACTIVE_QUEUE,
  MOCK_COMPLETED_SESSIONS,
  MOCK_DAILY_METRICS,
  MOCK_PROCTOR_PROFILE,
  ProctorStatus,
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

import { AvailabilityToggle } from './components/AvailabilityToggle';
import { IncomingRequestModal } from './components/IncomingRequestModal';
import { MetricsSummary } from './components/MetricsSummary';
import { QueueList } from './components/QueueList';

export function ProctorDashboardScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [status, setStatus] = useState<ProctorStatus>('AVAILABLE');
  const [queue, setQueue] = useState<ConsultationRequest[]>(MOCK_ACTIVE_QUEUE);
  const [incomingReq, setIncomingReq] = useState<ConsultationRequest | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const COLLAPSE_RANGE = 40;
  const greetingOpacity = scrollY.interpolate({
    inputRange: [0, COLLAPSE_RANGE],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const greetingHeight = scrollY.interpolate({
    inputRange: [0, COLLAPSE_RANGE],
    outputRange: [18, 0],
    extrapolate: 'clamp',
  });
  const headerPaddingVertical = scrollY.interpolate({
    inputRange: [0, COLLAPSE_RANGE],
    outputRange: [Spacing.md, Spacing.xs],
    extrapolate: 'clamp',
  });

  const handleAcceptRequest = (request: ConsultationRequest) => {
    setIncomingReq(null);
    // Navigate to live consultation workspace with request details
    router.push({
      pathname: '/proctor/consultation',
      params: {
        requestId: request.id,
        clientName: request.clientName,
        consultationType: request.consultationType,
        ratePerMin: request.ratePerMin,
        dob: request.clientBirthDetails.dob,
        tob: request.clientBirthDetails.tob,
        pob: request.clientBirthDetails.pob,
        moonSign: request.clientBirthDetails.moonSign,
        sunSign: request.clientBirthDetails.sunSign,
        lagna: request.clientBirthDetails.lagna,
        topic: request.topic,
      },
    } as any);
  };

  const handleRejectRequest = (requestId: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== requestId));
    if (incomingReq?.id === requestId) {
      setIncomingReq(null);
    }
  };

  const simulateIncomingCall = () => {
    if (queue.length > 0) {
      setIncomingReq(queue[0]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Bar Header — collapses to a single line on scroll */}
      <Animated.View style={[styles.header, { paddingVertical: headerPaddingVertical }]}>
        {/* Orbital geometry — same celestial motif as the Seeker Discovery header */}
        <View style={styles.celestialCanvas} pointerEvents="none">
          <CelestialBackground
            width={width}
            height={70}
            color={Colors.gold}
            opacity={0.30}
            variant="header"
          />
        </View>

        <View style={styles.headerLeft}>
          <Animated.Text
            style={[
              styles.greetingText,
              { opacity: greetingOpacity, height: greetingHeight },
            ]}
          >
            Namaste,
          </Animated.Text>
          <View style={styles.nameRow}>
            <Text style={styles.proctorName}>{MOCK_PROCTOR_PROFILE.name}</Text>
            {MOCK_PROCTOR_PROFILE.isVerified && (
              <Ionicons name="checkmark-circle" size={18} color={Colors.gold} />
            )}
          </View>
        </View>

        {/* Switch back to Customer mode button */}
        <TouchableOpacity
          style={styles.switchModeBtn}
          onPress={() => router.push('/' as any)}
          accessibilityRole="button"
          accessibilityLabel="Switch to Seeker View"
        >
          <Ionicons name="swap-horizontal" size={16} color={Colors.teal} />
          <Text style={styles.switchModeText}>Seeker App</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        {/* Availability Controller */}
        <View style={styles.padded}>
          <AvailabilityToggle status={status} onStatusChange={setStatus} />
        </View>

        {/* Live Consultation Queue */}
        <View style={[styles.padded, { marginTop: Spacing.lg }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.queueTitleGroup}>
              <Text style={styles.sectionTitle}>Live Queue</Text>
              <View style={styles.queueCountBadge}>
                <Text style={styles.queueCountText}>{queue.length}</Text>
              </View>
            </View>

            {queue.length > 0 && (
              <TouchableOpacity onPress={simulateIncomingCall}>
                <Text style={styles.simCallText}>Test call</Text>
              </TouchableOpacity>
            )}
          </View>

          <QueueList
            queue={queue}
            onAcceptRequest={handleAcceptRequest}
            onRejectRequest={handleRejectRequest}
          />
        </View>

        {/* Daily Stats */}
        <View style={[styles.padded, { marginTop: Spacing.xl }]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Today's Overview</Text>
            <TouchableOpacity onPress={() => router.push('/proctor/earnings')}>
              <Text style={styles.seeAllText}>View Wallet ›</Text>
            </TouchableOpacity>
          </View>
          <MetricsSummary metrics={MOCK_DAILY_METRICS} />
        </View>

        {/* Recent Completed Consultations */}
        <View style={[styles.padded, { marginTop: Spacing.xl }]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Recent Consultations</Text>
            <TouchableOpacity onPress={() => router.push('/proctor/reviews' as any)}>
              <Text style={styles.seeAllText}>All Reviews ›</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.historyList}>
            {MOCK_COMPLETED_SESSIONS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.historyCard}
                onPress={() => router.push('/proctor/reviews' as any)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={`Consultation with ${item.clientName}`}
              >
                <View style={styles.historyLeft}>
                  <Text style={styles.historyClient}>{item.clientName}</Text>
                  <Text style={styles.historyTopic}>{item.topic}</Text>
                  <Text style={styles.historyMeta}>
                    {item.date} • {item.time} ({item.durationMinutes} mins)
                  </Text>
                </View>
                <View style={styles.historyRight}>
                  <Text style={styles.historyEarned}>+₹{item.earnedAmount}</Text>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color={Colors.gold} />
                    <Text style={styles.ratingText}>{item.ratingGiven}.0</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom nav clearance */}
        <View style={{ height: BOTTOM_NAV_HEIGHT + Spacing.xxl }} />
      </Animated.ScrollView>

      {/* Modal for incoming call alert */}
      <IncomingRequestModal
        request={incomingReq}
        visible={incomingReq !== null}
        onAccept={handleAcceptRequest}
        onDecline={handleRejectRequest}
      />
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
    backgroundColor: Colors.backgroundPrimary,
    overflow: 'hidden',
  },
  celestialCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
  },
  headerLeft: {
    gap: 2,
    justifyContent: 'center',
  },
  greetingText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 13,
    overflow: 'hidden',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  proctorName: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
    fontSize: 20,
  },
  switchModeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.tealSoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.tealBorder,
  },
  switchModeText: {
    ...Typography.caption,
    color: Colors.teal,
    fontWeight: '700',
    fontSize: 12,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.xs,
  },
  padded: {
    paddingHorizontal: SCREEN_PADDING_H,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
    fontSize: 17,
  },
  seeAllText: {
    ...Typography.caption,
    color: Colors.teal,
    fontWeight: '600',
  },
  queueTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  queueCountBadge: {
    backgroundColor: Colors.accentCoral,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radius.pill,
  },
  queueCountText: {
    ...Typography.caption,
    color: Colors.backgroundWhite,
    fontWeight: '700',
    fontSize: 11,
  },
  simCallText: {
    ...Typography.caption,
    color: Colors.textTertiary,
    fontWeight: '600',
    fontSize: 11,
    textDecorationLine: 'underline',
  },
  historyList: {
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    ...Shadows.xs,
  },
  historyLeft: {
    flex: 1,
    gap: 2,
  },
  historyClient: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 14,
  },
  historyTopic: {
    ...Typography.secondaryBody,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  historyMeta: {
    ...Typography.caption,
    color: Colors.textTertiary,
    fontSize: 11,
    marginTop: 2,
  },
  historyRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  historyEarned: {
    ...Typography.cardTitle,
    color: Colors.accentForest,
    fontWeight: '700',
    fontSize: 15,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.goldSoft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.pill,
  },
  ratingText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 11,
  },
});
