/**
 * SearchBar — Discovery screen search input
 *
 * Contains:
 *   - Search icon (left)
 *   - Placeholder text input
 *   - Filter/sliders icon (right)
 *
 * White surface, subtle border and shadow. Tactile without dominating the page.
 */
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

type SearchBarProps = {
  placeholder?: string;
  onFilterPress?: () => void;
  onChangeText?: (text: string) => void;
};

export function SearchBar({
  placeholder = 'Search astrologers, tarot readers...',
  onFilterPress,
  onChangeText,
}: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleChange = (text: string) => {
    setValue(text);
    onChangeText?.(text);
  };

  return (
    <View style={styles.container}>
      {/* Search icon */}
      <Ionicons name="search-outline" size={18} color={Colors.textSecondary} style={styles.searchIcon} />

      {/* Text input */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
        value={value}
        onChangeText={handleChange}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        accessibilityLabel="Search"
      />

      {/* Filter icon */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={onFilterPress}
        accessibilityRole="button"
        accessibilityLabel="Filter"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="options-outline" size={18} color={Colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    ...Shadows.xs,
    gap: Spacing.sm,
  },
  searchIcon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
    padding: 0,
    margin: 0,
  },
  filterButton: {
    flexShrink: 0,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
