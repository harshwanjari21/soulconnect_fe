/**
 * ReviewsScreen — Astrologer Reviews Feed & Response Management
 *
 * Matches Image 5:
 *   - Overall 4.9 rating summary
 *   - Filter pills: All, 5★, 4★, 3★, 2★, 1★
 *   - Client reviews with consultation type and date
 *   - Astrologer reply management (View, Post reply, Edit reply)
 */
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/common/ScreenHeader';
import { AstrologerReview, MOCK_REVIEWS } from '@/data/proctor';
import {
  BOTTOM_NAV_HEIGHT,
  Colors,
  Radius,
  SCREEN_PADDING_H,
  Shadows,
  Spacing,
  Typography,
} from '@/theme';

export function ReviewsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [reviews, setReviews] = useState<AstrologerReview[]>(MOCK_REVIEWS);
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const filterOptions = ['All', '5 ★', '4 ★', '3 ★', '2 ★', '1 ★'];

  const filteredReviews = reviews.filter((rev) => {
    if (selectedFilter === 'All') return true;
    const star = parseInt(selectedFilter[0], 10);
    return rev.rating === star;
  });

  const handleStartReply = (rev: AstrologerReview) => {
    setReplyingReviewId(rev.id);
    setReplyText(rev.astrologerReply?.text || '');
  };

  const handleSaveReply = (reviewId: string) => {
    if (!replyText.trim()) return;

    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          return {
            ...r,
            astrologerReply: {
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
          const { astrologerReply, ...rest } = r;
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
      <ScreenHeader title="Reviews" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Rating Summary Bar */}
        <View style={styles.ratingSummaryRow}>
          <Text style={styles.ratingBig}>4.9</Text>
          <View style={styles.ratingStarsRow}>
            {renderStars(5)}
          </View>
          <Text style={styles.reviewsCountText}>2.4k Reviews</Text>
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterBar}
        >
          {filterOptions.map((opt) => {
            const isSelected = opt === selectedFilter;
            return (
              <TouchableOpacity
                key={opt}
                style={[styles.filterPill, isSelected && styles.filterPillSelected]}
                onPress={() => setSelectedFilter(opt)}
                accessibilityRole="button"
                accessibilityLabel={`Filter ${opt}`}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    isSelected && styles.filterPillTextSelected,
                  ]}
                >
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
                    <Image
                      source={{ uri: rev.clientAvatar }}
                      style={styles.avatar}
                      contentFit="cover"
                    />
                    <View style={styles.clientMeta}>
                      <Text style={styles.clientName}>{rev.clientName}</Text>
                      <Text style={styles.dateMeta}>
                        {rev.date} • {rev.consultationType === 'video' ? 'Video' : rev.consultationType === 'audio' ? 'Audio' : 'Chat'} Consultation
                      </Text>
                    </View>
                  </View>

                  <View style={styles.starsGroup}>{renderStars(rev.rating)}</View>
                </View>

                {/* Review Text */}
                <Text style={styles.commentText}>"{rev.comment}"</Text>

                {/* Astrologer Reply Section */}
                {rev.astrologerReply && !isReplying && (
                  <View style={styles.replyCard}>
                    <View style={styles.replyHeader}>
                      <View style={styles.replyHeaderLeft}>
                        <Ionicons name="return-down-forward" size={14} color={Colors.cosmosPlum} />
                        <Text style={styles.replyHeaderTitle}>Your Response</Text>
                        <Text style={styles.replyDate}>• {rev.astrologerReply.repliedAt}</Text>
                      </View>
                      <View style={styles.replyActions}>
                        <TouchableOpacity
                          onPress={() => handleStartReply(rev)}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                          <Text style={styles.actionEditText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleDeleteReply(rev.id)}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                          <Text style={styles.actionDeleteText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text style={styles.replyBodyText}>{rev.astrologerReply.text}</Text>
                  </View>
                )}

                {/* Reply Input Box (when replying/editing) */}
                {isReplying ? (
                  <View style={styles.replyInputBox}>
                    <Text style={styles.replyInputLabel}>Write reply to {rev.clientName}:</Text>
                    <TextInput
                      style={styles.replyTextInput}
                      placeholder="Thank the seeker or address their feedback..."
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
                      <TouchableOpacity
                        style={styles.saveReplyBtn}
                        onPress={() => handleSaveReply(rev.id)}
                      >
                        <Text style={styles.saveReplyBtnText}>Send Reply</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  !rev.astrologerReply && (
                    <TouchableOpacity
                      style={styles.replyPromptBtn}
                      onPress={() => handleStartReply(rev)}
                    >
                      <Ionicons name="chatbubble-ellipses-outline" size={14} color={Colors.teal} />
                      <Text style={styles.replyPromptText}>Reply to review</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            );
          })}
        </View>

        {/* Clearance for navigation */}
        <View style={{ height: BOTTOM_NAV_HEIGHT + Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: Spacing.md,
  },
  ratingSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  ratingBig: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
  },
  ratingStarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  reviewsCountText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 13,
    marginLeft: 2,
  },
  filterBar: {
    gap: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterPillSelected: {
    backgroundColor: Colors.cosmosPlum,
    borderColor: Colors.cosmosPlum,
  },
  filterPillText: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textPrimary,
    fontSize: 12,
  },
  filterPillTextSelected: {
    color: Colors.backgroundWhite,
  },
  list: {
    gap: Spacing.md,
  },
  card: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.xs,
    gap: Spacing.sm,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: Radius.pill,
    backgroundColor: Colors.border,
  },
  clientMeta: {
    gap: 2,
  },
  clientName: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontSize: 15,
  },
  dateMeta: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  starsGroup: {
    flexDirection: 'row',
    gap: 2,
  },
  commentText: {
    ...Typography.secondaryBody,
    color: Colors.textPrimary,
    fontSize: 13,
    lineHeight: 19,
  },
  replyCard: {
    backgroundColor: Colors.backgroundCream,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: 4,
    gap: 4,
  },
  replyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  replyHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  replyHeaderTitle: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.cosmosPlum,
    fontSize: 11,
  },
  replyDate: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
  },
  replyActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionEditText: {
    ...Typography.caption,
    color: Colors.teal,
    fontWeight: '600',
    fontSize: 11,
  },
  actionDeleteText: {
    ...Typography.caption,
    color: Colors.accentCoral,
    fontWeight: '600',
    fontSize: 11,
  },
  replyBodyText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontSize: 12,
    lineHeight: 18,
  },
  replyPromptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    paddingVertical: 4,
    marginTop: 2,
  },
  replyPromptText: {
    ...Typography.caption,
    color: Colors.teal,
    fontWeight: '700',
    fontSize: 12,
  },
  replyInputBox: {
    backgroundColor: Colors.backgroundCream,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: 4,
    gap: Spacing.xs,
  },
  replyInputLabel: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textPrimary,
    fontSize: 11,
  },
  replyTextInput: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.sm,
    ...Typography.body,
    fontSize: 12,
    color: Colors.textPrimary,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  replyButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
    marginTop: 4,
  },
  cancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cancelBtnText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  saveReplyBtn: {
    backgroundColor: Colors.teal,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  saveReplyBtnText: {
    ...Typography.button,
    color: Colors.backgroundWhite,
    fontSize: 12,
  },
});
