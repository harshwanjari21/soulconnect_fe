/**
 * HelpSupportScreen — FAQ Accordion & Contact Options
 */
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/common/ScreenHeader';
import { SettingsSection, SettingsSectionData } from '@/components/settings/SettingsSection';
import { BOTTOM_NAV_HEIGHT, Colors, Radius, SCREEN_PADDING_H, Shadows, Spacing, Typography } from '@/theme';

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'How do I receive consultation requests?',
    answer: 'Toggle "Available" on your Dashboard. You will get an incoming request modal whenever a client requests a session while you are online.',
  },
  {
    id: 'faq-2',
    question: 'When are my earnings paid out?',
    answer: 'Payouts are sent to your linked bank account within 3-5 business days of requesting a withdrawal from the Earnings screen.',
  },
  {
    id: 'faq-3',
    question: 'How do I update my availability schedule?',
    answer: 'Go to Settings > Availability Schedule to set your working hours and blocked-off days.',
  },
  {
    id: 'faq-4',
    question: 'Can I reply to client reviews?',
    answer: 'Yes. Open Client Reviews from your Settings menu, then tap "Reply to review" under any review to post or edit a response.',
  },
  {
    id: 'faq-5',
    question: 'What if my bank details are rejected?',
    answer: 'Double-check your account number and IFSC code under Bank Account settings. If the issue persists, contact support below.',
  },
];

const CONTACT_SECTION: SettingsSectionData = {
  title: 'CONTACT US',
  items: [
    {
      id: 'email',
      label: 'Email Support',
      subtitle: 'support@soulconnect.app',
      icon: 'mail-outline',
      iconBg: Colors.tealSoft,
      iconColor: Colors.teal,
      onPress: () => Linking.openURL('mailto:support@soulconnect.app'),
    },
    {
      id: 'call',
      label: 'Call Support',
      subtitle: '+91 80000 12345 (10am - 7pm IST)',
      icon: 'call-outline',
      iconBg: Colors.goldSoft,
      iconColor: Colors.gold,
      onPress: () => Linking.openURL('tel:+918000012345'),
    },
    {
      id: 'chat',
      label: 'Chat with Us',
      subtitle: 'Get a response within a few minutes',
      icon: 'chatbubbles-outline',
      iconBg: Colors.lavender,
      iconColor: Colors.accentViolet,
      onPress: () => Alert.alert('Live Chat', 'Live chat support is coming soon.'),
    },
  ],
};

export function HelpSupportScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScreenHeader title="Help & Support" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SettingsSection section={CONTACT_SECTION} titleVariant="label" />

        {/* FAQ */}
        <Text style={[styles.sectionLabel, { marginTop: Spacing.xl }]}>FREQUENTLY ASKED QUESTIONS</Text>
        <View style={styles.card}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = expandedId === item.id;
            return (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  style={styles.faqRow}
                  onPress={() => toggleFaq(item.id)}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel={item.question}
                >
                  <Text style={styles.faqQuestion}>{item.question}</Text>
                  <Ionicons
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color={Colors.textTertiary}
                  />
                </TouchableOpacity>
                {isOpen && <Text style={styles.faqAnswer}>{item.answer}</Text>}
                {index < FAQ_ITEMS.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            );
          })}
        </View>

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
  sectionLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSecondary,
    fontSize: 11,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: Spacing.lg,
  },
  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  faqQuestion: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 14,
    flex: 1,
  },
  faqAnswer: {
    ...Typography.secondaryBody,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
});
