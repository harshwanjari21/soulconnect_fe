import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BOTTOM_NAV_HEIGHT, Colors, Radius, SCREEN_PADDING_H, Shadows, Spacing, Typography } from '@/theme';

export function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('Aisha Desai');
  const [email, setEmail] = useState('aisha.desai@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [dob, setDob] = useState(new Date(1995, 9, 24)); // Oct 24, 1995
  const [tob, setTob] = useState(new Date(1995, 9, 24, 8, 30)); // 08:30 AM
  const [pob, setPob] = useState('Mumbai, Maharashtra');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const [showPickerModal, setShowPickerModal] = useState<'DATE' | 'TIME' | null>(null);
  const [showMediaSelector, setShowMediaSelector] = useState(false);

  const handleSave = () => {
    router.back();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPickerModal(null);
    if (selectedDate) {
      if (showPickerModal === 'DATE') setDob(selectedDate);
      if (showPickerModal === 'TIME') setTob(selectedDate);
    }
  };

  const renderDateTimePicker = () => {
    if (!showPickerModal) return null;
    return (
      <DateTimePicker
        value={showPickerModal === 'DATE' ? dob : tob}
        mode={showPickerModal === 'DATE' ? 'date' : 'time'}
        display="default"
        onChange={handleDateChange}
      />
    );
  };

  const takePhoto = async () => {
    setShowMediaSelector(false);
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) setAvatarUri(result.assets[0].uri);
  };

  const pickImage = async () => {
    setShowMediaSelector(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) setAvatarUri(result.assets[0].uri);
  };

  const renderMediaSelector = () => {
    if (!showMediaSelector) return null;
    return (
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Change Profile Photo</Text>
          <TouchableOpacity style={styles.mediaOptionBtn} onPress={takePhoto}>
            <Ionicons name="camera-outline" size={20} color={Colors.textPrimary} />
            <Text style={styles.mediaOptionText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediaOptionBtn} onPress={pickImage}>
            <Ionicons name="image-outline" size={20} color={Colors.textPrimary} />
            <Text style={styles.mediaOptionText}>Choose from Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.mediaOptionBtn, styles.mediaOptionDestructive]} onPress={() => { setAvatarUri(null); setShowMediaSelector(false); }}>
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
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={{ width: 80, height: 80, borderRadius: 40 }} />
              ) : (
                <Text style={styles.avatarText}>AD</Text>
              )}
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
                <Text style={styles.pickerInputValue}>{dob.toISOString().split('T')[0]}</Text>
                <Ionicons name="calendar-outline" size={20} color={Colors.textTertiary} />
              </TouchableOpacity>
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Time of Birth</Text>
              <TouchableOpacity style={styles.pickerInput} onPress={() => setShowPickerModal('TIME')}>
                <Text style={styles.pickerInputValue}>{tob.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
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

      {renderDateTimePicker()}
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
    paddingBottom: Platform.OS === 'ios' ? 40 : Spacing.xl,
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
    color: Colors.textPrimary,
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
