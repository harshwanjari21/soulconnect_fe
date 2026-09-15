import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/common/ScreenHeader';
import { Colors, Radius, SCREEN_PADDING_H, Shadows, Spacing, Typography } from '@/theme';

// Define a type for client-side review display with threading
type ClientReview = {
  id: string;
  clientName: string;
  clientAvatar: string;
  rating: number;
  date: string;
  consultationType: 'video' | 'audio' | 'chat';
  comment: string;
  isSelfReview?: boolean;
  astrologerReply?: {
    text: string;
    repliedAt: string;
  };
  clientReplyToAstrologer?: {
    text: string;
    repliedAt: string;
  };
};

const MOCK_USER_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    clientName: 'Priya K.',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '12 Oct 2023',
    consultationType: 'video',
    comment: 'The consultation was incredibly insightful. Dr. Singh has a way of explaining complex astrological transits in a way that is easy to understand. Highly recommend!',
    isSelfReview: true, // Marking this as self-review for demonstration
    astrologerReply: {
      text: 'Thank you Priya! It was wonderful speaking with you and guiding you on your path.',
      repliedAt: '13 Oct 2023',
    }
  },
  {
    id: 'rev-2',
    clientName: 'Rahul M.',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '10 Oct 2023',
    consultationType: 'audio',
    comment: 'Very accurate readings about my career change. Thank you for the guidance.',
    astrologerReply: {
      text: 'Thank you Rahul! Wishing you immense success and planetary harmony in your new endeavor.',
      repliedAt: '10 Oct 2023',
    },
  },
  {
    id: 'rev-3',
    clientName: 'Ananya S.',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 4,
    date: '08 Oct 2023',
    consultationType: 'chat',
    comment: 'Amazing experience. Very patient and detailed with all my questions.',
  },
];

