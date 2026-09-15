import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EXPERTS } from '@/data/discovery';
import { ExpertRowCard } from '@/screens/User/ExpertsList/components/ExpertRowCard';
import { BOTTOM_NAV_HEIGHT, Colors, Radius, SCREEN_PADDING_H, Shadows, Spacing, Typography } from '@/theme';

const FILTERS = ['All', 'Astrology', 'Tarot', 'Numerology', 'Palmistry', 'Vastu', 'Healing'];
const SORTS = ['Rating (High to Low)', 'Price (Low to High)', 'Experience'];

export function ExpertsListScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSort, setActiveSort] = useState(0);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const toggleFilter = (filter: string) => {
    if (filter === 'All') {
      setActiveFilter('All');
    } else {
      // Logic for multi-select if we wanted, but let's stick to single active for now or multi?
      // "amazon style filter with checkboxes" implies multi-select could be expected, but let's just make it a single select checkbox list for simplicity unless multi is strict.
      // Let's implement multi-select logic!
      if (activeFilter === 'All') {
        setActiveFilter(filter);
      } else {
        const filters = activeFilter.split(',');
        if (filters.includes(filter)) {
          const newFilters = filters.filter((f) => f !== filter);
          setActiveFilter(newFilters.length > 0 ? newFilters.join(',') : 'All');
        } else {
          setActiveFilter([...filters, filter].join(','));
        }
      }
    }
  };

  const filteredExperts = EXPERTS.filter((expert) => {
    const matchesSearch = expert.name.toLowerCase().includes(search.toLowerCase()) || expert.specialty.toLowerCase().includes(search.toLowerCase());
    const filtersArray = activeFilter === 'All' ? [] : activeFilter.split(',');
    const matchesFilter = activeFilter === 'All' || filtersArray.some((f) => expert.specialty.toLowerCase().includes(f.toLowerCase()));
    return matchesSearch && matchesFilter;
  });

  const sortedExperts = [...filteredExperts].sort((a, b) => {
    if (activeSort === 0) return b.rating - a.rating;
    if (activeSort === 1) return a.pricePerMin - b.pricePerMin;
    if (activeSort === 2) return b.experienceYears - a.experienceYears;
    return 0;
  });

  const activeFilterCount = activeFilter === 'All' ? 0 : activeFilter.split(',').length;

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

      {showSortModal && (
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
      )}

      {showFilterModal && (
        <View style={styles.bottomSheetOverlay}>
          <View style={styles.bottomSheetCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Filter by Specialty</Text>
              <TouchableOpacity onPress={() => setActiveFilter('All')}>
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalOptionsScroll} showsVerticalScrollIndicator={false}>
              {FILTERS.map((filterOption, idx) => {
                const isSelected = activeFilter === 'All' ? filterOption === 'All' : activeFilter.split(',').includes(filterOption);
                return (
                  <TouchableOpacity
                    key={idx}
                    style={styles.checkboxRow}
                    onPress={() => toggleFilter(filterOption)}
                  >
                    <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
                      {isSelected && <Ionicons name="checkmark" size={14} color={Colors.backgroundWhite} />}
                    </View>
                    <Text style={[styles.sortOptionText, isSelected && styles.sortOptionTextActive]}>
                      {filterOption}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.modalConfirmBtn} onPress={() => setShowFilterModal(false)}>
                <Text style={styles.modalConfirmBtnText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(63, 41, 64, 0.4)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  bottomSheetCard: {
    backgroundColor: '#FAF7F2',
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    paddingBottom: 40,
    maxHeight: '80%',
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
  clearAllText: {
    ...Typography.button,
    color: Colors.teal,
    fontSize: 14,
  },
  modalOptionsContainer: {
    gap: Spacing.xs,
  },
  modalOptionsScroll: {
    marginBottom: Spacing.md,
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11, // Circular premium checkbox
    borderWidth: 2,
    borderColor: Colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  modalFooter: {
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderColor: Colors.borderSubtle,
    marginTop: Spacing.md,
  },
  modalConfirmBtn: {
    backgroundColor: Colors.teal,
    paddingVertical: 16,
    borderRadius: Radius.pill,
    alignItems: 'center',
    ...Shadows.sm,
  },
  modalConfirmBtnText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
    fontSize: 16,
  },
});
