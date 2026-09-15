import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Radius, Spacing, Typography, Shadows } from '@/theme';

type AdvancedFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, boolean>) => void;
  initialFilters: Record<string, boolean>;
};

const FILTER_CATEGORIES = ['Specialty', 'Price', 'Rating', 'Language'];
const FILTER_OPTIONS: Record<string, string[]> = {
  'Specialty': ['Astrology', 'Tarot', 'Numerology', 'Palmistry', 'Vastu', 'Healing'],
  'Price': ['Under ₹25/min', '₹25 - ₹50/min', 'Above ₹50/min'],
  'Rating': ['4.5 & up', '4.0 & up', '3.0 & up'],
  'Language': ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali'],
};

export function AdvancedFilterModal({ visible, onClose, onApply, initialFilters }: AdvancedFilterModalProps) {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState(FILTER_CATEGORIES[0]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>(initialFilters);

  useEffect(() => {
    setSelectedFilters(initialFilters);
  }, [initialFilters, visible]);

  const toggleFilter = (key: string) => {
    setSelectedFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const clearAll = () => {
    setSelectedFilters({});
  };

  const activeCount = Object.values(selectedFilters).filter(Boolean).length;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} />
        
        <View style={[styles.sheetContent, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={Colors.cosmosPlum} />
            </TouchableOpacity>
          </View>

          <View style={styles.splitView}>
            {/* Left Panel */}
            <View style={styles.leftColumn}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {FILTER_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <TouchableOpacity
                      key={cat}
                      style={[styles.catRow, isActive && styles.catRowActive]}
                      onPress={() => setActiveCategory(cat)}
                    >
                      {isActive && <View style={styles.catActiveIndicator} />}
                      <Text style={[styles.catText, isActive && styles.catTextActive]}>{cat}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Right Panel */}
            <View style={styles.rightColumn}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: Spacing.sm }}>
                {FILTER_OPTIONS[activeCategory]?.map((opt) => {
                  const isSelected = selectedFilters[opt];
                  return (
                    <TouchableOpacity
                      key={opt}
                      style={styles.optionRow}
                      onPress={() => toggleFilter(opt)}
                    >
                      <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{opt}</Text>
                      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                        {isSelected && <Ionicons name="checkmark" size={14} color={Colors.backgroundWhite} />}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
              <Text style={styles.clearBtnText}>Clear Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={() => onApply(selectedFilters)}>
              <Text style={styles.applyBtnText}>Apply {activeCount > 0 ? `(${activeCount})` : ''}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(63, 41, 64, 0.4)',
    justifyContent: 'flex-end',
  },
  sheetContent: {
    backgroundColor: Colors.backgroundWhite,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    height: SCREEN_HEIGHT * 0.65, // Half/bottom sheet style
    ...Shadows.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  title: {
    ...Typography.sectionHeading,
    color: Colors.cosmosPlum,
    fontSize: 20,
  },
  closeBtn: {
    padding: Spacing.xs,
  },
  splitView: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    width: '35%',
    backgroundColor: Colors.backgroundCream,
    borderRightWidth: 1,
    borderRightColor: Colors.borderSubtle,
  },
  catRow: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  catRowActive: {
    backgroundColor: Colors.backgroundWhite,
  },
  catActiveIndicator: {
    position: 'absolute',
    left: 0,
    top: Spacing.md,
    bottom: Spacing.md,
    width: 4,
    backgroundColor: Colors.teal,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  catText: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '500',
    paddingLeft: Spacing.xs,
  },
  catTextActive: {
    color: Colors.cosmosPlum,
    fontWeight: '700',
  },
  rightColumn: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
    paddingHorizontal: Spacing.md,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundCream,
  },
  optionText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  optionTextSelected: {
    color: Colors.cosmosPlum,
    fontWeight: '700',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: Radius.sm, // Slightly square rounded like standard app checkboxes
    borderWidth: 2,
    borderColor: Colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
  },
  clearBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  clearBtnText: {
    ...Typography.button,
    color: Colors.textSecondary,
    fontSize: 16,
  },
  applyBtn: {
    backgroundColor: Colors.teal,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: Radius.pill,
  },
  applyBtnText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
    fontSize: 16,
  },
});
