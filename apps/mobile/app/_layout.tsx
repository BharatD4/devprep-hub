import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#090d16' },
          headerTintColor: '#ffffff',
          contentStyle: { backgroundColor: '#090d16' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="arena/[slug]" options={{ title: 'Problem Reader' }} />
      </Stack>
    </>
  );
}

