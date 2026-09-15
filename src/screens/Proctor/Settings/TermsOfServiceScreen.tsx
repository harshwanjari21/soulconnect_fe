/**
 * TermsOfServiceScreen — Static Legal Content
 */
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/common/ScreenHeader';
import {
  BOTTOM_NAV_HEIGHT,
  Colors,
  SCREEN_PADDING_H,
  Spacing,
  Typography,
} from '@/theme';

const SECTIONS = [
  {
    title: '1. Astrologer Eligibility',
    body: 'You must provide accurate credentials, expertise, and identity verification to be listed as an astrologer on SoulConnect. We may suspend accounts that provide false information.',
  },
  {
    title: '2. Conduct During Consultations',
    body: 'You agree to provide guidance in good faith, treat clients respectfully, and avoid making guaranteed predictions of financial, medical, or legal outcomes.',
  },
  {
    title: '3. Fees & Payouts',
    body: 'SoulConnect deducts a platform commission from each consultation before crediting your wallet. Payouts are processed to the bank account linked in your settings within the stated payout window.',
  },
  {
    title: '4. Cancellations & Availability',
    body: 'You are responsible for keeping your availability schedule up to date. Repeated missed sessions while marked "Available" may affect your visibility ranking.',
  },
  {
    title: '5. Reviews & Ratings',
    body: 'Client reviews are published as submitted. You may publicly reply to reviews but may not request their removal except in cases of abuse or policy violation.',
  },
  {
    title: '6. Account Suspension',
    body: 'SoulConnect reserves the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or receive repeated verified complaints.',
  },
  {
    title: '7. Changes to These Terms',
    body: 'We may update these Terms of Service from time to time. Continued use of the platform after changes take effect constitutes acceptance of the revised terms.',
  },
];

export function TermsOfServiceScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScreenHeader title="Terms of Service" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.updatedText}>Last updated: 1 September 2026</Text>
        <Text style={styles.introText}>
          These Terms of Service govern your use of the SoulConnect proctor platform as a listed
          astrologer. By continuing to use the app, you agree to the terms below.
        </Text>

        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}

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
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.lg,
  },
  updatedText: {
    ...Typography.caption,
    color: Colors.textTertiary,
    fontSize: 12,
    marginBottom: Spacing.sm,
  },
  introText: {
    ...Typography.secondaryBody,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: Spacing.xl,
  },
  section: {
    marginBottom: Spacing.lg,
    gap: Spacing.xs,
  },
  sectionTitle: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 15,
  },
  sectionBody: {
    ...Typography.secondaryBody,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
});
