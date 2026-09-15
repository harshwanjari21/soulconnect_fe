import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EXPERTS } from '@/data/discovery';
import { useUser } from '@/data/user/UserContext';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

type ConsultMode = 'video' | 'audio' | 'chat';

const MODE_CONFIG: Record<ConsultMode, { label: string; icon: string; desc: string }> = {
  video: { label: 'Video', icon: 'videocam', desc: 'Face-to-face call' },
  audio: { label: 'Audio', icon: 'call', desc: 'Voice call only' },
  chat: { label: 'Chat', icon: 'chatbubble-ellipses', desc: 'Text consultation' },
};

export function ExpertScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { walletBalance, bookSession } = useUser();
  const [selectedMode, setSelectedMode] = useState<ConsultMode>('video');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFundsModal, setShowFundsModal] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const expert = EXPERTS.find((e) => e.id === id);

  if (!expert) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Expert not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isAvailable = expert.status === 'AVAILABLE';
  const isInSession = expert.status === 'IN_SESSION';

  const getPrice = (mode: ConsultMode) => {
    if (expert.rates) return expert.rates[mode];
    return expert.pricePerMin;
  };

  const selectedPrice = getPrice(selectedMode);
  const reqBalance = selectedPrice * 5;

  const actionLabel = isAvailable ? 'Connect Now' : isInSession ? 'Join Queue' : 'Book Session';
  const actionBtnColor = isAvailable ? Colors.teal : isInSession ? Colors.cosmosAmber : Colors.cosmosPlum;

  const handleAction = () => {
    if (walletBalance < reqBalance) {
      setShowFundsModal(true);
      return;
    }
    if (isAvailable) setShowConfirmModal(true);
    else if (isInSession) setShowQueueModal(true);
    else setShowScheduleModal(true);
  };

  const confirmBooking = () => {
    setShowConfirmModal(false);
    setShowQueueModal(false);
    setShowScheduleModal(false);
    const success = bookSession({
      expertId: expert.id,
      expertName: expert.name,
      expertImageUri: expert.imageUri,
      date: isAvailable ? 'Right Now' : isInSession ? 'In Queue (~15m)' : selectedSlot || 'Later Today',
      durationMinutes: 15,
      cost: selectedPrice * 15,
    });
    if (success) {
      if (isAvailable) router.push(`/consultation/${expert.id}` as any);
      else router.push('/sessions');
    }
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Ionicons key={i} name={i < rating ? 'star' : 'star-outline'} size={13} color={Colors.gold} />
    ));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerBg}>
          <SafeAreaView edges={['top']} style={styles.heroNav}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={22} color={Colors.cosmosPlum} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Astrologer Profile</Text>
            <View style={{ width: 36 }} />
          </SafeAreaView>
        </View>

        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <Image
            source={typeof expert.imageUri === 'string' ? { uri: expert.imageUri } : expert.imageUri}
            style={styles.avatar}
          />
        </View>

        {/* Identity */}
        <View style={styles.identityBlock}>
          <Text style={styles.name}>{expert.name}</Text>
          {expert.isVerified && (
            <View style={styles.verifiedRow}>
              <Ionicons name="checkmark-circle" size={14} color={Colors.accentForest} />
              <Text style={styles.verifiedText}>VERIFIED</Text>
            </View>
          )}
          <Text style={styles.specialtyLine}>
            {expert.specialty} · {expert.experienceYears} Yrs Experience
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <View style={styles.statTopRow}>
              <Text style={styles.statVal}>{expert.rating}</Text>
              <Ionicons name="star" size={14} color={Colors.gold} />
            </View>
            <Text style={styles.statLbl}>
              {expert.reviews?.total ? (expert.reviews.total / 1000).toFixed(1) + 'K' : '1.2K'} REVIEWS
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statVal}>{expert.totalConsultations}</Text>
            <Text style={styles.statLbl}>SESSIONS</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statVal}>98%</Text>
            <Text style={styles.statLbl}>RESPONSE</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>ABOUT</Text>
            <Text style={styles.bioText}>
              {expert.about ||
                `${expert.name} is a highly respected practitioner in ${expert.specialty} with over ${expert.experienceYears} years of guiding seekers toward clarity and peace.`}
            </Text>
          </View>

          {/* Languages */}
          {expert.languages && expert.languages.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>LANGUAGES</Text>
              <View style={styles.chipRow}>
                {expert.languages.map((lang) => (
                  <View key={lang} style={styles.chipTeal}>
                    <Text style={styles.chipTealText}>{lang}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Specialties */}
          {expert.specialtiesList && expert.specialtiesList.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>SPECIALTIES</Text>
              <View style={styles.chipRow}>
                {expert.specialtiesList.map((s) => (
                  <View key={s} style={styles.chipOutline}>
                    <Text style={styles.chipOutlineText}>{s}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Mode Selector Cards */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>CHOOSE CONSULTATION MODE</Text>
            <View style={styles.modeGrid}>
              {(Object.keys(MODE_CONFIG) as ConsultMode[]).map((mode) => {
                const cfg = MODE_CONFIG[mode];
                const price = getPrice(mode);
                const isSelected = selectedMode === mode;
                return (
                  <TouchableOpacity
                    key={mode}
                    style={[styles.modeCard, isSelected && styles.modeCardActive]}
                    onPress={() => setSelectedMode(mode)}
                    activeOpacity={0.85}
                  >
                    <View style={[styles.modeIconCircle, isSelected && styles.modeIconCircleActive]}>
                      <Ionicons
                        name={cfg.icon as any}
                        size={20}
                        color={isSelected ? Colors.backgroundWhite : Colors.cosmosPlum}
                      />
                    </View>
                    <Text style={[styles.modeLabel, isSelected && styles.modeLabelActive]}>
                      {cfg.label}
                    </Text>
                    <Text style={[styles.modePrice, isSelected && styles.modePriceActive]}>
                      ₹{price}/min
                    </Text>
                    <Text style={[styles.modeDesc, isSelected && styles.modeDescActive]}>
                      {cfg.desc}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Reviews Preview */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionLabel}>REVIEWS</Text>
              <TouchableOpacity onPress={() => router.push(`/expert/${expert.id}/reviews` as any)}>
                <Text style={styles.seeAllLink}>See All</Text>
              </TouchableOpacity>
            </View>

            {expert.reviews?.ratingDistribution.map((dist) => (
              <View key={dist.star} style={styles.barRow}>
                <Text style={styles.barStar}>{dist.star}</Text>
                <Ionicons name="star" size={11} color={Colors.gold} />
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${(dist.count / expert.reviews!.total) * 100}%` }]} />
                </View>
                <Text style={styles.barCount}>{dist.count}</Text>
              </View>
            ))}

            <View style={{ marginTop: Spacing.lg, gap: Spacing.md }}>
              {expert.reviews?.recent.map((rev) => (
                <View key={rev.id} style={styles.reviewCard}>
                  <View style={styles.reviewTopRow}>
                    <View>
                      <Text style={styles.reviewUser}>{rev.user}</Text>
                      <Text style={styles.reviewDate}>{rev.date}</Text>
                    </View>
                    <View style={styles.starsRow}>{renderStars(rev.rating)}</View>
                  </View>
                  <Text style={styles.reviewText}>"{rev.text}"</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.seeAllBtn}
              onPress={() => router.push(`/expert/${expert.id}/reviews` as any)}
            >
              <Text style={styles.seeAllBtnText}>See All Reviews</Text>
              <Ionicons name="chevron-forward" size={14} color={Colors.teal} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomLeft}>
          <Text style={styles.bottomModeLabel}>{MODE_CONFIG[selectedMode].label} Consultation</Text>
          <Text style={styles.bottomPrice}>₹{selectedPrice}/min</Text>
        </View>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: actionBtnColor }]}
          onPress={handleAction}
        >
          <Text style={styles.actionBtnText}>{actionLabel}</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Confirm Consultation</Text>
            <Text style={styles.modalText}>
              Starting a {MODE_CONFIG[selectedMode].label} consultation with {expert.name}.{`\n\n`}Rate: ₹{selectedPrice}/min
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setShowConfirmModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirm} onPress={confirmBooking}>
                <Text style={styles.modalConfirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Queue Modal */}
      {showQueueModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Join Queue</Text>
            <Text style={styles.modalText}>
              {expert.name} is currently in a session.{`\n\n`}Estimated wait: ~15 mins.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setShowQueueModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalConfirm, { backgroundColor: Colors.cosmosAmber }]}
                onPress={confirmBooking}
              >
                <Text style={styles.modalConfirmText}>Join Queue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <View style={styles.modalOverlayBottom}>
          <View style={styles.bottomSheetCard}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.modalTitle}>Book Session</Text>
              <TouchableOpacity onPress={() => setShowScheduleModal(false)}>
                <Ionicons name="close" size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalText}>Select a slot for {expert.name}:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
              {['Today', 'Tomorrow', 'Thu, 26', 'Fri, 27'].map((d) => (
                <TouchableOpacity key={d} style={styles.datePill}>
                  <Text style={styles.datePillText}>{d}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.slotGrid}>
              {['09:00 AM', '10:30 AM', '02:00 PM', '04:15 PM', '07:30 PM'].map((slot) => (
                <TouchableOpacity
                  key={slot}
                  style={[styles.slotPill, selectedSlot === slot && styles.slotPillActive]}
                  onPress={() => setSelectedSlot(slot)}
                >
                  <Text style={[styles.slotPillText, selectedSlot === slot && styles.slotPillTextActive]}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.confirmBtn, !selectedSlot && styles.confirmBtnDisabled]}
              disabled={!selectedSlot}
              onPress={confirmBooking}
            >
              <Text style={styles.confirmBtnText}>Book for {selectedSlot || '...'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Funds Modal */}
      {showFundsModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Insufficient Balance</Text>
            <Text style={styles.modalText}>
              You need ₹{reqBalance} (5 mins × ₹{selectedPrice}/min) to start.{`\n\n`}Balance: ₹{walletBalance}
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setShowFundsModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirm}
                onPress={() => { setShowFundsModal(false); router.push('/wallet'); }}
              >
                <Text style={styles.modalConfirmText}>Recharge Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF7F2' },
  errorHeader: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md },
  errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText: { ...Typography.body, color: Colors.textSecondary },
  scrollContent: { paddingBottom: 130 },

  headerBg: { backgroundColor: '#FAF7F2' },
  heroNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xs,
  },
  backBtn: { padding: 6 },
  headerTitle: { ...Typography.sectionHeading, color: Colors.cosmosPlum, fontSize: 17 },

  avatarWrapper: { alignItems: 'center', marginTop: Spacing.md, marginBottom: Spacing.sm },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: Colors.backgroundWhite,
    ...Shadows.sm,
  },

  identityBlock: { alignItems: 'center', paddingHorizontal: Spacing.xl },
  name: { ...Typography.pageTitle, color: Colors.cosmosPlum, fontSize: 24, textAlign: 'center' },
  verifiedRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  verifiedText: {
    ...Typography.caption,
    color: Colors.accentForest,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontSize: 11,
  },
  specialtyLine: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
  },

  statsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    paddingVertical: Spacing.md,
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    ...Shadows.xs,
  },
  statItem: { alignItems: 'center' },
  statTopRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statVal: { ...Typography.sectionHeading, color: Colors.cosmosPlum, fontSize: 18 },
  statLbl: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 2,
  },
  statDivider: { width: 1, height: 36, backgroundColor: Colors.borderSubtle },

  body: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl },
  section: { marginBottom: Spacing.xxl },
  sectionLabel: {
    ...Typography.caption,
    color: '#8A92A0',
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: Spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  seeAllLink: { ...Typography.caption, color: Colors.teal, fontWeight: '700' },
  bioText: { ...Typography.body, color: Colors.textPrimary, lineHeight: 22, fontStyle: 'italic' },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  chipTeal: {
    backgroundColor: Colors.tealSoft,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: Radius.pill,
  },
  chipTealText: { ...Typography.caption, color: Colors.teal, fontWeight: '600' },
  chipOutline: {
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: Radius.pill,
  },
  chipOutlineText: { ...Typography.caption, color: Colors.textPrimary, fontWeight: '500' },

  modeGrid: { flexDirection: 'row', gap: Spacing.md },
  modeCard: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    borderColor: Colors.borderSubtle,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xs,
    gap: 5,
    ...Shadows.xs,
  },
  modeCardActive: { borderColor: Colors.cosmosPlum, backgroundColor: '#F4EEF8' },
  modeIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDE5F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeIconCircleActive: { backgroundColor: Colors.cosmosPlum },
  modeLabel: { ...Typography.label, color: Colors.textPrimary, fontWeight: '700', fontSize: 13 },
  modeLabelActive: { color: Colors.cosmosPlum },
  modePrice: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '700', fontSize: 12 },
  modePriceActive: { color: Colors.cosmosPlum },
  modeDesc: { ...Typography.caption, color: Colors.textTertiary, fontSize: 9, textAlign: 'center' },
  modeDescActive: { color: '#9B7FBB' },

  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 4 },
  barStar: { ...Typography.caption, color: Colors.textSecondary, width: 10 },
  barTrack: {
    flex: 1,
    height: 7,
    backgroundColor: Colors.borderSubtle,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: { height: '100%', backgroundColor: Colors.gold, borderRadius: 4 },
  barCount: { ...Typography.caption, color: Colors.textSecondary, width: 32, textAlign: 'right', fontSize: 10 },

  reviewCard: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    gap: Spacing.xs,
  },
  reviewTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  reviewUser: { ...Typography.label, color: Colors.textPrimary },
  reviewDate: { ...Typography.caption, color: '#8A92A0', fontSize: 10, marginTop: 2 },
  starsRow: { flexDirection: 'row', gap: 2 },
  reviewText: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    fontStyle: 'italic',
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: Spacing.md,
    marginTop: Spacing.sm,
  },
  seeAllBtnText: { ...Typography.button, color: Colors.teal, fontSize: 13 },

  bottomBar: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.backgroundWhite,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
    ...Shadows.lg,
  },
  bottomLeft: { gap: 2 },
  bottomModeLabel: { ...Typography.caption, color: Colors.textSecondary, fontSize: 11 },
  bottomPrice: { ...Typography.price, color: Colors.cosmosPlum, fontSize: 20 },
  actionBtn: { paddingHorizontal: Spacing.xl, paddingVertical: 14, borderRadius: Radius.pill },
  actionBtnText: { ...Typography.button, color: Colors.backgroundWhite },

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
    backgroundColor: Colors.teal,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.pill,
  },
  modalConfirmText: { ...Typography.button, color: Colors.backgroundWhite },

  modalOverlayBottom: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(63, 41, 64, 0.4)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  bottomSheetCard: {
    backgroundColor: Colors.backgroundWhite,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.xl,
    paddingBottom: 50,
    ...Shadows.lg,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  dateScroll: { marginBottom: Spacing.lg, marginTop: Spacing.sm },
  datePill: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.backgroundCream,
    borderRadius: Radius.pill,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  datePillText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.xl },
  slotPill: {
    width: '30%',
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.md,
  },
  slotPillActive: { backgroundColor: Colors.tealSoft, borderColor: Colors.teal },
  slotPillText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  slotPillTextActive: { color: Colors.teal },
  confirmBtn: {
    backgroundColor: Colors.teal,
    paddingVertical: 16,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  confirmBtnDisabled: { backgroundColor: Colors.border },
  confirmBtnText: { ...Typography.button, color: Colors.backgroundWhite },
});


