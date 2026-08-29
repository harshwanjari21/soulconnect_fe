/**
 * Root Layout — ConsultLive app shell
 *
 * Uses expo-router Stack navigator with no header chrome.
 * BottomNavigation is overlaid as a fixed bottom element.
 * The Stack manages screen transitions while nav stays persistent.
 */
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { Colors } from '@/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide splash after layout mounts
    SplashScreen.hideAsync();
  }, []);

  return (
    <View style={styles.root}>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
});
