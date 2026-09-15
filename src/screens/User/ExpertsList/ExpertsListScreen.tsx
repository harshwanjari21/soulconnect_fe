import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EXPERTS } from '@/data/discovery';
import { ExpertRowCard } from '@/screens/User/ExpertsList/components/ExpertRowCard';
import { BOTTOM_NAV_HEIGHT, Colors, Radius, SCREEN_PADDING_H, Shadows, Spacing, Typography } from '@/theme';
import { AdvancedFilterModal } from './components/AdvancedFilterModal';

const FILTERS = ['All', 'Astrology', 'Tarot', 'Numerology', 'Palmistry', 'Vastu', 'Healing'];
const SORTS = ['Rating (High to Low)', 'Price (Low to High)', 'Experience'];

export function ExpertsListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ specialty?: string; category?: string }>();
  
  const [search, setSearch] = useState('');
  const [activeSort, setActiveSort] = useState(0);

  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({});

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);

  // Initialize filter from params
  useEffect(() => {
    if (params.specialty) {
      setActiveFilters({ [params.specialty!]: true });
    } else if (params.category) {
      setSearch(params.category);
    }
  }, [params.specialty, params.category]);

  const clearFilters = () => {
    router.setParams({ specialty: '', category: '' });
    setActiveFilters({});
    setSearch('');
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(Boolean).length;
  };

  const activeFilterCount = getActiveFilterCount();

  let filteredExperts = EXPERTS.filter((expert) => {
    // Search
    const matchesSearch = expert.name.toLowerCase().includes(search.toLowerCase()) || 
                          expert.specialty.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;

    // We get all currently active string keys
    const activeKeys = Object.entries(activeFilters).filter(([, selected]) => selected).map(([key]) => key);
    
    if (activeKeys.length === 0) return true;

    // If ANY filter matches, we include them (OR logic across all filters for now, or AND logic? 
    // Usually it's OR within a category, AND across categories. Since we flattened it, we can do a simple check)
    // For now, let's do an "every" check for strict filtering, or "some" for loose.
    // Let's implement basic checks for the specific keys we know
    
    // For simplicity with flat filters, if there are active filters, the expert must match ALL active filter criteria (AND logic)
    // or we can just say if the expert satisfies the string token.
    const matchesFilter = (f: string) => {
      if (expert.specialty.includes(f)) return true;
      if (f === '4.5 & up' && expert.rating >= 4.5) return true;
      if (f === '4.0 & up' && expert.rating >= 4.0) return true;
      if (f === '3.0 & up' && expert.rating >= 3.0) return true;
      if (f === 'Under ₹25/min' && expert.pricePerMin < 25) return true;
      if (f === '₹25 - ₹50/min' && expert.pricePerMin >= 25 && expert.pricePerMin <= 50) return true;
      if (f === 'Above ₹50/min' && expert.pricePerMin > 50) return true;
      
      // Languages
      if (expert.languages && expert.languages.includes(f)) return true;

      return false;
    };

    // We will group active keys by category roughly to apply OR within category and AND across.
    // To keep it simple like PanditG, we just require all selected filter tags to match.
    return activeKeys.every(f => matchesFilter(f));
  });

  const sortedExperts = [...filteredExperts].sort((a, b) => {
    if (activeSort === 0) return b.rating - a.rating;
    if (activeSort === 1) return a.pricePerMin - b.pricePerMin;
    if (activeSort === 2) return b.experienceYears - a.experienceYears;
    return 0;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Experts</Text>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => router.push('/notifications' as any)}
        >
          <Ionicons name="notifications-outline" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {(params.specialty || params.category) && (
        <View style={styles.contextBanner}>
          <Text style={styles.contextText}>
            Showing experts for: <Text style={styles.contextHighlight}>{params.specialty || params.category}</Text>
          </Text>
          <TouchableOpacity onPress={clearFilters}>
            <Ionicons name="close-circle" size={20} color={Colors.cosmosPlum} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or specialty..."
            placeholderTextColor={Colors.textTertiary}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={[styles.filterBtn, activeFilterCount > 0 && styles.filterBtnActive]} 
          onPress={() => setShowFilterModal(true)}
        >
          <Ionicons name="options-outline" size={18} color={activeFilterCount > 0 ? Colors.backgroundWhite : Colors.cosmosPlum} />
          <Text style={[styles.filterBtnText, activeFilterCount > 0 && styles.filterBtnTextActive]}>
            Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterBtn, activeSort !== 0 && styles.filterBtnActive]} 
          onPress={() => setShowSortModal(true)}
        >
          <Ionicons name="swap-vertical" size={18} color={activeSort !== 0 ? Colors.backgroundWhite : Colors.cosmosPlum} />
          <Text style={[styles.filterBtnText, activeSort !== 0 && styles.filterBtnTextActive]}>
            Sort {activeSort !== 0 ? '(1)' : ''}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.listHeader}>
          <Text style={styles.resultsText}>{sortedExperts.length} experts found</Text>
        </View>

        <View style={styles.list}>
          {sortedExperts.map((expert) => (
            <ExpertRowCard
              key={expert.id}
              expert={expert}
              onCardPress={(e) => router.push(`/expert/${e.id}` as any)}
              onCallPress={(e) => router.push(`/expert/${e.id}` as any)}
            />
          ))}
        </View>
        
        <View style={{ height: BOTTOM_NAV_HEIGHT + Spacing.xxl }} />
      </ScrollView>

      {/* Advanced Filter Modal */}
      <AdvancedFilterModal
        visible={showFilterModal}
        initialFilters={activeFilters}
        onClose={() => setShowFilterModal(false)}
        onApply={(filters) => {
          setActiveFilters(filters);
          setShowFilterModal(false);
        }}
      />

      {/* Sleek Sort Bottom Sheet */}
      <Modal visible={showSortModal} animationType="slide" transparent={true} onRequestClose={() => setShowSortModal(false)}>
        <View style={styles.bottomSheetOverlay}>
          <View style={styles.bottomSheetCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Sort Experts By</Text>
              <TouchableOpacity onPress={() => setShowSortModal(false)}>
                <Ionicons name="close" size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalOptionsContainer}>
              {SORTS.map((sortOption, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.sortOptionRow, activeSort === idx && styles.sortOptionRowActive]}
                  onPress={() => {
                    setActiveSort(idx);
                    setShowSortModal(false);
                  }}
                >
                  <Text style={[styles.sortOptionText, activeSort === idx && styles.sortOptionTextActive]}>
                    {sortOption}
                  </Text>
                  {activeSort === idx && <Ionicons name="star" size={16} color={Colors.gold} />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
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
  notificationButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  contextBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.tealSoft,
    marginHorizontal: SCREEN_PADDING_H,
    marginBottom: Spacing.sm,
    paddingVertical: 10,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
  },
  contextText: {
    ...Typography.body,
    color: Colors.cosmosPlum,
  },
  contextHighlight: {
    fontWeight: '700',
  },
  pageTitle: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
    fontSize: 26,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: SCREEN_PADDING_H,
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    height: 48,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    ...Shadows.xs,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
    height: '100%',
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: SCREEN_PADDING_H,
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  filterBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundWhite,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    gap: Spacing.sm,
    ...Shadows.xs,
  },
  filterBtnActive: {
    backgroundColor: Colors.cosmosPlum,
    borderColor: Colors.cosmosPlum,
  },
  filterBtnText: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.cosmosPlum,
    fontSize: 14,
  },
  filterBtnTextActive: {
    color: Colors.backgroundWhite,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.sm,
  },
  listHeader: {
    marginBottom: Spacing.md,
  },
  resultsText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  list: {
    gap: Spacing.sm,
  },
  bottomSheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(63, 41, 64, 0.4)',
    justifyContent: 'flex-end',
  },
  bottomSheetCard: {
    backgroundColor: '#FAF7F2',
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl, // using padding instead of bottom spacing to account for native Modal
    ...Shadows.lg,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    ...Typography.sectionHeading,
    color: Colors.cosmosPlum,
  },
  modalOptionsContainer: {
    gap: Spacing.xs,
  },
  sortOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    marginBottom: Spacing.sm,
  },
  sortOptionRowActive: {
    borderColor: Colors.gold,
    backgroundColor: Colors.goldSoft,
  },
  sortOptionText: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  sortOptionTextActive: {
    color: Colors.cosmosPlum,
    fontWeight: '700',
  },
});
