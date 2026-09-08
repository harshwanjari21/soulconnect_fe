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

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Experts</Text>
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
        <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilterModal(true)}>
          <Ionicons name="options-outline" size={20} color={Colors.textPrimary} />
          <Text style={styles.filterBtnText}>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setShowSortModal(true)}>
          <Ionicons name="swap-vertical" size={20} color={Colors.textPrimary} />
          <Text style={styles.filterBtnText}>Sort</Text>
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Sort Experts By</Text>
            {SORTS.map((sortOption, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.sortOptionRow}
                onPress={() => {
                  setActiveSort(idx);
                  setShowSortModal(false);
                }}
              >
                <Text style={[styles.sortOptionText, activeSort === idx && styles.sortOptionTextActive]}>
                  {sortOption}
                </Text>
                {activeSort === idx && <Ionicons name="checkmark" size={20} color={Colors.teal} />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowSortModal(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showFilterModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Filter by Specialty</Text>
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
            <TouchableOpacity style={styles.modalConfirmBtn} onPress={() => setShowFilterModal(false)}>
              <Text style={styles.modalConfirmBtnText}>Apply Filters</Text>
            </TouchableOpacity>
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
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
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
    paddingVertical: Spacing.sm,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    gap: Spacing.sm,
    ...Shadows.xs,
  },
  filterBtnText: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
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
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(63, 41, 64, 0.4)', // cosmosPlum with opacity
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: Spacing.xl,
  },
  modalCard: {
    width: '100%',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    ...Shadows.md,
  },
  modalTitle: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  sortOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  sortOptionText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  sortOptionTextActive: {
    color: Colors.teal,
    fontWeight: '700',
  },
  modalCancelBtn: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  modalCancelText: {
    ...Typography.button,
    color: Colors.textTertiary,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderColor: Colors.borderSubtle,
    gap: Spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  modalConfirmBtn: {
    backgroundColor: Colors.teal,
    marginTop: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  modalConfirmBtnText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
  },
});
