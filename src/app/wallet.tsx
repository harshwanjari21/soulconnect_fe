/**
 * WalletScreen — Seeker/User Wallet & Transaction Ledger
 *
 * Matches Image 4:
 *   - Dark plum balance card with celestial crescent
 *   - Quick Add Money buttons (+₹500, +₹1,000, +₹2,000)
 *   - Transactions history with Consultation Debits & Wallet Credits
 */
import { Ionicons } from '@expo/vector-icons';
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
import Svg, { Circle, Path } from 'react-native-svg';

import {
  BOTTOM_NAV_HEIGHT,
  Colors,
  Radius,
  SCREEN_PADDING_H,
  Shadows,
  Spacing,
  Typography,
} from '@/theme';

type TransactionItem = {
  id: string;
  type: 'debit' | 'credit';
  title: string;
  subtitle: string;
  date: string;
  amount: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  iconName: 'call' | 'add' | 'chatbubble';
};

const INITIAL_TRANSACTIONS: TransactionItem[] = [
  {
    id: 'tx-1',
    type: 'debit',
    title: 'Consultation debit',
    subtitle: 'Dr. Amara Singh',
    date: 'Today • 10:24 AM',
    amount: 450,
    status: 'SUCCESS',
    iconName: 'call',
  },
  {
    id: 'tx-2',
    type: 'credit',
    title: 'Wallet credit',
    subtitle: 'UPI Payment',
    date: 'Oct 22, 2025 • 06:15 PM',
    amount: 1000,
    status: 'SUCCESS',
    iconName: 'add',
  },
  {
    id: 'tx-3',
    type: 'debit',
    title: 'Consultation debit',
    subtitle: 'Sania Mirza',
    date: 'Oct 20, 2025',
    amount: 300,
    status: 'SUCCESS',
    iconName: 'chatbubble',
  },
];

