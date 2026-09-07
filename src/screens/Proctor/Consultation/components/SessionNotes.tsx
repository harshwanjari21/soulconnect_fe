/**
 * SessionNotes — Astrologer private notes & remedy prescription panel
 */
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

const COMMON_REMEDIES = [
  'Surya Namaskar at sunrise',
  'Chant Gayatri Mantra 108x',
  'Feed birds / cows on Wednesday',
  'Wear Yellow Sapphire (Pukhraj)',
  'Shiv Abhishek on Mondays',
  'Avoid black color on Tuesdays',
];

export function SessionNotes() {
  const [notes, setNotes] = useState('');
  const [selectedRemedies, setSelectedRemedies] = useState<string[]>([]);

  const toggleRemedy = (remedy: string) => {
    if (selectedRemedies.includes(remedy)) {
      setSelectedRemedies(selectedRemedies.filter((r) => r !== remedy));
    } else {
      setSelectedRemedies([...selectedRemedies, remedy]);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <View style={styles.titleGroup}>
          <Ionicons name="document-text-outline" size={18} color={Colors.teal} />
          <Text style={styles.title}>Consultation Notes & Remedies</Text>
        </View>
        <Text style={styles.clientSharedBadge}>Shared with client</Text>
      </View>

      {/* Free text input */}
      <TextInput
        style={styles.textInput}
        placeholder="Write key observations, planetary transit effects, or personalized advice..."
        placeholderTextColor={Colors.textSecondary}
        multiline
        numberOfLines={4}
        value={notes}
        onChangeText={setNotes}
      />

      {/* Suggested Quick Remedies */}
      <View style={styles.remedySection}>
        <Text style={styles.remedyLabel}>Quick Vedic Remedies:</Text>
        <View style={styles.remedyChips}>
          {COMMON_REMEDIES.map((remedy) => {
            const isSelected = selectedRemedies.includes(remedy);
            return (
              <TouchableOpacity
                key={remedy}
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() => toggleRemedy(remedy)}
                accessibilityRole="button"
                accessibilityLabel={remedy}
              >
                {isSelected && (
                  <Ionicons name="checkmark" size={12} color={Colors.backgroundWhite} />
                )}
                <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                  {remedy}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    ...Shadows.xs,
    gap: Spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 14,
  },
  clientSharedBadge: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.teal,
    fontWeight: '700',
    backgroundColor: Colors.tealSoft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.pill,
  },
  textInput: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.sm,
    ...Typography.body,
    color: Colors.textPrimary,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  remedySection: {
    gap: 6,
    marginTop: 2,
  },
  remedyLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSoftPlum,
    fontSize: 11,
  },
  remedyChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.backgroundCream,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipSelected: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  chipText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontSize: 11,
  },
  chipTextSelected: {
    color: Colors.backgroundWhite,
    fontWeight: '700',
  },
});
