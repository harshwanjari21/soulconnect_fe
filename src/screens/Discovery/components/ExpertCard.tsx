/**
 * ExpertCard — Practitioner profile card
 *
 * Hierarchy (eye movement order):
 *   1. Person (photo)
 *   2. Expertise + trust signal (name, specialty, verification, rating)
 *   3. Price
 *   4. Action
 *
 * Everything else is secondary metadata — not competing with the primary hierarchy.
 * Feel: trusted human guidance, not an e-commerce product card.
 */
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { Expert } from '@/data/discovery';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

type ExpertCardProps = {
  expert: Expert;
  onCallPress?: (expert: Expert) => void;
  onCardPress?: (expert: Expert) => void;
};

const CARD_WIDTH = 160;
const IMAGE_HEIGHT = 148;

export function ExpertCard({ expert, onCallPress, onCardPress }: ExpertCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onCardPress?.(expert)}
      activeOpacity={0.93}
      accessibilityRole="button"
      accessibilityLabel={`${expert.name}, ${expert.specialty}`}
    >
      {/* 1. PERSON — photo is the dominant visual element */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: expert.imageUri }}
          style={styles.image}
          contentFit="cover"
          accessibilityLabel={`Photo of ${expert.name}`}
        />

        {/* Availability — integrated into the photo, bottom-left */}
        <View style={styles.availabilityBadgeWrapper}>
          <View
            style={[
              styles.availabilityDot,
              { backgroundColor: expert.isOnline ? Colors.online : Colors.offline },
            ]}
          />
          <Text style={styles.availabilityText}>
            {expert.isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
      </View>

      {/* 2 + 3 + 4. Info section */}
      <View style={styles.info}>
        {/* Name + verification — trust signals together */}
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{expert.name}</Text>
          {expert.isVerified && (
            <Ionicons
              name="checkmark-circle"
              size={14}
              color={Colors.teal}
              accessibilityLabel="Verified practitioner"
            />
          )}
        </View>

        {/* Specialty */}
        <Text style={styles.specialty} numberOfLines={1}>{expert.specialty}</Text>

        {/* Rating — clean, not cluttered */}
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={11} color={Colors.gold} />
          <Text style={styles.ratingText}>{expert.rating.toFixed(1)}</Text>
          <Text style={styles.ratingMeta}>· {expert.experienceYears} yrs exp</Text>
        </View>

        {/* Price + CTA — clear bottom row */}
        <View style={styles.actionRow}>
          <View>
            <Text style={styles.price}>₹{expert.pricePerMin}</Text>
            <Text style={styles.priceUnit}>per min</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.callButton,
              !expert.isOnline && styles.callButtonOffline,
            ]}
            onPress={() => onCallPress?.(expert)}
            disabled={!expert.isOnline}
            accessibilityRole="button"
            accessibilityLabel={
              expert.isOnline ? `Call ${expert.name}` : `${expert.name} is offline`
            }
          >
            <Ionicons
              name={expert.isOnline ? 'call' : 'call-outline'}
              size={13}
              color={expert.isOnline ? Colors.backgroundWhite : Colors.textTertiary}
            />
            <Text
              style={[
                styles.callButtonText,
                !expert.isOnline && styles.callButtonTextOffline,
              ]}
            >
              {expert.isOnline ? 'Call' : 'Offline'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  imageContainer: {
    width: CARD_WIDTH,
    height: IMAGE_HEIGHT,
    position: 'relative',
  },
  image: {
    width: CARD_WIDTH,
    height: IMAGE_HEIGHT,
  },
  availabilityBadgeWrapper: {
    position: 'absolute',
    bottom: Spacing.sm,
    left: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  availabilityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  availabilityText: {
    ...Typography.caption,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  info: {
    padding: Spacing.md,
    gap: Spacing.xs - 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    flex: 1,
    fontSize: 14,
  },
  specialty: {
    ...Typography.secondaryBody,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 1,
  },
  ratingText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  ratingMeta: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: Spacing.xs + 1,
  },
  price: {
    ...Typography.price,
    color: Colors.textPrimary,
    fontSize: 16,
    lineHeight: 20,
  },
  priceUnit: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.teal,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
  },
  callButtonOffline: {
    backgroundColor: Colors.borderSubtle,
  },
  callButtonText: {
    ...Typography.button,
    fontSize: 12,
    color: Colors.backgroundWhite,
  },
  callButtonTextOffline: {
    color: Colors.textTertiary,
  },
});
