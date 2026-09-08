import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EXPERTS } from '@/data/discovery';
import { useUser } from '@/data/user/UserContext';
import { Colors, Radius, Spacing, Typography } from '@/theme';

export function ConsultationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { upcomingSessions, endSession } = useUser();
  const [seconds, setSeconds] = useState(0);

  const expert = EXPERTS.find((e) => e.id === id);
  const activeSession = upcomingSessions.find((s) => s.expertId === id);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    if (activeSession) {
      endSession(activeSession.id);
    }
    router.replace('/sessions');
  };

  if (!expert) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Consultation not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.endBtn}>
          <Text style={styles.endBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Background elements */}
      <View style={styles.bgOverlay} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.minimizeBtn}>
          <Ionicons name="chevron-down" size={28} color={Colors.backgroundWhite} />
        </TouchableOpacity>
        <Text style={styles.secureText}>
          <Ionicons name="lock-closed" size={12} color={Colors.tealSoft} /> Secure Call
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.centerContent}>
        {/* Pulsing Avatar Container */}
        <View style={styles.avatarRings}>
          <View style={styles.ringOuter}>
            <View style={styles.ringInner}>
              <Image source={typeof expert.imageUri === 'string' ? { uri: expert.imageUri } : expert.imageUri} style={styles.avatar} />
            </View>
          </View>
        </View>

        <Text style={styles.expertName}>{expert.name}</Text>
        <Text style={styles.timer}>{formatTime(seconds)}</Text>
      </View>

      <View style={styles.bottomControls}>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.controlBtn}>
            <Ionicons name="mic-off" size={24} color={Colors.backgroundWhite} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.endCallBtn} onPress={handleEndCall}>
            <Ionicons name="call" size={28} color={Colors.backgroundWhite} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlBtn}>
            <Ionicons name="volume-high" size={24} color={Colors.backgroundWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E112A', // Very dark plum
    justifyContent: 'space-between',
  },
  bgOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    zIndex: 10,
  },
  minimizeBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secureText: {
    ...Typography.caption,
    color: Colors.tealSoft,
    fontWeight: '600',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    zIndex: 10,
  },
  avatarRings: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  ringOuter: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(215, 166, 74, 0.1)', // Gold soft
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(215, 166, 74, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  expertName: {
    ...Typography.pageTitle,
    color: Colors.backgroundWhite,
    fontSize: 28,
  },
  timer: {
    ...Typography.body,
    color: Colors.backgroundWhite,
    fontSize: 20,
    marginTop: Spacing.sm,
    fontVariant: ['tabular-nums'],
  },
  bottomControls: {
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
    zIndex: 10,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  controlBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  endCallBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E53E3E',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '135deg' }], // Rotate phone icon down
  },
  errorContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  endBtn: {
    backgroundColor: Colors.teal,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
  },
  endBtnText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
  },
});
