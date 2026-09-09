/**
 * PrimaryButton — Reusable pill CTA button
 *
 * Standard "Save Changes" style action used across settings/form screens.
 */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Colors, Radius, Shadows, Typography } from '@/theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
};

export function PrimaryButton({ label, onPress, disabled, icon }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {icon && <Ionicons name={icon} size={18} color={Colors.backgroundWhite} style={styles.icon} />}
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.cosmosPlum,
    borderRadius: Radius.pill,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
    fontSize: 15,
    fontWeight: '700',
  },
});
