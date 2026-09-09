/**
 * SettingsSection — Reusable titled card of icon + label + subtitle rows
 *
 * Each row either navigates (chevron) or toggles (switch). Used for
 * grouped settings/contact lists (e.g. Proctor Settings, Help & Support).
 */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export interface SettingsRowItem {
  id: string;
  label: string;
  subtitle: string;
  icon: IconName;
  iconBg: string;
  iconColor: string;
  onPress?: () => void;
  toggle?: {
    value: boolean;
    onValueChange: (value: boolean) => void;
  };
}

export interface SettingsSectionData {
  title: string;
  items: SettingsRowItem[];
}

type SettingsSectionProps = {
  section: SettingsSectionData;
  /** 'heading' = serif section title (Settings), 'label' = small uppercase caption (Help & Support) */
  titleVariant?: 'heading' | 'label';
};

export function SettingsSection({ section, titleVariant = 'heading' }: SettingsSectionProps) {
  return (
    <View style={titleVariant === 'heading' ? styles.sectionHeadingWrap : styles.sectionLabelWrap}>
      <Text style={titleVariant === 'heading' ? styles.sectionTitleHeading : styles.sectionTitleLabel}>
        {section.title}
      </Text>
      <View style={styles.card}>
        {section.items.map((item, index) => {
          const rowContent = (
            <>
              <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
                <Ionicons name={item.icon} size={20} color={item.iconColor} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
              </View>
              {item.toggle ? (
                <Switch
                  value={item.toggle.value}
                  onValueChange={item.toggle.onValueChange}
                  trackColor={{ false: Colors.border, true: Colors.teal }}
                  thumbColor={Colors.backgroundWhite}
                  accessibilityLabel={item.label}
                />
              ) : (
                <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
              )}
            </>
          );

          return (
            <React.Fragment key={item.id}>
              {item.toggle ? (
                <View style={styles.row}>{rowContent}</View>
              ) : (
                <TouchableOpacity
                  style={styles.row}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                >
                  {rowContent}
                </TouchableOpacity>
              )}
              {index < section.items.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeadingWrap: { gap: Spacing.sm },
  sectionLabelWrap: {},
  sectionTitleHeading: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
    fontSize: 18,
  },
  sectionTitleLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSecondary,
    fontSize: 11,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 15,
  },
  rowSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 42 + Spacing.md + Spacing.lg,
  },
});
