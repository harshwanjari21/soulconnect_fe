/**
 * ConsultationModesScreen — Enable/Disable Consultation Modes & Per-minute Rates
 *
 * Allows astrologer to:
 *   - Toggle Video, Audio, and Chat consultation availability (ON / OFF)
 *   - Edit & customize per-minute rates with an interactive modal + quick presets
 *   - Persist rate updates across the entire application
 */
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MOCK_PROCTOR_PROFILE } from '@/data/proctor';
import {
  BOTTOM_NAV_HEIGHT,
  Colors,
  Radius,
  SCREEN_PADDING_H,
  Shadows,
  Spacing,
  Typography,
} from '@/theme';

type ModeItem = {
  id: 'video' | 'audio' | 'chat';
  title: string;
  rate: number;
  icon: 'videocam' | 'call' | 'chatbubble';
  enabled: boolean;
};

const PRESET_RATES = [15, 20, 25, 30, 40, 50, 65, 75, 100];

export function ConsultationModesScreen() {
  const router = useRouter();

  const [videoEnabled, setVideoEnabled] = useState(MOCK_PROCTOR_PROFILE.videoEnabled);
  const [audioEnabled, setAudioEnabled] = useState(MOCK_PROCTOR_PROFILE.audioEnabled);
  const [chatEnabled, setChatEnabled] = useState(MOCK_PROCTOR_PROFILE.chatEnabled);

  const [videoRate, setVideoRate] = useState(MOCK_PROCTOR_PROFILE.ratePerMinVideo);
  const [audioRate, setAudioRate] = useState(MOCK_PROCTOR_PROFILE.ratePerMinAudio);
  const [chatRate, setChatRate] = useState(MOCK_PROCTOR_PROFILE.ratePerMinChat);

  // Edit Rate Modal State
  const [editingMode, setEditingMode] = useState<ModeItem | null>(null);
  const [inputRate, setInputRate] = useState<string>('');

  const modes: ModeItem[] = [
    {
      id: 'video',
      title: 'Video Consultation',
      rate: videoRate,
      icon: 'videocam',
      enabled: videoEnabled,
    },
    {
      id: 'audio',
      title: 'Audio Consultation',
      rate: audioRate,
      icon: 'call',
      enabled: audioEnabled,
    },
    {
      id: 'chat',
      title: 'Chat Consultation',
      rate: chatRate,
      icon: 'chatbubble',
      enabled: chatEnabled,
    },
  ];

  const handleToggle = (id: 'video' | 'audio' | 'chat', value: boolean) => {
    if (id === 'video') {
      setVideoEnabled(value);
      MOCK_PROCTOR_PROFILE.videoEnabled = value;
    } else if (id === 'audio') {
      setAudioEnabled(value);
      MOCK_PROCTOR_PROFILE.audioEnabled = value;
    } else if (id === 'chat') {
      setChatEnabled(value);
      MOCK_PROCTOR_PROFILE.chatEnabled = value;
    }
  };

  const openRateEditor = (mode: ModeItem) => {
    setEditingMode(mode);
    setInputRate(mode.rate.toString());
  };

  const handleSaveRate = () => {
    if (!editingMode) return;
    const parsed = parseInt(inputRate.trim(), 10);

    if (isNaN(parsed) || parsed < 5) {
      Alert.alert('Invalid Rate', 'Please enter a valid rate (minimum ₹5/min).');
      return;
    }

    if (editingMode.id === 'video') {
      setVideoRate(parsed);
      MOCK_PROCTOR_PROFILE.ratePerMinVideo = parsed;
    } else if (editingMode.id === 'audio') {
      setAudioRate(parsed);
      MOCK_PROCTOR_PROFILE.ratePerMinAudio = parsed;
    } else if (editingMode.id === 'chat') {
      setChatRate(parsed);
      MOCK_PROCTOR_PROFILE.ratePerMinChat = parsed;
    }

    setEditingMode(null);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Consultation</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Subtitle */}
        <Text style={styles.descriptionText}>
          Enable or disable consultation modes and set your per-minute rates.
        </Text>

        {/* Mode Cards */}
        <View style={styles.modeList}>
          {modes.map((mode) => (
            <View key={mode.id} style={styles.card}>
              <View style={styles.leftRow}>
                <View style={styles.iconBox}>
                  <Ionicons name={mode.icon} size={20} color={Colors.cosmosPlum} />
                </View>

                <View style={styles.textGroup}>
                  <Text style={styles.modeTitle}>{mode.title}</Text>

                  {/* Clickable Rate Pill with Edit Pencil Icon */}
                  <TouchableOpacity
                    style={styles.ratePill}
                    onPress={() => openRateEditor(mode)}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel={`Change rate for ${mode.title}`}
                  >
                    <Text style={styles.rateText}>₹{mode.rate}/min</Text>
                    <Ionicons name="pencil" size={11} color={Colors.teal} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.rightToggleRow}>
                <Text style={styles.toggleStateLabel}>
                  {mode.enabled ? 'ON' : 'OFF'}
                </Text>
                <Switch
                  value={mode.enabled}
                  onValueChange={(val) => handleToggle(mode.id, val)}
                  trackColor={{ false: '#E2E8F0', true: Colors.cosmosPlum }}
                  thumbColor={Colors.backgroundWhite}
                  ios_backgroundColor="#E2E8F0"
                />
              </View>
            </View>
          ))}
        </View>

        {/* Instruction Footer Note */}
        <Text style={styles.adminNote}>
          Tap on any rate to adjust your per-minute consultation fee. Changes take effect immediately.
        </Text>

        {/* Clearance for navigation */}
        <View style={{ height: BOTTOM_NAV_HEIGHT + Spacing.xxl }} />
      </ScrollView>

      {/* Edit Rate Modal */}
      {editingMode && (
        <Modal
          transparent
          animationType="fade"
          visible={true}
          onRequestClose={() => setEditingMode(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Set {editingMode.title} Rate</Text>
                <TouchableOpacity
                  onPress={() => setEditingMode(null)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons name="close" size={20} color={Colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalSubtitle}>
                Enter the amount charged per minute to clients for this consultation mode.
              </Text>

              {/* Numeric Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.currencySymbol}>₹</Text>
                <TextInput
                  style={styles.rateInputField}
                  value={inputRate}
                  onChangeText={setInputRate}
                  keyboardType="numeric"
                  autoFocus
                  placeholder="25"
                  placeholderTextColor={Colors.textSecondary}
                />
                <Text style={styles.perMinLabel}>/ min</Text>
              </View>

              {/* Quick Presets */}
              <Text style={styles.presetsLabel}>Quick Presets:</Text>
              <View style={styles.presetsGrid}>
                {PRESET_RATES.map((preset) => {
                  const isSelected = inputRate === preset.toString();
                  return (
                    <TouchableOpacity
                      key={preset}
                      style={[
                        styles.presetPill,
                        isSelected && styles.presetPillSelected,
                      ]}
                      onPress={() => setInputRate(preset.toString())}
                    >
                      <Text
                        style={[
                          styles.presetText,
                          isSelected && styles.presetTextSelected,
                        ]}
                      >
                        ₹{preset}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Modal Actions */}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalCancelBtn}
                  onPress={() => setEditingMode(null)}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalSaveBtn}
                  onPress={handleSaveRate}
                >
                  <Text style={styles.modalSaveText}>Save Rate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  backBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
  headerTitle: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
    fontSize: 22,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.lg,
    gap: Spacing.lg,
  },
  descriptionText: {
    ...Typography.secondaryBody,
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  modeList: {
    gap: Spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    padding: Spacing.md + 2,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.xs,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.backgroundCream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGroup: {
    gap: 4,
  },
  modeTitle: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 15,
  },
  ratePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    backgroundColor: Colors.backgroundCream,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: '#EFE6D6',
  },
  rateText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '800',
    fontSize: 12,
  },
  rightToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleStateLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textPrimary,
    fontSize: 11,
  },
  adminNote: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 16,
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.lg,
    gap: Spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 17,
  },
  modalSubtitle: {
    ...Typography.secondaryBody,
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundCream,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  currencySymbol: {
    ...Typography.pageTitle,
    color: Colors.cosmosPlum,
    fontSize: 26,
    fontWeight: '800',
  },
  rateInputField: {
    ...Typography.pageTitle,
    color: Colors.cosmosPlum,
    fontSize: 28,
    fontWeight: '800',
    minWidth: 70,
    textAlign: 'center',
    padding: 0,
  },
  perMinLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
  presetsLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSecondary,
    fontSize: 11,
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundCream,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  presetPillSelected: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  presetText: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textPrimary,
    fontSize: 12,
  },
  presetTextSelected: {
    color: Colors.backgroundWhite,
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  modalCancelBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundCream,
  },
  modalCancelText: {
    ...Typography.button,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  modalSaveBtn: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: Radius.pill,
    backgroundColor: Colors.teal,
  },
  modalSaveText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
    fontSize: 14,
    fontWeight: '700',
  },
});
