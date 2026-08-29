/**
 * Sessions — Placeholder screen
 * Will be implemented in a future phase.
 */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BOTTOM_NAV_HEIGHT, Colors, Spacing, Typography } from '@/theme';

export default function SessionsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.body}>
        <Ionicons name="videocam-outline" size={48} color={Colors.teal} />
        <Text style={styles.title}>Sessions</Text>
        <Text style={styles.subtitle}>Your consultations will appear here.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
    paddingBottom: BOTTOM_NAV_HEIGHT,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  title: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.secondaryBody,
    color: Colors.textSecondary,
  },
});
