/**
 * ScreenHeader — Reusable back-button + title app bar
 *
 * Covers both header styles used across the app:
 *   - default: left-aligned title next to a back arrow (most detail screens)
 *   - centered: centered title with an optional teal subtitle (e.g. Settings)
 */
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors, Radius, SCREEN_PADDING_H, Spacing, Typography } from '@/theme';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  rightSlot?: React.ReactNode;
  centered?: boolean;
  bordered?: boolean;
  /** 'left' (default) puts the back arrow before the title; 'right' mirrors it — large title left, filled circular back button right */
  backPosition?: 'left' | 'right';
};

export function ScreenHeader({
  title,
  subtitle,
  onBackPress,
  rightSlot,
  centered = false,
  bordered = !centered,
  backPosition = 'left',
}: ScreenHeaderProps) {
  const router = useRouter();
  const handleBack = onBackPress ?? (() => router.back());
  const filled = backPosition === 'right';

  const backButton = (
    <TouchableOpacity
      style={[styles.backBtn, centered && styles.backBtnCentered, filled && styles.backBtnFilled]}
      onPress={handleBack}
      accessibilityRole="button"
      accessibilityLabel="Go back"
    >
      <Ionicons
        name={centered ? 'chevron-back' : 'arrow-back'}
        size={filled ? 20 : 22}
        color={Colors.textPrimary}
      />
    </TouchableOpacity>
  );

  const titleNode = centered ? (
    <View style={styles.centerGroup}>
      <Text style={styles.centerTitle}>{title}</Text>
      {subtitle ? <Text style={styles.centerSubtitle}>{subtitle}</Text> : null}
    </View>
  ) : (
    <Text style={[styles.title, filled && styles.titleLarge]} numberOfLines={1}>
      {title}
    </Text>
  );

  if (filled) {
    return (
      <View style={[styles.header, bordered && styles.headerBordered]}>
        {titleNode}
        {backButton}
      </View>
    );
  }

  return (
    <View style={[styles.header, bordered && styles.headerBordered]}>
      {backButton}
      {titleNode}
      <View style={[styles.rightSlot, centered && styles.rightSlotCentered]}>{rightSlot}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING_H,
    paddingVertical: Spacing.md,
  },
  headerBordered: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  backBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
  backBtnCentered: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  backBtnFilled: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
    fontSize: 20,
    flexShrink: 1,
  },
  titleLarge: {
    fontSize: 28,
  },
  centerGroup: {
    alignItems: 'center',
    gap: 2,
  },
  centerTitle: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
    fontSize: 22,
  },
  centerSubtitle: {
    ...Typography.caption,
    color: Colors.teal,
    fontSize: 13,
    fontWeight: '500',
  },
  rightSlot: {
    minWidth: 32,
    alignItems: 'flex-end',
  },
  rightSlotCentered: {
    minWidth: 36,
  },
});
