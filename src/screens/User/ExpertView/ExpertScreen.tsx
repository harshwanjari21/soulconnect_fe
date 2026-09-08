import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EXPERTS } from '@/data/discovery';
import { useUser } from '@/data/user/UserContext';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

export function ExpertScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { walletBalance, bookSession } = useUser();
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
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
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
  const actionLabel = isAvailable ? 'Connect Now' : isInSession ? 'Join Queue' : 'Book Session';
  const actionBtnColor = isAvailable ? Colors.teal : isInSession ? Colors.cosmosAmber : Colors.cosmosPlum;
  
  const minDuration = 5; // Minimum 5 mins required
  const reqBalance = expert.pricePerMin * minDuration;

  const handleAction = () => {
    if (walletBalance < reqBalance) {
      setShowFundsModal(true);
      return;
    }
    
    if (isAvailable) {
      setShowConfirmModal(true);
    } else if (isInSession) {
      setShowQueueModal(true);
    } else {
      setShowScheduleModal(true);
    }
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
      durationMinutes: 15, // Mock default duration
      cost: expert.pricePerMin * 15,
    });
    
    if (success) {
      if (isAvailable) {
        router.push(`/consultation/${expert.id}` as any);
      } else {
        router.push('/sessions');
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Header Background */}
        <View style={styles.headerBackground}>
          <SafeAreaView edges={['top']} style={styles.heroNav}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* Content Body */}
        <View style={styles.body}>
          {/* Floating Profile Image */}
          <View style={styles.profileImageContainer}>
            <Image source={typeof expert.imageUri === 'string' ? { uri: expert.imageUri } : expert.imageUri} style={styles.profileImage} />
            {expert.isVerified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.backgroundWhite} />
              </View>
            )}
          </View>

          <View style={styles.titleRow}>
            <Text style={styles.name}>{expert.name}</Text>
          </View>
          <Text style={styles.specialty}>{expert.specialty}</Text>
          <Text style={styles.experience}>{expert.experienceYears} Years Experience</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Ionicons name="star" size={20} color={Colors.gold} />
              <View style={styles.statTextGroup}>
                <Text style={styles.statValue}>{expert.rating}</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Ionicons name="people" size={20} color={Colors.teal} />
              <View style={styles.statTextGroup}>
                <Text style={styles.statValue}>{expert.totalConsultations}+</Text>
                <Text style={styles.statLabel}>Consults</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About {expert.name.split(' ')[0]}</Text>
            <Text style={styles.bioText}>
              {expert.name} is a highly respected practitioner specializing in {expert.specialty}. With over {expert.experienceYears} years of experience, they have guided thousands of individuals toward clarity and peace. Let their expertise illuminate your path.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Persistent Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.statusCol}>
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, isAvailable ? styles.dotAvailable : styles.dotOffline]} />
            <Text style={styles.statusText}>{isAvailable ? 'Available Now' : expert.status.replace('_', ' ')}</Text>
          </View>
          <Text style={styles.priceText}>₹{expert.pricePerMin}/min</Text>
        </View>

        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: actionBtnColor }]} onPress={handleAction}>
          <Text style={styles.actionBtnText}>{actionLabel}</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Modal (Mock) */}
      {showConfirmModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Confirm Consultation</Text>
            <Text style={styles.modalText}>
              You are about to connect with {expert.name}.
              {'\n\n'}Rate: ₹{expert.pricePerMin}/min
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

      {/* Queue Modal (Mock) */}
      {showQueueModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Join Queue</Text>
            <Text style={styles.modalText}>
              {expert.name} is currently in a session. 
              {'\n\n'}Estimated wait time: ~15 mins.
              {'\n'}Do you want to join the queue?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setShowQueueModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalConfirm, { backgroundColor: Colors.cosmosAmber }]} onPress={confirmBooking}>
                <Text style={styles.modalConfirmText}>Join Queue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Schedule Modal (Mock) */}
      {showScheduleModal && (
        <View style={styles.modalOverlayBottomSheet}>
          <View style={styles.bottomSheetCard}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.modalTitle}>Book Session</Text>
              <TouchableOpacity onPress={() => setShowScheduleModal(false)}>
                <Ionicons name="close" size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalText}>Select an available slot for {expert.name}:</Text>
            
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
                  <Text style={[styles.slotPillText, selectedSlot === slot && styles.slotPillTextActive]}>{slot}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={[styles.fullWidthConfirmBtn, !selectedSlot && styles.fullWidthConfirmBtnDisabled]}
              disabled={!selectedSlot}
              onPress={confirmBooking}
            >
              <Text style={styles.modalConfirmText}>Book for {selectedSlot || '...'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Insufficient Funds Modal (Mock) */}
      {showFundsModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Insufficient Balance</Text>
            <Text style={styles.modalText}>
              You need at least 5 minutes of balance (₹{reqBalance}) to start this consultation.
              Your current balance is ₹{walletBalance}.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setShowFundsModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirm} onPress={() => { setShowFundsModal(false); router.push('/wallet'); }}>
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
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  errorHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  scrollContent: {
    paddingBottom: 120, // Less gap for bottom bar
  },
  headerBackground: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.cosmosPlum,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  heroNav: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    paddingHorizontal: Spacing.xl,
    marginTop: -60,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.backgroundPrimary,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: Colors.gold,
    borderRadius: 12,
    padding: 2,
    borderWidth: 2,
    borderColor: Colors.backgroundPrimary,
  },
  titleRow: {
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
    fontSize: 24,
    textAlign: 'center',
  },
  specialty: {
    ...Typography.cardTitle,
    color: Colors.teal,
    fontSize: 16,
    textAlign: 'center',
  },
  experience: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundWhite,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.xl,
    marginTop: Spacing.xl,
    width: '100%',
    justifyContent: 'space-around',
    ...Shadows.sm,
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statTextGroup: {
    alignItems: 'flex-start',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  statValue: {
    ...Typography.label,
    color: Colors.textPrimary,
    fontSize: 14,
  },
  section: {
    marginTop: Spacing.xl,
    width: '100%',
    backgroundColor: Colors.backgroundWhite,
    padding: Spacing.lg,
    borderRadius: Radius.xl,
    ...Shadows.xs,
  },
  sectionTitle: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  bioText: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: 40,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    ...Shadows.lg,
  },
  statusCol: {
    gap: 2,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotAvailable: {
    backgroundColor: Colors.accentForest,
  },
  dotOffline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.textTertiary,
  },
  statusText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  priceText: {
    ...Typography.price,
    color: Colors.textPrimary,
  },
  actionBtn: {
    backgroundColor: Colors.teal,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
  },
  actionBtnText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(63, 41, 64, 0.4)', // cosmosPlum with opacity
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
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  modalTitle: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  modalText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.md,
  },
  modalCancel: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  modalCancelText: {
    ...Typography.button,
    color: Colors.textSecondary,
  },
  modalConfirm: {
    backgroundColor: Colors.teal,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.pill,
  },
  modalConfirmText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
  },
  modalOverlayBottomSheet: {
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
    paddingBottom: 40,
    ...Shadows.lg,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  dateScroll: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    marginTop: Spacing.sm,
  },
  datePill: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.backgroundCream,
    borderRadius: Radius.pill,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  datePillText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  slotPill: {
    width: '30%',
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.md,
  },
  slotPillActive: {
    backgroundColor: Colors.tealSoft,
    borderColor: Colors.teal,
  },
  slotPillText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  slotPillTextActive: {
    color: Colors.teal,
  },
  fullWidthConfirmBtn: {
    backgroundColor: Colors.teal,
    paddingVertical: 16,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  fullWidthConfirmBtnDisabled: {
    backgroundColor: Colors.border,
  },
});