export function ClientReviewsScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [reviews, setReviews] = useState<ClientReview[]>(MOCK_USER_REVIEWS);
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  const filterOptions = ['All', '5 ★', '4 ★', '3 ★', '2 ★', '1 ★'];

  const filteredReviews = reviews.filter((rev) => {
    if (selectedFilter === 'All') return true;
    const star = parseInt(selectedFilter[0], 10);
    return rev.rating === star;
  });

  const handleDeleteSelfReview = (reviewId: string) => {
    setReviewToDelete(reviewId);
  };

  const confirmDeleteReview = () => {
    if (reviewToDelete) {
      setReviews((prev) => prev.filter((r) => r.id !== reviewToDelete));
      setReviewToDelete(null);
    }
  };

  const handleStartReply = (rev: ClientReview) => {
    setReplyingReviewId(rev.id);
    setReplyText(rev.clientReplyToAstrologer?.text || '');
  };

  const handleSaveReply = (reviewId: string) => {
    if (!replyText.trim()) return;
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          return {
            ...r,
            clientReplyToAstrologer: {
              text: replyText.trim(),
              repliedAt: 'Just now',
            },
          };
        }
        return r;
      }),
    );
    setReplyingReviewId(null);
    setReplyText('');
  };

  const handleDeleteReply = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          const { clientReplyToAstrologer, ...rest } = r;
          return rest;
        }
        return r;
      }),
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={14}
        color={Colors.gold}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScreenHeader title="All Reviews" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Rating Summary Bar */}
        <View style={styles.ratingSummaryRow}>
          <Text style={styles.ratingBig}>4.9</Text>
          <View style={styles.ratingStarsRow}>
            {renderStars(5)}
          </View>
          <Text style={styles.reviewsCountText}>2.4k Reviews</Text>
        </View>

        {/* Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterBar}>
          {filterOptions.map((opt) => {
            const isSelected = opt === selectedFilter;
            return (
              <TouchableOpacity
                key={opt}
                style={[styles.filterPill, isSelected && styles.filterPillSelected]}
                onPress={() => setSelectedFilter(opt)}
              >
                <Text style={[styles.filterPillText, isSelected && styles.filterPillTextSelected]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Reviews List */}
        <View style={styles.list}>
          {filteredReviews.map((rev) => {
            const isReplying = replyingReviewId === rev.id;

            return (
              <View key={rev.id} style={styles.card}>
                {/* Top Row: Avatar, Name & Stars */}
                <View style={styles.cardTopRow}>
                  <View style={styles.clientRow}>
                    <Image source={{ uri: rev.clientAvatar }} style={styles.avatar} />
                    <View style={styles.clientMeta}>
                      <Text style={styles.clientName}>
                        {rev.clientName} {rev.isSelfReview && <Text style={{ color: Colors.teal }}>(You)</Text>}
                      </Text>
                      <Text style={styles.dateMeta}>
                        {rev.date} • {rev.consultationType === 'video' ? 'Video' : rev.consultationType === 'audio' ? 'Audio' : 'Chat'} Consultation
                      </Text>
                    </View>
                  </View>
                  <View style={styles.rightActionsRow}>
                    <View style={styles.starsGroup}>{renderStars(rev.rating)}</View>
                    {rev.isSelfReview && (
                      <TouchableOpacity onPress={() => handleDeleteSelfReview(rev.id)} style={styles.deleteIconBtn}>
                        <Ionicons name="trash-outline" size={16} color={Colors.accentCoral} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                {/* Review Text */}
                <Text style={styles.commentText}>"{rev.comment}"</Text>

                {/* Astrologer Reply Section */}
                {rev.astrologerReply && (
                  <View style={styles.replyCard}>
                    <View style={styles.replyHeader}>
                      <View style={styles.replyHeaderLeft}>
                        <Ionicons name="return-down-forward" size={14} color={Colors.cosmosPlum} />
                        <Text style={styles.replyHeaderTitle}>Astrologer\'s Response</Text>
                        <Text style={styles.replyDate}>• {rev.astrologerReply.repliedAt}</Text>
                      </View>
                    </View>
                    <Text style={styles.replyBodyText}>{rev.astrologerReply.text}</Text>
                  </View>
                )}

                {/* Client Reply (Nested) */}
                {rev.clientReplyToAstrologer && !isReplying && (
                  <View style={styles.clientReplyCard}>
                    <View style={styles.replyHeader}>
                      <View style={styles.replyHeaderLeft}>
                        <Ionicons name="arrow-undo-outline" size={14} color={Colors.teal} />
                        <Text style={styles.clientReplyTitle}>Your Reply</Text>
                        <Text style={styles.replyDate}>• {rev.clientReplyToAstrologer.repliedAt}</Text>
                      </View>
                      <View style={styles.replyActions}>
                        <TouchableOpacity onPress={() => handleStartReply(rev)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                          <Text style={styles.actionEditText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteReply(rev.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                          <Text style={styles.actionDeleteText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text style={styles.replyBodyText}>{rev.clientReplyToAstrologer.text}</Text>
                  </View>
                )}

                {/* Reply Input Box (when replying/editing) */}
                {isReplying ? (
                  <View style={styles.replyInputBox}>
                    <Text style={styles.replyInputLabel}>Reply back to Astrologer:</Text>
                    <TextInput
                      style={styles.replyTextInput}
                      placeholder="Type your response..."
                      placeholderTextColor={Colors.textSecondary}
                      multiline
                      value={replyText}
                      onChangeText={setReplyText}
                    />
                    <View style={styles.replyButtonsRow}>
                      <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={() => {
                          setReplyingReviewId(null);
                          setReplyText('');
                        }}
                      >
                        <Text style={styles.cancelBtnText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.saveReplyBtn} onPress={() => handleSaveReply(rev.id)}>
                        <Text style={styles.saveReplyBtnText}>Send Reply</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  rev.isSelfReview && rev.astrologerReply && !rev.clientReplyToAstrologer && (
                    <TouchableOpacity style={styles.replyPromptBtn} onPress={() => handleStartReply(rev)}>
                      <Ionicons name="chatbubble-ellipses-outline" size={14} color={Colors.teal} />
                      <Text style={styles.replyPromptText}>Reply back</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            );
          })}
        </View>

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>

      {/* Delete Confirmation Modal */}
      {reviewToDelete && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Delete Review</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this review? This action cannot be undone.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setReviewToDelete(null)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirm} onPress={confirmDeleteReview}>
                <Text style={styles.modalConfirmText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAF7F2' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: SCREEN_PADDING_H, paddingTop: Spacing.md },
  
  ratingSummaryRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  ratingBig: { ...Typography.pageTitle, color: Colors.cosmosPlum, fontSize: 28, fontWeight: '800' },
  ratingStarsRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  reviewsCountText: { ...Typography.caption, color: Colors.textSecondary, fontSize: 13, marginLeft: 2 },
  
  filterBar: { gap: Spacing.sm, paddingBottom: Spacing.lg },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterPillSelected: { backgroundColor: Colors.cosmosPlum, borderColor: Colors.cosmosPlum },
  filterPillText: { ...Typography.caption, fontWeight: '700', color: Colors.textPrimary, fontSize: 12 },
  filterPillTextSelected: { color: Colors.backgroundWhite },
  
  list: { gap: Spacing.md },
  card: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    ...Shadows.xs,
    gap: Spacing.sm,
  },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  clientRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flex: 1 },
  avatar: { width: 44, height: 44, borderRadius: Radius.pill, backgroundColor: Colors.border },
  clientMeta: { gap: 2 },
  clientName: { ...Typography.cardTitle, color: Colors.cosmosPlum, fontSize: 15 },
  dateMeta: { ...Typography.caption, color: Colors.textSecondary, fontSize: 11 },
  
  rightActionsRow: { alignItems: 'flex-end', gap: Spacing.xs },
  starsGroup: { flexDirection: 'row', gap: 2 },
  deleteIconBtn: { padding: 4 },
  
  commentText: { ...Typography.secondaryBody, color: Colors.textPrimary, fontSize: 13, lineHeight: 19 },
  
  replyCard: {
    backgroundColor: '#F4EEF8',
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: 4,
    gap: 4,
  },
  clientReplyCard: {
    backgroundColor: Colors.tealSoft,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: 4,
    marginLeft: Spacing.lg,
    gap: 4,
  },
  replyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  replyHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  replyHeaderTitle: { ...Typography.caption, fontWeight: '700', color: Colors.cosmosPlum, fontSize: 11 },
  clientReplyTitle: { ...Typography.caption, fontWeight: '700', color: Colors.teal, fontSize: 11 },
  replyDate: { ...Typography.caption, color: Colors.textSecondary, fontSize: 10 },
  
  replyActions: { flexDirection: 'row', gap: Spacing.sm },
  actionEditText: { ...Typography.caption, color: Colors.teal, fontWeight: '600', fontSize: 11 },
  actionDeleteText: { ...Typography.caption, color: Colors.accentCoral, fontWeight: '600', fontSize: 11 },
  
  replyBodyText: { ...Typography.caption, color: Colors.textPrimary, fontSize: 12, lineHeight: 18 },
  
  replyPromptBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 5, paddingVertical: 4, marginTop: 2 },
  replyPromptText: { ...Typography.caption, color: Colors.teal, fontWeight: '700', fontSize: 12 },
  
  replyInputBox: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.xs,
  },
  replyInputLabel: { ...Typography.caption, fontWeight: '700', color: Colors.cosmosPlum, fontSize: 11 },
  replyTextInput: {
    backgroundColor: Colors.backgroundCream,
    borderRadius: Radius.sm,
    padding: Spacing.sm,
    ...Typography.body,
    fontSize: 12,
    color: Colors.textPrimary,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  replyButtonsRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: Spacing.sm, marginTop: 4 },
  cancelBtn: { paddingHorizontal: 12, paddingVertical: 6 },
  cancelBtnText: { ...Typography.caption, color: Colors.textSecondary, fontSize: 12 },
  saveReplyBtn: { backgroundColor: Colors.teal, paddingHorizontal: 14, paddingVertical: 6, borderRadius: Radius.pill },
  saveReplyBtnText: { ...Typography.button, color: Colors.backgroundWhite, fontSize: 12 },
  
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(63, 41, 64, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: Spacing.xl,
  },
  modalCard: {
    width: '100%',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    ...Shadows.lg,
  },
  modalTitle: { ...Typography.sectionHeading, color: Colors.textPrimary, marginBottom: Spacing.sm },
  modalText: { ...Typography.body, color: Colors.textSecondary, marginBottom: Spacing.xl },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: Spacing.md },
  modalCancel: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md },
  modalCancelText: { ...Typography.button, color: Colors.textSecondary },
  modalConfirm: {
    backgroundColor: Colors.accentCoral,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.pill,
  },
  modalConfirmText: { ...Typography.button, color: Colors.backgroundWhite },
});