export default function WalletScreen() {
  const [balance, setBalance] = useState(1240);
  const [transactions, setTransactions] = useState<TransactionItem[]>(INITIAL_TRANSACTIONS);
  const [selectedQuickAdd, setSelectedQuickAdd] = useState<number>(1000);

  const quickAmounts = [500, 1000, 2000];

  const handleQuickAdd = (amount: number) => {
    setSelectedQuickAdd(amount);
  };

  const handleAddFunds = () => {
    Alert.alert(
      'Recharge Wallet',
      `Add ₹${selectedQuickAdd.toLocaleString()} to your ConsultLive wallet using UPI/Card?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Proceed to Pay',
          onPress: () => {
            const newTx: TransactionItem = {
              id: `tx-${Date.now()}`,
              type: 'credit',
              title: 'Wallet credit',
              subtitle: 'UPI Instant Top-up',
              date: 'Just now',
              amount: selectedQuickAdd,
              status: 'SUCCESS',
              iconName: 'add',
            };
            setBalance((prev) => prev + selectedQuickAdd);
            setTransactions((prev) => [newTx, ...prev]);
            Alert.alert('Success', `₹${selectedQuickAdd} added to your wallet!`);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Wallet</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Total Balance Card */}
        <View style={styles.balanceCard}>
          {/* Subtle Celestial Crescent Watermark */}
          <View style={styles.watermarkCanvas} pointerEvents="none">
            <Svg width={140} height={140} viewBox="0 0 100 100">
              <Path
                d="M 50 10 A 40 40 0 1 0 90 50 A 30 30 0 1 1 50 10 Z"
                fill="rgba(255, 255, 255, 0.08)"
              />
              <Circle cx="75" cy="25" r="4" fill="rgba(215, 166, 74, 0.25)" />
            </Svg>
          </View>

          <View style={styles.balanceCardContent}>
            <Text style={styles.balanceCardLabel}>TOTAL BALANCE</Text>
            <Text style={styles.balanceAmount}>₹{balance.toLocaleString()}.00</Text>

            <TouchableOpacity
              style={styles.addFundsLink}
              onPress={handleAddFunds}
              accessibilityRole="button"
              accessibilityLabel="Add Funds"
            >
              <Text style={styles.addFundsText}>Add Funds</Text>
              <Ionicons name="arrow-forward" size={15} color={Colors.gold} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Add Money Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUICK ADD MONEY</Text>
          <View style={styles.quickAddRow}>
            {quickAmounts.map((amt) => {
              const isSelected = selectedQuickAdd === amt;
              return (
                <TouchableOpacity
                  key={amt}
                  style={[
                    styles.quickAddBtn,
                    isSelected && styles.quickAddBtnSelected,
                  ]}
                  onPress={() => handleQuickAdd(amt)}
                  accessibilityRole="button"
                  accessibilityLabel={`Quick add ${amt}`}
                >
                  <Text
                    style={[
                      styles.quickAddText,
                      isSelected && styles.quickAddTextSelected,
                    ]}
                  >
                    + ₹{amt.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Transactions Section */}
        <View style={styles.section}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Transactions</Text>
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => Alert.alert('Filter', 'Filter by Credits, Debits or Date range')}
            >
              <Text style={styles.filterBtnText}>FILTER</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsList}>
            {transactions.map((tx) => {
              const isDebit = tx.type === 'debit';

              return (
                <View key={tx.id} style={styles.txRow}>
                  {/* Left Icon */}
                  <View style={styles.txIconBox}>
                    <Ionicons
                      name={tx.iconName}
                      size={18}
                      color={Colors.cosmosPlum}
                    />
                  </View>

                  {/* Middle Details */}
                  <View style={styles.txMiddle}>
                    <Text style={styles.txTitle}>{tx.title}</Text>
                    <Text style={styles.txSubtitle}>{tx.subtitle}</Text>
                    <Text style={styles.txDate}>{tx.date}</Text>
                  </View>

                  {/* Right Amount & Status */}
                  <View style={styles.txRight}>
                    <Text
                      style={[
                        styles.txAmount,
                        isDebit ? styles.txAmountDebit : styles.txAmountCredit,
                      ]}
                    >
                      {isDebit ? `-₹${tx.amount}.00` : `+₹${tx.amount.toLocaleString()}.00`}
                    </Text>
                    <Text style={styles.txStatusSuccess}>SUCCESS</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Bottom nav clearance */}
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.xs,
    gap: Spacing.xl,
  },
  balanceCard: {
    backgroundColor: '#35153B',
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    overflow: 'hidden',
    position: 'relative',
    ...Shadows.md,
  },
  watermarkCanvas: {
    position: 'absolute',
    top: -10,
    right: -15,
  },
  balanceCardContent: {
    gap: 4,
  },
  balanceCardLabel: {
    ...Typography.caption,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  balanceAmount: {
    ...Typography.pageTitle,
    color: Colors.backgroundWhite,
    fontSize: 34,
    fontWeight: '800',
    marginTop: 4,
    marginBottom: Spacing.sm,
  },
  addFundsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  addFundsText: {
    ...Typography.caption,
    color: Colors.gold,
    fontWeight: '700',
    fontSize: 13,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.caption,
    fontWeight: '800',
    color: '#8A92A0',
    fontSize: 11,
    letterSpacing: 0.8,
  },
  quickAddRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  quickAddBtn: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.xs,
  },
  quickAddBtnSelected: {
    borderColor: Colors.cosmosPlum,
    borderWidth: 1.5,
  },
  quickAddText: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  quickAddTextSelected: {
    color: Colors.cosmosPlum,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionsTitle: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
    fontSize: 18,
  },
  filterBtn: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  filterBtnText: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.gold,
    fontSize: 11,
    letterSpacing: 0.6,
  },
  transactionsList: {
    gap: Spacing.sm,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.xs,
    gap: Spacing.md,
  },
  txIconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundCream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txMiddle: {
    flex: 1,
    gap: 2,
  },
  txTitle: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  txSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  txDate: {
    ...Typography.caption,
    color: Colors.textTertiary,
    fontSize: 10,
    marginTop: 2,
  },
  txRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  txAmount: {
    ...Typography.cardTitle,
    fontSize: 14,
    fontWeight: '800',
  },
  txAmountDebit: {
    color: '#E53E3E',
  },
  txAmountCredit: {
    color: '#22C55E',
  },
  txStatusSuccess: {
    ...Typography.caption,
    color: '#22C55E',
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 0.5,
  },
});
