/**
 * ProctorProfileScreen — Astrologer Professional Profile
 *
 * Matches Image 1:
 *   - "Professional Profile" header with settings gear icon
 *   - Verified profile avatar, Dr. Amara Singh, Experience
 *   - 3-column stats card:
 *       • 4.9 ★ 2.4K REVIEWS (Clickable -> redirects to /proctor/reviews)
 *       • 850 SESSIONS
 *       • 98% RESPONSE
 *   - ABOUT section
 *   - SPECIALTIES pills
 *   - CONSULTATION RATES cards (Clickable -> redirects to /proctor/consultation-modes)
 *   - "Edit Profile" pill action button (Redirects to /proctor/edit-profile)
 */
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

export function ProctorProfileScreen() {
  const router = useRouter();
  const [profile] = useState(MOCK_PROCTOR_PROFILE);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Header with Gear Icon */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Professional Profile</Text>
        <TouchableOpacity
          style={styles.gearButton}
          onPress={() => router.push('/proctor/settings' as any)}
          accessibilityRole="button"
          accessibilityLabel="Settings"
        >
          <Ionicons name="settings-sharp" size={22} color={Colors.cosmosPlum} />
        </TouchableOpacity>
      </View>


      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card / Identity */}
        <View style={styles.identitySection}>
          <Image
            source={{ uri: profile.avatarUrl }}
            style={styles.avatar}
            contentFit="cover"
          />

          <Text style={styles.name}>{profile.name}</Text>

          {profile.isVerified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={15} color={Colors.success} />
              <Text style={styles.verifiedText}>VERIFIED</Text>
            </View>
          )}

          <Text style={styles.experienceSubtitle}>
            {profile.title} • {profile.experienceYears} Years Experience
          </Text>
        </View>

        {/* 3-Column Stats Row */}
        <View style={styles.statsCard}>
          {/* Stat 1: Reviews (Clickable) */}
          <TouchableOpacity
            style={styles.statCol}
            onPress={() => router.push('/proctor/reviews' as any)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="View Reviews"
          >
            <View style={styles.statValueRow}>
              <Text style={styles.statNumber}>{profile.rating}</Text>
              <Ionicons name="star" size={14} color={Colors.gold} />
            </View>
            <Text style={styles.statLabel}>{profile.totalReviewsCount} REVIEWS</Text>
          </TouchableOpacity>

          <View style={styles.statDivider} />

          {/* Stat 2: Sessions (Clickable to schedule) */}
          <TouchableOpacity
            style={styles.statCol}
            onPress={() => router.push('/proctor/schedule' as any)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="View Sessions"
          >
            <Text style={styles.statNumber}>{profile.totalSessions}</Text>
            <Text style={styles.statLabel}>SESSIONS</Text>
          </TouchableOpacity>

          <View style={styles.statDivider} />

          {/* Stat 3: Response Rate */}
          <View style={styles.statCol}>
            <Text style={styles.statNumber}>{profile.responseRatePercent}%</Text>
            <Text style={styles.statLabel}>RESPONSE</Text>
          </View>
        </View>

        {/* ABOUT Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>ABOUT</Text>
          <Text style={styles.aboutBody}>{profile.bio}</Text>
        </View>

        {/* LANGUAGES Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>LANGUAGES</Text>
          <View style={styles.specialtiesWrap}>
            {profile.languages.map((lang) => (
              <View key={lang} style={styles.languagePill}>
                <Text style={styles.languageText}>{lang}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* SPECIALTIES Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>SPECIALTIES</Text>
          <View style={styles.specialtiesWrap}>
            {profile.specialties.map((spec) => (
              <View key={spec} style={styles.specialtyPill}>
                <Text style={styles.specialtyText}>{spec}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CONSULTATION RATES Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionHeading}>CONSULTATION RATES</Text>
            <TouchableOpacity onPress={() => router.push('/proctor/consultation-modes' as any)}>
              <Text style={styles.sectionActionText}>Edit Modes ›</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ratesList}>
            <TouchableOpacity
              style={styles.rateCard}
              onPress={() => router.push('/proctor/consultation-modes' as any)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Video Consultation Rate"
            >
              <Text style={styles.rateCardTitle}>Video Consultation</Text>
              <View style={styles.ratePriceGroup}>
                <Text style={styles.rateCardPrice}>₹{profile.ratePerMinVideo}/min</Text>
                <Ionicons name="chevron-forward" size={14} color={Colors.textTertiary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rateCard}
              onPress={() => router.push('/proctor/consultation-modes' as any)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Audio Consultation Rate"
            >
              <Text style={styles.rateCardTitle}>Audio Consultation</Text>
              <View style={styles.ratePriceGroup}>
                <Text style={styles.rateCardPrice}>₹{profile.ratePerMinAudio}/min</Text>
                <Ionicons name="chevron-forward" size={14} color={Colors.textTertiary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rateCard}
              onPress={() => router.push('/proctor/consultation-modes' as any)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Chat Consultation Rate"
            >
              <Text style={styles.rateCardTitle}>Chat Consultation</Text>
              <View style={styles.ratePriceGroup}>
                <Text style={styles.rateCardPrice}>₹{profile.ratePerMinChat}/min</Text>
                <Ionicons name="chevron-forward" size={14} color={Colors.textTertiary} />
              </View>
            </TouchableOpacity>
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
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
    fontSize: 24,
  },
  gearButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.xs,
    gap: Spacing.xl,
  },
  identitySection: {
    alignItems: 'center',
    gap: 6,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: Radius.pill,
    borderWidth: 3,
    borderColor: Colors.backgroundWhite,
    ...Shadows.sm,
    marginBottom: 4,
  },
  name: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
    fontSize: 22,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    ...Typography.caption,
    fontWeight: '800',
    color: Colors.success,
    letterSpacing: 0.6,
    fontSize: 11,
  },
  experienceSubtitle: {
    ...Typography.secondaryBody,
    color: Colors.textSecondary,
    fontSize: 13,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.xs,
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontWeight: '800',
    fontSize: 17,
  },
  statLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSecondary,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.border,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionHeading: {
    ...Typography.caption,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    fontSize: 12,
  },
  aboutBody: {
    ...Typography.secondaryBody,
    color: Colors.textPrimary,
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  specialtiesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialtyPill: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: Colors.borderBlueSoft,
  },
  specialtyText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '600',
    fontSize: 12,
  },
  languagePill: {
    backgroundColor: Colors.tealSoft,
    borderRadius: Radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  languageText: {
    ...Typography.caption,
    color: Colors.teal,
    fontWeight: '600',
    fontSize: 12,
  },
  ratesList: {
    gap: Spacing.sm,
  },
  sectionHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionActionText: {
    ...Typography.caption,
    color: Colors.teal,
    fontWeight: '700',
    fontSize: 12,
  },
  rateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.xs,
  },
  rateCardTitle: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 14,
  },
  ratePriceGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rateCardPrice: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontWeight: '800',
    fontSize: 14,
  },
});

