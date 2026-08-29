/**
 * DiscoveryScreen — ConsultLive main discovery experience
 *
 * Deliberate vertical rhythm (tightened ~12%):
 *   [Safe area top inset]
 *   Header  (padding-driven, compact)
 *   ↓ 14   Search
 *   ↓ 22   Guidance categories
 *   ↓ 28   Explore practices
 *   ↓ 28   Cosmic Insight
 *   ↓ 28   Online Experts (full-bleed)
 *   ↓ 28   Promo offer
 *   ↓ 32   Getting Started
 *   ↓ nav inset
 */
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BOTTOM_NAV_HEIGHT, Colors, SCREEN_PADDING_H, Spacing } from '@/theme';

import { CosmicInsight } from './components/CosmicInsight';
import { DiscoveryHeader } from './components/DiscoveryHeader';
import { ExpertList } from './components/ExpertList';
import { GettingStarted } from './components/GettingStarted';
import { GuidanceGrid } from './components/GuidanceGrid';
import { PracticeGrid } from './components/PracticeGrid';
import { PromoSection } from './components/PromoSection';
import { SearchBar } from './components/SearchBar';

export function DiscoveryScreen() {
  const handleNotification = useCallback(() => {}, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header — compact, padding-driven, not fixed height */}
      <DiscoveryHeader onNotificationPress={handleNotification} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Search — 14px below header */}
        <View style={[styles.padded, { marginTop: 14 }]}>
          <SearchBar />
        </View>

        {/* Guidance categories — 22px gap */}
        <View style={[styles.padded, { marginTop: 22 }]}>
          <GuidanceGrid />
        </View>

        {/* Explore practices — 28px gap */}
        <View style={[styles.padded, { marginTop: Spacing['3xl'] - Spacing.xs }]}>
          <PracticeGrid />
        </View>

        {/* Cosmic Insight — 28px gap */}
        <View style={[styles.padded, { marginTop: Spacing['3xl'] - Spacing.xs }]}>
          <CosmicInsight />
        </View>

        {/* Expert list — 28px gap, full-bleed (manages own padding) */}
        <View style={{ marginTop: Spacing['3xl'] - Spacing.xs }}>
          <ExpertList />
        </View>

        {/* Promo offer — 28px gap */}
        <View style={[styles.padded, { marginTop: Spacing['3xl'] - Spacing.xs }]}>
          <PromoSection />
        </View>

        {/* Getting Started — 32px gap */}
        <View style={[styles.padded, { marginTop: Spacing['3xl'] }]}>
          <GettingStarted />
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    // Individual marginTop per section for deliberate rhythm control
  },
  padded: {
    paddingHorizontal: SCREEN_PADDING_H,
  },
});
