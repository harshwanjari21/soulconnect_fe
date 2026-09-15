/**
 * ExpertiseCategoriesScreen — Manage Astrologer Specialty Tags
 *
 *   - Suggested category chips (tap to toggle on/off)
 *   - Selected specialties shown as removable pills
 *   - Add a custom specialty
 *   - Save Changes action
 */
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/common/PrimaryButton';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { MOCK_PROCTOR_PROFILE } from '@/data/proctor';
import {
  BOTTOM_NAV_HEIGHT,
  Colors,
  Radius,
  SCREEN_PADDING_H,
  Spacing,
  Typography,
} from '@/theme';

const SUGGESTED_CATEGORIES = [
  'Vedic Astrology',
  'Career Guidance',
  'Relationship Guidance',
  'Kundli Matching',
  'Vastu Shastra',
  'Tarot Reading',
  'Numerology',
  'Palmistry',
  'Marriage Compatibility',
  'Health & Wellness',
  'Gemstone Recommendation',
  'Horoscope Reading',
];

export function ExpertiseCategoriesScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(MOCK_PROCTOR_PROFILE.specialties);
  const [customInput, setCustomInput] = useState('');

  const toggleCategory = (category: string) => {
    setSelected((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  const handleAddCustom = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    if (!selected.includes(trimmed)) {
      setSelected((prev) => [...prev, trimmed]);
    }
    setCustomInput('');
  };

  const handleSave = () => {
    Alert.alert('Expertise Updated', 'Your specialties have been saved successfully.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScreenHeader title="Expertise & Categories" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Selected Specialties */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>YOUR SPECIALTIES ({selected.length})</Text>
          <View style={styles.pillsRow}>
            {selected.length === 0 && (
              <Text style={styles.emptyText}>No specialties selected yet.</Text>
            )}
            {selected.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.selectedPill}
                onPress={() => toggleCategory(item)}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${item}`}
              >
                <Text style={styles.selectedPillText}>{item}</Text>
                <Ionicons name="close" size={14} color={Colors.teal} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Suggested Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SUGGESTED CATEGORIES</Text>
          <View style={styles.pillsRow}>
            {SUGGESTED_CATEGORIES.map((category) => {
              const isSelected = selected.includes(category);
              return (
                <TouchableOpacity
                  key={category}
                  style={[styles.suggestPill, isSelected && styles.suggestPillActive]}
                  onPress={() => toggleCategory(category)}
                  accessibilityRole="button"
                  accessibilityLabel={category}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={13} color={Colors.backgroundWhite} />
                  )}
                  <Text
                    style={[
                      styles.suggestPillText,
                      isSelected && styles.suggestPillTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Add Custom */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ADD CUSTOM SPECIALTY</Text>
          <View style={styles.addRow}>
            <TextInput
              style={styles.addInput}
              value={customInput}
              onChangeText={setCustomInput}
              onSubmitEditing={handleAddCustom}
              returnKeyType="done"
              placeholder="e.g. Face Reading"
              placeholderTextColor={Colors.textSecondary}
            />
            <TouchableOpacity
              style={styles.addBtn}
              onPress={handleAddCustom}
              accessibilityRole="button"
              accessibilityLabel="Add specialty"
            >
              <Ionicons name="add" size={20} color={Colors.backgroundWhite} />
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton label="Save Changes" onPress={handleSave} />

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
    gap: Spacing.xl,
  },
  section: { gap: Spacing.sm },
  sectionLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSecondary,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  emptyText: {
    ...Typography.secondaryBody,
    color: Colors.textTertiary,
    fontSize: 13,
  },
  selectedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.tealSoft,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radius.pill,
  },
  selectedPillText: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.teal,
    fontSize: 12,
  },
  suggestPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.backgroundWhite,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  suggestPillActive: {
    backgroundColor: Colors.cosmosPlum,
    borderColor: Colors.cosmosPlum,
  },
  suggestPillText: {
    ...Typography.caption,
    fontWeight: '600',
    color: Colors.textPrimary,
    fontSize: 12,
  },
  suggestPillTextActive: {
    color: Colors.backgroundWhite,
  },
  addRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  addInput: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    ...Typography.body,
    color: Colors.textPrimary,
    fontSize: 14,
  },
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: Radius.lg,
    backgroundColor: Colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
