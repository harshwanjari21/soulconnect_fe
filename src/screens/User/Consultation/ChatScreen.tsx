import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState, useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, Platform, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';

import { EXPERTS } from '@/data/discovery';
import { useUser } from '@/data/user/UserContext';
import { Colors, Radius, Spacing, Typography, Shadows } from '@/theme';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'expert';
  time: string;
};

// Subtle astrology doodle background
const AstrologyDoodleBackground = () => (
  <View style={StyleSheet.absoluteFill} pointerEvents="none">
    {/* Just a repeating tile-like effect using basic SVG shapes for positive energy */}
    <Svg width="100%" height="100%" opacity={0.07}>
      {/* Sun / Stars / Moon pattern repeated */}
      {[...Array(20)].map((_, i) => {
        const x = (i % 4) * 100 + 20;
        const y = Math.floor(i / 4) * 150 + 40;
        return (
          <React.Fragment key={i}>
            <Circle cx={x} cy={y} r={4} fill={Colors.gold} />
            <Circle cx={x + 50} cy={y + 70} r={12} stroke={Colors.cosmosPlum} strokeWidth={2} fill="none" />
            <Path d={`M ${x - 20} ${y + 50} Q ${x} ${y + 30} ${x + 20} ${y + 50}`} stroke={Colors.teal} strokeWidth={2} fill="none" />
          </React.Fragment>
        );
      })}
    </Svg>
  </View>
);

export function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { upcomingSessions, endSession } = useUser();
  
  const [seconds, setSeconds] = useState(0);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const expert = EXPERTS.find((e) => e.id === id);
  const activeSession = upcomingSessions.find((s) => s.expertId === id);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello! I am ${expert?.name || 'your astrologer'}. How can I guide you today?`,
      sender: 'expert',
      time: '10:00 AM',
    }
  ]);

  // Consultation Timer
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

  const handleEndChat = () => {
    Alert.alert(
      'End Consultation',
      'Are you sure you want to end this chat consultation?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'End Chat', 
          style: 'destructive',
          onPress: () => {
            if (activeSession) {
              endSession(activeSession.id);
            }
            router.replace('/sessions');
          }
        }
      ]
    );
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    
    // Mock astrologer typing effect
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: "I sense a strong energy shift. Let me pull a card for you.",
        sender: 'expert',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 2500);
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

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.msgWrapper, isUser ? styles.msgWrapperUser : styles.msgWrapperExpert]}>
        <View style={[styles.msgBubble, isUser ? styles.msgBubbleUser : styles.msgBubbleExpert]}>
          <Text style={[styles.msgText, isUser ? styles.msgTextUser : styles.msgTextExpert]}>
            {item.text}
          </Text>
          <Text style={[styles.msgTime, isUser ? styles.msgTimeUser : styles.msgTimeExpert]}>
            {item.time} {isUser && <Ionicons name="checkmark-done" size={14} color={Colors.tealLight} />}
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
              <Ionicons name="arrow-back" size={24} color={Colors.cosmosPlum} />
            </TouchableOpacity>
            <Image source={typeof expert.imageUri === 'string' ? { uri: expert.imageUri } : expert.imageUri} style={styles.headerAvatar} />
            <View style={styles.headerInfo}>
              <Text style={styles.headerName} numberOfLines={1}>{expert.name}</Text>
              <View style={styles.timerRow}>
                <View style={styles.liveDot} />
                <Text style={styles.headerTimer}>{formatTime(seconds)}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.endBtn} onPress={handleEndChat}>
            <Text style={styles.endBtnText}>End</Text>
          </TouchableOpacity>
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
              placeholder="Type your message..."
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCream,
  },
  errorText: {
    ...Typography.body,
    marginBottom: Spacing.md,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.backgroundCream,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
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
  headerInfo: {
    flex: 1,
  },
  headerName: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.cosmosPlum,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF3B30',
    marginRight: 6,
  },
  headerTimer: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  endBtn: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: Radius.pill,
  },
  endBtnText: {
    ...Typography.button,
    color: '#FF3B30',
    fontSize: 14,
  },
  keyboardAvoid: {
    flex: 1,
  },
  chatArea: {
    flex: 1,
    backgroundColor: '#FAF7F2', // Soft background
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
  msgWrapperUser: {
    justifyContent: 'flex-end',
  },
  msgWrapperExpert: {
    justifyContent: 'flex-start',
  },
  msgBubble: {
    maxWidth: '80%',
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: 16,
    ...Shadows.xs,
  },
  msgBubbleUser: {
    backgroundColor: Colors.teal,
    borderBottomRightRadius: 4,
  },
  msgBubbleExpert: {
    backgroundColor: Colors.backgroundWhite,
    borderBottomLeftRadius: 4,
  },
  msgText: {
    ...Typography.body,
    fontSize: 15,
    lineHeight: 22,
  },
  msgTextUser: {
    color: Colors.backgroundWhite,
  },
  msgTextExpert: {
    color: Colors.textPrimary,
  },
  msgTime: {
    fontSize: 11,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  msgTimeUser: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  msgTimeExpert: {
    color: Colors.textSecondary,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: Spacing.sm,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.backgroundWhite,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
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
