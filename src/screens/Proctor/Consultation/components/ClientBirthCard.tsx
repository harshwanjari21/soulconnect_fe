/**
 * ClientBirthCard — Client Birth & Astrological Attributes
 */
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

type ClientBirthCardProps = {
  clientName: string;
  dob: string;
  tob: string;
  pob: string;
  moonSign?: string;
  sunSign?: string;
  lagna?: string;
};

export function ClientBirthCard({
  clientName,
  dob,
  tob,
  pob,
  moonSign = 'Aquarius',
  sunSign = 'Scorpio',
  lagna = 'Libra',
}: ClientBirthCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded((prev) => !prev)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Ionicons name="person-circle-outline" size={24} color={Colors.teal} />
          <View>
            <Text style={styles.clientTitle}>{clientName}</Text>
            <Text style={styles.clientSubtitle}>Kundli Profile</Text>
          </View>
        </View>

        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={Colors.textSecondary}
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          <View style={styles.grid}>
            <View style={styles.item}>
              <Text style={styles.label}>Date of Birth</Text>
              <Text style={styles.val}>{dob}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Time of Birth</Text>
              <Text style={styles.val}>{tob}</Text>
            </View>

            <View style={styles.itemFull}>
              <Text style={styles.label}>Place of Birth</Text>
              <Text style={styles.val}>{pob}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Moon Sign (Rashi)</Text>
              <Text style={[styles.val, { color: Colors.accentCoral }]}>{moonSign}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Ascendant (Lagna)</Text>
              <Text style={[styles.val, { color: Colors.gold }]}>{lagna}</Text>
            </View>
          </View>
        </View>
      )}
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clientTitle: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 15,
  },
  clientSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  content: {
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  item: {
    flex: 1,
    minWidth: '45%',
    gap: 2,
  },
  itemFull: {
    width: '100%',
    gap: 2,
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  val: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textPrimary,
    fontSize: 13,
  },
});
