/**
 * ConsultationRoomScreen — Active live session workspace for astrologer
 */
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ConsultationType } from '@/data/proctor';
import { Colors, Radius, SCREEN_PADDING_H, Shadows, Spacing, Typography } from '@/theme';

import { ClientBirthCard } from './components/ClientBirthCard';
import { KundliChart } from './components/KundliChart';
import { SessionNotes } from './components/SessionNotes';
import { SessionTimer } from './components/SessionTimer';

export function ConsultationRoomScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    clientName?: string;
    consultationType?: ConsultationType;
    ratePerMin?: string;
    dob?: string;
    tob?: string;
    pob?: string;
    moonSign?: string;
    sunSign?: string;
    lagna?: string;
    topic?: string;
  }>();

  const clientName = params.clientName || 'Client';
  const consultationType = (params.consultationType as ConsultationType) || 'audio';
  const ratePerMin = params.ratePerMin ? parseInt(params.ratePerMin, 10) : 45;
  const dob = params.dob || '24 Oct 1993';
  const tob = params.tob || '07:15 AM';
  const pob = params.pob || 'Mumbai, India';
  const moonSign = params.moonSign || 'Aquarius';
  const sunSign = params.sunSign || 'Scorpio';
  const lagna = params.lagna || 'Libra';
  const topic = params.topic || 'General Consultation';

  const [activeTab, setActiveTab] = useState<'chart' | 'details' | 'notes'>('chart');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  const handleEndSession = () => {
    Alert.alert(
      'End Consultation?',
      'Are you sure you want to end this consultation session?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End Session',
          style: 'destructive',
          onPress: () => {
            // Return to proctor dashboard
            router.replace('/proctor' as any);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Top Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.clientTitle}>{clientName}</Text>
          <Text style={styles.topicText} numberOfLines={1}>{topic}</Text>
        </View>

        <TouchableOpacity
          style={styles.endBtnTop}
          onPress={handleEndSession}
          accessibilityRole="button"
          accessibilityLabel="End Session"
        >
          <Ionicons name="call" size={14} color={Colors.backgroundWhite} />
          <Text style={styles.endBtnTopText}>End Call</Text>
        </TouchableOpacity>
      </View>

      {/* Live Running Timer & Billing Bar */}
      <View style={styles.timerSection}>
        <SessionTimer
          ratePerMin={ratePerMin}
          consultationType={consultationType}
          isActive={true}
        />
      </View>

      {/* View Mode Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'chart' && styles.tabItemActive]}
          onPress={() => setActiveTab('chart')}
        >
          <Ionicons
            name="grid-outline"
            size={16}
            color={activeTab === 'chart' ? Colors.teal : Colors.textSecondary}
          />
          <Text style={[styles.tabText, activeTab === 'chart' && styles.tabTextActive]}>
            Kundli Chart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'details' && styles.tabItemActive]}
          onPress={() => setActiveTab('details')}
        >
          <Ionicons
            name="person-outline"
            size={16}
            color={activeTab === 'details' ? Colors.teal : Colors.textSecondary}
          />
          <Text style={[styles.tabText, activeTab === 'details' && styles.tabTextActive]}>
            Birth Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'notes' && styles.tabItemActive]}
          onPress={() => setActiveTab('notes')}
        >
          <Ionicons
            name="create-outline"
            size={16}
            color={activeTab === 'notes' ? Colors.teal : Colors.textSecondary}
          />
          <Text style={[styles.tabText, activeTab === 'notes' && styles.tabTextActive]}>
            Remedies & Notes
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Workspace Body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'chart' && (
          <View style={styles.tabContent}>
            <KundliChart lagnaSign={`${lagna} (House 1)`} size={320} />
            <ClientBirthCard
              clientName={clientName}
              dob={dob}
              tob={tob}
              pob={pob}
              moonSign={moonSign}
              sunSign={sunSign}
              lagna={lagna}
            />
          </View>
        )}

        {activeTab === 'details' && (
          <View style={styles.tabContent}>
            <ClientBirthCard
              clientName={clientName}
              dob={dob}
              tob={tob}
              pob={pob}
              moonSign={moonSign}
              sunSign={sunSign}
              lagna={lagna}
            />
          </View>
        )}

        {activeTab === 'notes' && (
          <View style={styles.tabContent}>
            <SessionNotes />
          </View>
        )}
      </ScrollView>

      {/* Persistent Call Controls Bottom Bar */}
      <View style={styles.controlsBar}>
        <TouchableOpacity
          style={[styles.controlBtn, isMuted && styles.controlBtnActive]}
          onPress={() => setIsMuted((prev) => !prev)}
        >
          <Ionicons
            name={isMuted ? 'mic-off' : 'mic-outline'}
            size={22}
            color={isMuted ? Colors.backgroundWhite : Colors.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlBtn, isSpeakerOn && styles.controlBtnSpeakerActive]}
          onPress={() => setIsSpeakerOn((prev) => !prev)}
        >
          <Ionicons
            name={isSpeakerOn ? 'volume-high' : 'volume-mute-outline'}
            size={22}
            color={isSpeakerOn ? Colors.teal : Colors.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.hangupBtn}
          onPress={handleEndSession}
          accessibilityRole="button"
          accessibilityLabel="End Consultation"
        >
          <Ionicons name="call" size={24} color={Colors.backgroundWhite} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING_H,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.backgroundPrimary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeft: {
    flex: 1,
    gap: 2,
    marginRight: Spacing.md,
  },
  clientTitle: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 17,
  },
  topicText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  endBtnTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.accentCoral,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  endBtnTopText: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.backgroundWhite,
  },
  timerSection: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingVertical: Spacing.sm,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundCream,
    marginHorizontal: SCREEN_PADDING_H,
    borderRadius: Radius.md,
    padding: 3,
    marginBottom: Spacing.sm,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: Radius.sm,
  },
  tabItemActive: {
    backgroundColor: Colors.backgroundWhite,
    ...Shadows.xs,
  },
  tabText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
    fontSize: 12,
  },
  tabTextActive: {
    color: Colors.teal,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingBottom: 20,
  },
  tabContent: {
    gap: Spacing.md,
  },
  controlsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.backgroundWhite,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadows.md,
  },
  controlBtn: {
    width: 48,
    height: 48,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundCream,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  controlBtnActive: {
    backgroundColor: Colors.accentCoral,
    borderColor: Colors.accentCoral,
  },
  controlBtnSpeakerActive: {
    backgroundColor: Colors.tealSoft,
    borderColor: Colors.teal,
  },
  hangupBtn: {
    width: 54,
    height: 54,
    borderRadius: Radius.pill,
    backgroundColor: Colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
});
