// app/_layout.jsx
import React from 'react';
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from './(tabs)/Cartcontext';
import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });

  React.useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);
  if (!loaded) return null;

  return (
    <CartProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
       
          
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" />
          <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </CartProvider>
  );
}
