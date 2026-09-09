/**
 * PrivacyPolicyScreen — Static Legal Content
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
    title: '1. Information We Collect',
    body: 'We collect the information you provide when creating your astrologer profile — name, contact details, expertise, bank account details for payouts — along with session metadata such as consultation duration and ratings.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'Your information is used to match you with clients, process payouts, improve platform recommendations, and communicate important updates about your account and sessions.',
  },
  {
    title: '3. Client Data During Consultations',
    body: 'Birth details and notes shared by clients during a consultation are visible only for the duration of that session and are used solely to provide accurate astrological guidance.',
  },
  {
    title: '4. Data Sharing',
    body: 'We do not sell your personal information. Data is shared only with payment processors for payouts and as required by law.',
  },
  {
    title: '5. Data Security',
    body: 'All sensitive data, including banking information, is encrypted in transit and at rest. Access is restricted to authorized systems only.',
  },
  {
    title: '6. Your Rights',
    body: 'You may request a copy of your data, ask us to correct inaccuracies, or request account deletion at any time by contacting Help & Support.',
  },
];

export function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScreenHeader title="Privacy Policy" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.updatedText}>Last updated: 1 September 2026</Text>
        <Text style={styles.introText}>
          This Privacy Policy explains how SoulConnect collects, uses, and protects information for
          astrologers using the proctor platform.
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
