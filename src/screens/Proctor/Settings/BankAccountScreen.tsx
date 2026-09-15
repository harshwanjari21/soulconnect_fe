/**
 * BankAccountScreen — Payout Bank Details & KYC
 *
 *   - Linked account status badge
 *   - Account Holder, Bank Name, Account Number, IFSC, UPI ID
 *   - KYC verification note
 *   - Save Changes action
 */
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/common/PrimaryButton';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { MOCK_PROCTOR_PROFILE } from '@/data/proctor';
import {
  BOTTOM_NAV_HEIGHT,
  Colors,
  Radius,
  SCREEN_PADDING_H,
  Shadows,
  Spacing,
  Typography,
} from '@/theme';

export function BankAccountScreen() {
  const router = useRouter();
  const [accountHolder, setAccountHolder] = useState(MOCK_PROCTOR_PROFILE.name);
  const [bankName, setBankName] = useState('HDFC Bank');
  const [accountNumber, setAccountNumber] = useState('XXXXXXXX4821');
  const [ifscCode, setIfscCode] = useState('HDFC0001234');
  const [upiId, setUpiId] = useState('amara.singh@okhdfcbank');

  const handleSave = () => {
    if (!accountHolder.trim() || !bankName.trim() || !accountNumber.trim() || !ifscCode.trim()) {
      Alert.alert('Missing Details', 'Please fill in all required bank account fields.');
      return;
    }
    Alert.alert('Bank Details Updated', 'Your payout account details have been saved for review.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScreenHeader title="Bank Account" />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Status Badge */}
          <View style={styles.statusCard}>
            <View style={styles.statusIconCircle}>
              <Ionicons
                name={MOCK_PROCTOR_PROFILE.bankAccountLinked ? 'shield-checkmark' : 'alert-circle'}
                size={20}
                color={MOCK_PROCTOR_PROFILE.bankAccountLinked ? Colors.accentForest : Colors.gold}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.statusTitle}>
                {MOCK_PROCTOR_PROFILE.bankAccountLinked ? 'Account Linked & Verified' : 'Verification Pending'}
              </Text>
              <Text style={styles.statusSubtitle}>
                {MOCK_PROCTOR_PROFILE.bankAccountLinked
                  ? 'Payouts are sent to this account after each withdrawal request.'
                  : 'Complete your KYC to enable withdrawals.'}
              </Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>ACCOUNT HOLDER NAME</Text>
              <TextInput
                style={styles.input}
                value={accountHolder}
                onChangeText={setAccountHolder}
                placeholder="Full name as per bank records"
                placeholderTextColor={Colors.textSecondary}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>BANK NAME</Text>
              <TextInput
                style={styles.input}
                value={bankName}
                onChangeText={setBankName}
                placeholder="e.g. HDFC Bank"
                placeholderTextColor={Colors.textSecondary}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>ACCOUNT NUMBER</Text>
              <TextInput
                style={styles.input}
                value={accountNumber}
                onChangeText={setAccountNumber}
                keyboardType="number-pad"
                placeholder="Enter account number"
                placeholderTextColor={Colors.textSecondary}
              />
            </View>

            <View style={styles.rowTwoCols}>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.fieldLabel}>IFSC CODE</Text>
                <TextInput
                  style={styles.input}
                  value={ifscCode}
                  onChangeText={(t) => setIfscCode(t.toUpperCase())}
                  autoCapitalize="characters"
                  placeholder="HDFC0001234"
                  placeholderTextColor={Colors.textSecondary}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>UPI ID (OPTIONAL)</Text>
              <TextInput
                style={styles.input}
                value={upiId}
                onChangeText={setUpiId}
                autoCapitalize="none"
                placeholder="yourname@upi"
                placeholderTextColor={Colors.textSecondary}
              />
            </View>

            <View style={styles.noteRow}>
              <Ionicons name="lock-closed-outline" size={14} color={Colors.textTertiary} />
              <Text style={styles.noteText}>
                Your banking details are encrypted and used only for processing payouts.
              </Text>
            </View>

            <PrimaryButton label="Save Changes" onPress={handleSave} />
          </View>

          <View style={{ height: BOTTOM_NAV_HEIGHT + Spacing.xxl }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.lg,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.xs,
    marginBottom: Spacing.xl,
  },
  statusIconCircle: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    backgroundColor: Colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTitle: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 14,
  },
  statusSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  form: {
    gap: Spacing.md,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSecondary,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    ...Typography.body,
    color: Colors.textPrimary,
    fontSize: 14,
  },
  rowTwoCols: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    paddingHorizontal: 2,
  },
  noteText: {
    ...Typography.caption,
    color: Colors.textTertiary,
    fontSize: 11,
    flex: 1,
    lineHeight: 15,
  },
});
