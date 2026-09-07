/**
 * ProctorEarningsScreen — Astrologer Revenue, Rates & Payout Management
 */
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  MOCK_COMPLETED_SESSIONS,
  MOCK_PROCTOR_PROFILE,
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

export function ProctorEarningsScreen() {
  const router = useRouter();
  const [profile] = useState(MOCK_PROCTOR_PROFILE);

  const handleWithdraw = () => {
    Alert.alert(
      'Request Payout',
      `Submit withdrawal request for ₹${profile.walletBalance.toLocaleString()} to your linked HDFC Bank account?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Withdrawal',
          onPress: () => {
            Alert.alert('Success', 'Withdrawal request submitted! Payouts are processed within 24 hours.');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Earnings & Wallet</Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push('/proctor' as any)}
        >
          <Ionicons name="arrow-back" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Wallet Balance Card */}
        <View style={styles.walletCard}>
          <View style={styles.walletTop}>
            <View>
              <Text style={styles.walletLabel}>Withdrawable Balance</Text>
              <Text style={styles.walletAmount}>₹{profile.walletBalance.toLocaleString()}</Text>
            </View>
            <View style={styles.bankBadge}>
              <Ionicons name="shield-checkmark" size={14} color={Colors.accentForest} />
              <Text style={styles.bankBadgeText}>Bank Linked</Text>
            </View>
          </View>

          <View style={styles.walletDivider} />

          <View style={styles.walletBottom}>
            <View style={styles.pendingGroup}>
              <Text style={styles.pendingLabel}>Pending Settlement:</Text>
              <Text style={styles.pendingAmount}>₹{profile.pendingWithdrawal.toLocaleString()}</Text>
            </View>

            <TouchableOpacity
              style={styles.withdrawBtn}
              onPress={handleWithdraw}
              accessibilityRole="button"
              accessibilityLabel="Withdraw Funds"
            >
              <Ionicons name="cash-outline" size={16} color={Colors.backgroundWhite} />
              <Text style={styles.withdrawText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rates Per Minute Configuration */}
        <View style={[styles.section, { marginTop: Spacing.lg }]}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => router.push('/proctor/consultation-modes' as any)}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionTitle}>Your Consultation Rates</Text>
            <Text style={styles.editRatesHint}>Tap to change ›</Text>
          </TouchableOpacity>

          <View style={styles.ratesGrid}>
            <TouchableOpacity
              style={styles.rateCard}
              onPress={() => router.push('/proctor/consultation-modes' as any)}
              activeOpacity={0.7}
            >
              <View style={styles.rateIconWrap}>
                <Ionicons name="call-outline" size={18} color={Colors.teal} />
              </View>
              <Text style={styles.rateLabel}>Audio Call</Text>
              <Text style={styles.rateValue}>₹{profile.ratePerMinAudio}/min</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rateCard}
              onPress={() => router.push('/proctor/consultation-modes' as any)}
              activeOpacity={0.7}
            >
              <View style={[styles.rateIconWrap, { backgroundColor: '#EAF5FF' }]}>
                <Ionicons name="videocam-outline" size={18} color={Colors.accentOcean} />
              </View>
              <Text style={styles.rateLabel}>Video Call</Text>
              <Text style={styles.rateValue}>₹{profile.ratePerMinVideo}/min</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rateCard}
              onPress={() => router.push('/proctor/consultation-modes' as any)}
              activeOpacity={0.7}
            >
              <View style={[styles.rateIconWrap, { backgroundColor: Colors.lavender }]}>
                <Ionicons name="chatbubbles-outline" size={18} color={Colors.accentViolet} />
              </View>
              <Text style={styles.rateLabel}>Chat</Text>
              <Text style={styles.rateValue}>₹{profile.ratePerMinChat}/min</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction History */}
        <View style={[styles.section, { marginTop: Spacing.xl }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Consultation Payouts</Text>
            <TouchableOpacity onPress={() => router.push('/proctor/reviews' as any)}>
              <Text style={styles.editRatesHint}>View Reviews ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ledgerList}>
            {MOCK_COMPLETED_SESSIONS.map((sess) => (
              <TouchableOpacity
                key={sess.id}
                style={styles.ledgerRow}
                onPress={() => router.push('/proctor/reviews' as any)}
                activeOpacity={0.7}
              >
                <View style={styles.ledgerLeft}>
                  <Text style={styles.ledgerClient}>{sess.clientName}</Text>
                  <Text style={styles.ledgerType}>
                    {sess.consultationType.toUpperCase()} • {sess.durationMinutes} mins
                  </Text>
                  <Text style={styles.ledgerDate}>{sess.date}, {sess.time}</Text>
                </View>

                <View style={styles.ledgerRight}>
                  <Text style={styles.ledgerAmount}>+₹{sess.earnedAmount}</Text>
                  <Text style={styles.settledText}>Credited</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
  },
  walletCard: {
    backgroundColor: Colors.cosmosPlum,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    ...Shadows.md,
    gap: Spacing.md,
  },
  walletTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  walletLabel: {
    ...Typography.caption,
    color: Colors.goldSoft,
    fontSize: 12,
  },
  walletAmount: {
    ...Typography.pageTitle,
    color: Colors.backgroundWhite,
    fontSize: 32,
    fontWeight: '800',
    marginTop: 4,
  },
  bankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  bankBadgeText: {
    ...Typography.caption,
    color: Colors.goldSoft,
    fontWeight: '700',
    fontSize: 10,
  },
  walletDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  walletBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pendingGroup: {
    gap: 2,
  },
  pendingLabel: {
    ...Typography.caption,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
  },
  pendingAmount: {
    ...Typography.caption,
    color: Colors.gold,
    fontWeight: '700',
    fontSize: 13,
  },
  withdrawBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.teal,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: Radius.pill,
  },
  withdrawText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
    fontSize: 13,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  editRatesHint: {
    ...Typography.caption,
    color: Colors.teal,
    fontWeight: '600',
  },
  ratesGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  rateCard: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 4,
    ...Shadows.xs,
  },
  rateIconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: Colors.tealSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  rateLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  rateValue: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  ledgerList: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    ...Shadows.xs,
  },
  ledgerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  ledgerLeft: {
    gap: 2,
  },
  ledgerClient: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 14,
  },
  ledgerType: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  ledgerDate: {
    ...Typography.caption,
    color: Colors.textTertiary,
    fontSize: 10,
  },
  ledgerRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  ledgerAmount: {
    ...Typography.cardTitle,
    color: Colors.accentForest,
    fontWeight: '700',
    fontSize: 15,
  },
  settledText: {
    ...Typography.caption,
    color: Colors.teal,
    fontWeight: '600',
    fontSize: 11,
  },
});
