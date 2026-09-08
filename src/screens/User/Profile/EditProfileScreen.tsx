import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BOTTOM_NAV_HEIGHT, Colors, Radius, SCREEN_PADDING_H, Shadows, Spacing, Typography } from '@/theme';

export function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('Aisha Desai');
  const [email, setEmail] = useState('aisha.desai@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [dob, setDob] = useState('1995-10-24');
  const [tob, setTob] = useState('08:30 AM');
  const [pob, setPob] = useState('Mumbai, Maharashtra');

  const [showPickerModal, setShowPickerModal] = useState<'DATE' | 'TIME' | null>(null);
  const [showMediaSelector, setShowMediaSelector] = useState(false);

  const handleSave = () => {
    router.back();
  };

  const renderMockPicker = () => {
    if (!showPickerModal) return null;

    const isDate = showPickerModal === 'DATE';

    return (
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Select {isDate ? 'Date of Birth' : 'Time of Birth'}</Text>
          
          {/* Mock Picker UI (Wheel style illusion) */}
          <View style={styles.pickerWheel}>
            <View style={styles.pickerRowFaded}>
              <Text style={styles.pickerTextFaded}>{isDate ? '23' : '07'} {isDate ? 'Sept' : ''}</Text>
              <Text style={styles.pickerTextFaded}>{isDate ? '1994' : '15 AM'}</Text>
            </View>
            <View style={styles.pickerRowActive}>
              <Text style={styles.pickerTextActive}>{isDate ? '24' : '08'} {isDate ? 'Oct' : ''}</Text>
              <Text style={styles.pickerTextActive}>{isDate ? '1995' : '30 AM'}</Text>
            </View>
            <View style={styles.pickerRowFaded}>
              <Text style={styles.pickerTextFaded}>{isDate ? '25' : '09'} {isDate ? 'Nov' : ''}</Text>
              <Text style={styles.pickerTextFaded}>{isDate ? '1996' : '45 AM'}</Text>
            </View>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowPickerModal(null)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalConfirmBtn} onPress={() => setShowPickerModal(null)}>
              <Text style={styles.modalConfirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderMediaSelector = () => {
    if (!showMediaSelector) return null;
    return (
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Change Profile Photo</Text>
          <TouchableOpacity style={styles.mediaOptionBtn} onPress={() => setShowMediaSelector(false)}>
            <Ionicons name="camera-outline" size={20} color={Colors.textPrimary} />
            <Text style={styles.mediaOptionText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediaOptionBtn} onPress={() => setShowMediaSelector(false)}>
            <Ionicons name="image-outline" size={20} color={Colors.textPrimary} />
            <Text style={styles.mediaOptionText}>Choose from Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.mediaOptionBtn, styles.mediaOptionDestructive]} onPress={() => setShowMediaSelector(false)}>
            <Ionicons name="trash-outline" size={20} color={'#E53E3E'} />
            <Text style={[styles.mediaOptionText, { color: '#E53E3E' }]}>Remove Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowMediaSelector(false)}>
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Avatar Edit */}
          <View style={styles.avatarSection}>
            <TouchableOpacity style={styles.avatarPlaceholder} onPress={() => setShowMediaSelector(true)}>
              <Text style={styles.avatarText}>AD</Text>
              <View style={styles.editBadge}>
                <Ionicons name="camera" size={14} color={Colors.backgroundWhite} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Personal Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PERSONAL DETAILS</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Astrological Birth Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ASTROLOGICAL BIRTH DETAILS</Text>
          
          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity style={styles.pickerInput} onPress={() => setShowPickerModal('DATE')}>
                <Text style={styles.pickerInputValue}>{dob}</Text>
                <Ionicons name="calendar-outline" size={20} color={Colors.textTertiary} />
              </TouchableOpacity>
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Time of Birth</Text>
              <TouchableOpacity style={styles.pickerInput} onPress={() => setShowPickerModal('TIME')}>
                <Text style={styles.pickerInputValue}>{tob}</Text>
                <Ionicons name="time-outline" size={20} color={Colors.textTertiary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Place of Birth</Text>
            <TextInput
              style={styles.input}
              value={pob}
              onChangeText={setPob}
              placeholder="City, State"
            />
          </View>
        </View>

        <View style={{ height: BOTTOM_NAV_HEIGHT + Spacing.xxl }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {renderMockPicker()}
      {renderMediaSelector()}
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
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  backBtn: {
    padding: Spacing.xs,
    marginLeft: -Spacing.xs,
  },
  pageTitle: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
  },
  saveText: {
    ...Typography.button,
    color: Colors.teal,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.md,
    gap: Spacing.xl,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.tealSoft,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: {
    ...Typography.pageTitle,
    color: Colors.teal,
    fontSize: 28,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.cosmosPlum,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.backgroundPrimary,
  },
  section: {
    gap: Spacing.md,
  },
  sectionTitle: {
    ...Typography.caption,
    fontWeight: '800',
    color: '#8A92A0',
    fontSize: 11,
    letterSpacing: 0.8,
  },
  inputGroup: {
    gap: Spacing.xs,
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  input: {
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    height: 48,
    ...Typography.body,
    color: Colors.textPrimary,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  pickerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    height: 48,
  },
  pickerInputValue: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(63, 41, 64, 0.6)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  modalCard: {
    width: '100%',
    backgroundColor: Colors.backgroundWhite,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.xl,
    paddingBottom: 40,
    ...Shadows.md,
  },
  modalTitle: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  pickerWheel: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  pickerRowFaded: {
    flexDirection: 'row',
    gap: Spacing.xl,
    opacity: 0.3,
  },
  pickerTextFaded: {
    ...Typography.cardTitle,
    color: Colors.textSecondary,
    fontSize: 16,
  },
  pickerRowActive: {
    flexDirection: 'row',
    gap: Spacing.xl,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.sm,
  },
  pickerTextActive: {
    ...Typography.cardTitle,
    color: Colors.teal,
    fontSize: 22,
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundCream,
    alignItems: 'center',
  },
  modalCancelText: {
    ...Typography.button,
    color: Colors.textSecondary,
  },
  modalConfirmBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: Radius.pill,
    backgroundColor: Colors.teal,
    alignItems: 'center',
  },
  modalConfirmText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
  },
  mediaOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderColor: Colors.borderSubtle,
    gap: Spacing.md,
  },
  mediaOptionDestructive: {
    borderBottomWidth: 0,
  },
  mediaOptionText: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
});
