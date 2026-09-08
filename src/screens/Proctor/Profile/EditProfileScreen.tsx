/**
 * EditProfileScreen — Astrologer Profile Editor
 *
 * Matches Image 3:
 *   - Change Photo with camera badge
 *   - Display Name, Professional Title, multiline Bio
 *   - Experience (Yrs) & Location inputs
 *   - Interactive Language tags (English ×, Hindi ×, Add Language)
 *   - Save Changes action button
 */
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
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

export function EditProfileScreen() {
  const router = useRouter();

  const [displayName, setDisplayName] = useState(MOCK_PROCTOR_PROFILE.name);
  const [title, setTitle] = useState(MOCK_PROCTOR_PROFILE.title);
  const [bio, setBio] = useState(MOCK_PROCTOR_PROFILE.bio);
  const [experience, setExperience] = useState(MOCK_PROCTOR_PROFILE.experienceYears.toString());
  const [location, setLocation] = useState(MOCK_PROCTOR_PROFILE.location);
  const [languages, setLanguages] = useState<string[]>(MOCK_PROCTOR_PROFILE.languages);
  const [newLanguageInput, setNewLanguageInput] = useState('');
  const [specialties, setSpecialties] = useState<string[]>(MOCK_PROCTOR_PROFILE.specialties);
  const [newSpecialtyInput, setNewSpecialtyInput] = useState('');

  const handleRemoveLanguage = (langToRemove: string) => {
    setLanguages(languages.filter((l) => l !== langToRemove));
  };

  const handleAddLanguage = () => {
    if (!newLanguageInput.trim()) return;
    const trimmed = newLanguageInput.trim();
    if (!languages.includes(trimmed)) {
      setLanguages([...languages, trimmed]);
    }
    setNewLanguageInput('');
  };

  const handleRemoveSpecialty = (specToRemove: string) => {
    setSpecialties(specialties.filter((s) => s !== specToRemove));
  };

  const handleAddSpecialty = () => {
    if (!newSpecialtyInput.trim()) return;
    const trimmed = newSpecialtyInput.trim();
    if (!specialties.includes(trimmed)) {
      setSpecialties([...specialties, trimmed]);
    }
    setNewSpecialtyInput('');
  };

  const handleSave = () => {
    Alert.alert('Profile Updated', 'Your professional profile changes have been saved successfully.', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 32 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Avatar with Camera Badge */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrap}>
              <Image
                source={{ uri: MOCK_PROCTOR_PROFILE.avatarUrl }}
                style={styles.avatar}
                contentFit="cover"
              />
              <TouchableOpacity style={styles.cameraBadge}>
                <Ionicons name="camera" size={16} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Text style={styles.changePhotoText}>CHANGE PHOTO</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            {/* Display Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>DISPLAY NAME</Text>
              <TextInput
                style={styles.input}
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="e.g. Dr. Amara Singh"
                placeholderTextColor={Colors.textSecondary}
              />
            </View>

            {/* Professional Title */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>PROFESSIONAL TITLE</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. Vedic Astrology"
                placeholderTextColor={Colors.textSecondary}
              />
            </View>

            {/* Bio */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>BIO</Text>
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={4}
                placeholder="Describe your lineage, astrological approach, and expertise..."
                placeholderTextColor={Colors.textSecondary}
              />
            </View>

            {/* Experience & Location (2 Columns) */}
            <View style={styles.rowTwoCols}>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.fieldLabel}>EXPERIENCE (YRS)</Text>
                <TextInput
                  style={styles.input}
                  value={experience}
                  onChangeText={setExperience}
                  keyboardType="numeric"
                  placeholder="15"
                  placeholderTextColor={Colors.textSecondary}
                />
              </View>

              <View style={[styles.fieldGroup, { flex: 1.2 }]}>
                <Text style={styles.fieldLabel}>LOCATION</Text>
                <TextInput
                  style={styles.input}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="New Delhi"
                  placeholderTextColor={Colors.textSecondary}
                />
              </View>
            </View>

            {/* Languages */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>LANGUAGES</Text>
              <View style={styles.langPillsRow}>
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang}
                    style={styles.langPill}
                    onPress={() => handleRemoveLanguage(lang)}
                    accessibilityRole="button"
                    accessibilityLabel={`Remove ${lang}`}
                  >
                    <Text style={styles.langPillText}>{lang}</Text>
                    <Ionicons name="close" size={14} color={Colors.cosmosPlum} />
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={[styles.input, styles.addLangInput]}
                value={newLanguageInput}
                onChangeText={setNewLanguageInput}
                onSubmitEditing={handleAddLanguage}
                returnKeyType="done"
                placeholder="Add Language..."
                placeholderTextColor={Colors.textSecondary}
              />
            </View>

            {/* Specialties */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>SPECIALTIES</Text>
              <View style={styles.langPillsRow}>
                {specialties.map((spec) => (
                  <TouchableOpacity
                    key={spec}
                    style={styles.specialtyPill}
                    onPress={() => handleRemoveSpecialty(spec)}
                    accessibilityRole="button"
                    accessibilityLabel={`Remove ${spec}`}
                  >
                    <Text style={styles.specialtyPillText}>{spec}</Text>
                    <Ionicons name="close" size={14} color={Colors.teal} />
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={[styles.input, styles.addLangInput]}
                value={newSpecialtyInput}
                onChangeText={setNewSpecialtyInput}
                onSubmitEditing={handleAddSpecialty}
                returnKeyType="done"
                placeholder="Add Specialty..."
                placeholderTextColor={Colors.textSecondary}
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              accessibilityRole="button"
              accessibilityLabel="Save Changes"
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>

          {/* Clearance for navigation */}
          <View style={{ height: BOTTOM_NAV_HEIGHT + Spacing.xxl }} />
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  avatarSection: {
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: Radius.pill,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundWhite,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  changePhotoText: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.8,
    fontSize: 11,
    marginTop: 4,
  },
  form: {
    gap: Spacing.md,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSecondary,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    ...Typography.body,
    color: Colors.textPrimary,
    fontSize: 14,
  },
  bioInput: {
    minHeight: 110,
    textAlignVertical: 'top',
    lineHeight: 20,
  },
  rowTwoCols: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  langPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: 4,
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F7EDEC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  langPillText: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.cosmosPlum,
    fontSize: 12,
  },
  addLangInput: {
    color: Colors.textPrimary,
  },
  specialtyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.tealSoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  specialtyPillText: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.teal,
    fontSize: 12,
  },
  saveButton: {
    backgroundColor: Colors.cosmosPlum,
    borderRadius: Radius.pill,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
    ...Shadows.sm,
  },
  saveButtonText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
    fontSize: 15,
    fontWeight: '700',
  },
});
