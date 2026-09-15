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
const IMAGE_HEIGHT = 160;

export function ExpertCard({ expert, onCallPress, onCardPress }: ExpertCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onCardPress?.(expert)}
      activeOpacity={0.93}
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
          {expert.status === 'AVAILABLE' && (
            <View style={[styles.availabilityDot, { backgroundColor: Colors.online }]} />
          )}
          {expert.status === 'IN_SESSION' && (
            <View style={[styles.availabilityDot, { backgroundColor: Colors.accentAmber }]} />
          )}
          {(expert.status === 'SCHEDULED' || expert.status === 'OFFLINE') && (
            <View style={[styles.availabilityDot, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FFFFFF' }]} />
          )}
          
          <Text style={styles.availabilityText}>
            {expert.status === 'AVAILABLE' && 'Available'}
            {expert.status === 'IN_SESSION' && 'In session'}
            {(expert.status === 'SCHEDULED' || expert.status === 'OFFLINE') && 'Offline'}
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

        {/* Price / Next Available + CTA */}
        <View style={styles.actionRow}>
          <View style={styles.priceContainer}>
            {expert.status === 'IN_SESSION' ? (
              <Text style={styles.nextAvailable} numberOfLines={2}>
                Next available{'\n'}<Text style={{ fontWeight: '600', color: Colors.textPrimary }}>{expert.nextAvailableTime}</Text>
              </Text>
            ) : (
              <>
                <Text style={styles.price}>₹{expert.pricePerMin}</Text>
                <Text style={styles.priceUnit}>per min</Text>
              </>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.callButton,
              (expert.status === 'SCHEDULED' || expert.status === 'OFFLINE') && styles.callButtonSecondary
            ]}
            onPress={() => onCallPress?.(expert)}
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.callButtonText,
                (expert.status === 'SCHEDULED' || expert.status === 'OFFLINE') && styles.callButtonTextSecondary
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {expert.status === 'AVAILABLE' && 'Connect'}
              {expert.status === 'SCHEDULED' && 'Book'}
              {expert.status === 'IN_SESSION' && 'Notify Me'}
              {expert.status === 'OFFLINE' && 'View Slots'}
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
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    // Very soft, diffused, premium shadow
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 4,
    overflow: 'hidden',
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
    marginTop: Spacing.xs,
  },
  priceContainer: {
    flex: 1,
    paddingRight: 4,
  },
  price: {
    ...Typography.price,
    color: Colors.textPrimary,
    fontSize: 15,
    lineHeight: 18,
  },
  priceUnit: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
  },
  nextAvailable: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
    lineHeight: 14,
  },
  callButton: {
    backgroundColor: Colors.teal,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    minWidth: 70,
    alignItems: 'center',
  },
  callButtonSecondary: {
    backgroundColor: Colors.backgroundCream,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  callButtonText: {
    ...Typography.button,
    fontSize: 11,
    color: Colors.backgroundWhite,
  },
  callButtonTextSecondary: {
    color: Colors.textPrimary,
  },
});
