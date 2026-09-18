/**
 * ChatScreen (Proctor) — Live chat consultation workspace for astrologer
 */
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

import { Colors, Radius, Shadows, Spacing, Typography } from '@/theme';

import { SessionTimer } from './components/SessionTimer';

type Message = {
  id: string;
  text: string;
  sender: 'proctor' | 'client';
  time: string;
};

// Subtle astrology doodle background — matches the seeker-side chat ambience
const AstrologyDoodleBackground = () => (
  <View style={StyleSheet.absoluteFill} pointerEvents="none">
    <Svg width="100%" height="100%" opacity={0.06}>
      {[...Array(20)].map((_, i) => {
        const x = (i % 4) * 100 + 20;
        const y = Math.floor(i / 4) * 150 + 40;
        return (
          <React.Fragment key={i}>
            <Circle cx={x} cy={y} r={4} fill={Colors.gold} />
            <Circle cx={x + 50} cy={y + 70} r={12} stroke={Colors.textPrimary} strokeWidth={2} fill="none" />
            <Path d={`M ${x - 20} ${y + 50} Q ${x} ${y + 30} ${x + 20} ${y + 50}`} stroke={Colors.teal} strokeWidth={2} fill="none" />
          </React.Fragment>
        );
      })}
    </Svg>
  </View>
);

export function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    clientName?: string;
    clientAvatar?: string;
    ratePerMin?: string;
    topic?: string;
  }>();

  const clientName = params.clientName || 'Client';
  const clientAvatar = params.clientAvatar;
  const ratePerMin = params.ratePerMin ? parseInt(params.ratePerMin, 10) : 15;
  const topic = params.topic || 'General Consultation';

  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Namaste! I'm here regarding: ${topic}. Please guide me.`,
      sender: 'client',
      time: '10:00 AM',
    },
  ]);

  const handleEndChat = () => {
    Alert.alert(
      'End Consultation?',
      'Are you sure you want to end this chat consultation?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End Session',
          style: 'destructive',
          onPress: () => {
            router.replace('/proctor' as any);
          },
        },
      ],
    );
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'proctor',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    // Mock client typing/reply effect
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for the guidance. That makes sense.',
        sender: 'client',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 2500);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isProctor = item.sender === 'proctor';
    return (
      <View style={[styles.msgWrapper, isProctor ? styles.msgWrapperProctor : styles.msgWrapperClient]}>
        <View style={[styles.msgBubble, isProctor ? styles.msgBubbleProctor : styles.msgBubbleClient]}>
          <Text style={[styles.msgText, isProctor ? styles.msgTextProctor : styles.msgTextClient]}>
            {item.text}
          </Text>
          <Text style={[styles.msgTime, isProctor ? styles.msgTimeProctor : styles.msgTimeClient]}>
            {item.time} {isProctor && <Ionicons name="checkmark-done" size={14} color={Colors.tealLight} />}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
            {clientAvatar ? (
              <Image source={{ uri: clientAvatar }} style={styles.headerAvatar} contentFit="cover" />
            ) : (
              <View style={[styles.headerAvatar, styles.headerAvatarFallback]}>
                <Ionicons name="person" size={20} color={Colors.textSecondary} />
              </View>
            )}
            <View style={styles.headerInfo}>
              <Text style={styles.headerName} numberOfLines={1}>{clientName}</Text>
              <Text style={styles.headerTopic} numberOfLines={1}>{topic}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.endBtn} onPress={handleEndChat}>
            <Text style={styles.endBtnText}>End</Text>
          </TouchableOpacity>
        </View>

        {/* Live billing / timer bar */}
        <View style={styles.timerSection}>
          <SessionTimer ratePerMin={ratePerMin} consultationType="chat" isActive />
        </View>

        {/* Chat List */}
        <View style={styles.chatArea}>
          <AstrologyDoodleBackground />
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        </View>

        {/* Input Area */}
        <View style={styles.inputArea}>
          <TouchableOpacity style={styles.attachBtn}>
            <Ionicons name="add-circle-outline" size={28} color={Colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type your reply..."
              placeholderTextColor={Colors.textSecondary}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
          </View>
          <TouchableOpacity
            style={[styles.sendBtn, inputText.trim() ? styles.sendBtnActive : null]}
            onPress={handleSend}
          >
            <Ionicons name="send" size={20} color={inputText.trim() ? Colors.backgroundWhite : Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.backgroundPrimary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Shadows.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backBtn: {
    marginRight: Spacing.sm,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Spacing.sm,
  },
  headerAvatarFallback: {
    backgroundColor: Colors.backgroundCream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  headerTopic: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  endBtn: {
    backgroundColor: Colors.dangerSoft,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: Radius.pill,
  },
  endBtnText: {
    ...Typography.button,
    color: Colors.danger,
    fontSize: 14,
  },
  timerSection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.backgroundPrimary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  chatArea: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  chatContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  msgWrapper: {
    flexDirection: 'row',
    width: '100%',
  },
  msgWrapperProctor: {
    justifyContent: 'flex-end',
  },
  msgWrapperClient: {
    justifyContent: 'flex-start',
  },
  msgBubble: {
    maxWidth: '80%',
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: 16,
    ...Shadows.xs,
  },
  msgBubbleProctor: {
    backgroundColor: Colors.teal,
    borderBottomRightRadius: 4,
  },
  msgBubbleClient: {
    backgroundColor: Colors.backgroundWhite,
    borderBottomLeftRadius: 4,
  },
  msgText: {
    ...Typography.body,
    fontSize: 15,
    lineHeight: 22,
  },
  msgTextProctor: {
    color: Colors.backgroundWhite,
  },
  msgTextClient: {
    color: Colors.textPrimary,
  },
  msgTime: {
    fontSize: 11,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  msgTimeProctor: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  msgTimeClient: {
    color: Colors.textSecondary,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: Spacing.sm,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.backgroundWhite,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  attachBtn: {
    padding: Spacing.xs,
    marginBottom: 4,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: Colors.backgroundCream,
    borderRadius: 20,
    marginHorizontal: Spacing.sm,
    minHeight: 40,
    maxHeight: 120,
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  input: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.backgroundCream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: Colors.teal,
  },
});
