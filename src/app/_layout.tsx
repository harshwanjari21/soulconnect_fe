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
import { ProctorNavigation } from '@/components/navigation/ProctorNavigation';
import { Colors } from '@/theme';
import { usePathname } from 'expo-router';

SplashScreen.preventAutoHideAsync();

function DynamicBottomNavigation() {
  const pathname = usePathname();
  if (pathname.startsWith('/proctor')) {
    return <ProctorNavigation />;
  }

  // Only show the user bottom nav on the 4 root tab pages
  const MAIN_TABS = ['/', '/sessions', '/experts', '/profile'];
  if (MAIN_TABS.includes(pathname)) {
    return <BottomNavigation />;
  }

  // Hide on sub-pages like /wallet, /edit-profile, /expert/[id], /consultation/[id]
  return null;
}

import { UserProvider } from '@/data/user/UserContext';

export default function RootLayout() {
  useEffect(() => {
    // Hide splash after layout mounts
    SplashScreen.hideAsync();
  }, []);

  return (
    <UserProvider>
      <View style={styles.root}>
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
        <DynamicBottomNavigation />
      </View>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
});
