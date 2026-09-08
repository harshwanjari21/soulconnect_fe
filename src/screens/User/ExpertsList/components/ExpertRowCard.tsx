import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

type ExpertRowCardProps = {
  expert: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    experienceYears: number;
    pricePerMin: number;
    imageUri: string | any;
    status: 'AVAILABLE' | 'IN_SESSION' | 'OFFLINE' | 'SCHEDULED';
    isVerified: boolean;
  };
  onCardPress: (expert: any) => void;
  onCallPress: (expert: any) => void;
};

export function ExpertRowCard({ expert, onCardPress, onCallPress }: ExpertRowCardProps) {
  const isAvailable = expert.status === 'AVAILABLE';
  const isInSession = expert.status === 'IN_SESSION';
  const ctaColor = isAvailable ? Colors.teal : isInSession ? Colors.cosmosAmber : Colors.borderSubtle;
  const ctaText = isAvailable ? 'Call' : isInSession ? 'Wait' : 'Offline';
  const ctaTextColor = isAvailable || isInSession ? Colors.backgroundWhite : Colors.textSecondary;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onCardPress(expert)} activeOpacity={0.8}>
      <View style={styles.leftCol}>
        <Image 
          source={typeof expert.imageUri === 'string' ? { uri: expert.imageUri } : expert.imageUri} 
          style={styles.avatar} 
        />
        <View style={[styles.statusBadge, isAvailable ? styles.statusAvailable : isInSession ? styles.statusSession : styles.statusOffline]} />
      </View>

      <View style={styles.middleCol}>
        <View style={styles.nameRow}>
          <Text style={styles.nameText} numberOfLines={1}>{expert.name}</Text>
          {expert.isVerified && <Ionicons name="checkmark-circle" size={14} color={Colors.gold} />}
        </View>
        <Text style={styles.specialtyText} numberOfLines={1}>{expert.specialty}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="star" size={12} color={Colors.gold} />
            <Text style={styles.statText}>{expert.rating}</Text>
          </View>
          <Text style={styles.statDot}>•</Text>
          <Text style={styles.statText}>{expert.experienceYears} yrs</Text>
        </View>
      </View>

      <View style={styles.rightCol}>
        <Text style={styles.priceText}>₹{expert.pricePerMin}/min</Text>
        <TouchableOpacity 
          style={[styles.callBtn, { backgroundColor: ctaColor }]} 
          onPress={() => onCallPress(expert)}
          activeOpacity={0.8}
        >
          {isAvailable ? <Ionicons name="call" size={14} color={ctaTextColor} /> : null}
          <Text style={[styles.callBtnText, { color: ctaTextColor }]}>{ctaText}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    ...Shadows.xs,
  },
  leftCol: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: Radius.pill,
    backgroundColor: Colors.borderSubtle,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: Colors.backgroundWhite,
  },
  statusAvailable: { backgroundColor: Colors.accentForest },
  statusSession: { backgroundColor: Colors.cosmosAmber },
  statusOffline: { backgroundColor: Colors.textTertiary },
  
  middleCol: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nameText: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  specialtyText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  statText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  statDot: {
    color: Colors.textTertiary,
    marginHorizontal: 4,
  },

  rightCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 8,
  },
  priceText: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.cosmosPlum,
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    gap: 4,
  },
  callBtnText: {
    ...Typography.caption,
    fontWeight: '700',
  },
});
