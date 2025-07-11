import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import CartScreen from '@/screens/Cartscreen';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            
          },
          default: {},
        }),
      }}>
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
          }}
        />
      <Tabs.Screen
  name="index"
  options={{
    title: 'Home',
    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
  }}
/>
<Tabs.Screen
  name="explore"
  options={{
    title: 'Cart',
    tabBarIcon: ({ color }) => <AntDesign name="shoppingcart" size={24} color={color} />,
  }}
/>

    </Tabs>
  );
}
