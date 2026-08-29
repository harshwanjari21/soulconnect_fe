/**
 * DiscoveryScreen — ConsultLive main discovery experience
 *
 * Deliberate vertical rhythm:
 *   Header (96)
 *   ↓ 16  Search
 *   ↓ 28  Guidance
 *   ↓ 32  Practices
 *   ↓ 32  Cosmic Insight
 *   ↓ 32  Experts (full-bleed, manages own padding)
 *   ↓ 32  Promo
 *   ↓ 36  Getting Started
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
      <DiscoveryHeader onNotificationPress={handleNotification} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Search — 16 below header */}
        <View style={[styles.padded, { marginTop: Spacing.lg }]}>
          <SearchBar />
        </View>

        {/* Guidance — 28 gap */}
        <View style={[styles.padded, { marginTop: 28 }]}>
          <GuidanceGrid />
        </View>

        {/* Practices — 32 gap */}
        <View style={[styles.padded, { marginTop: Spacing['3xl'] }]}>
          <PracticeGrid />
        </View>

        {/* Cosmic Insight — 32 gap */}
        <View style={[styles.padded, { marginTop: Spacing['3xl'] }]}>
          <CosmicInsight />
        </View>

        {/* Expert list — 32 gap, full bleed (manages own padding) */}
        <View style={{ marginTop: Spacing['3xl'] }}>
          <ExpertList />
        </View>

        {/* Promo — 32 gap */}
        <View style={[styles.padded, { marginTop: Spacing['3xl'] }]}>
          <PromoSection />
        </View>

        {/* Getting Started — 36 gap */}
        <View style={[styles.padded, { marginTop: Spacing['3xl'] + Spacing.xs }]}>
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
    // No gap here — each section defines its own top margin
    // for deliberate, individual control over the rhythm
  },
  padded: {
    paddingHorizontal: SCREEN_PADDING_H,
  },
});
