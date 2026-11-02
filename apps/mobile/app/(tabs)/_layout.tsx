import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#090d16' },
        headerTintColor: '#ffffff',
        tabBarStyle: {
          backgroundColor: '#0d121f',
          borderTopColor: '#1f2937',
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="problems"
        options={{
          title: 'Problems',
          tabBarLabel: 'Problems',
        }}
      />
      <Tabs.Screen
        name="flashcards"
        options={{
          title: 'SRS Cards',
          tabBarLabel: 'Flashcards',
        }}
      />
      <Tabs.Screen
        name="roadmaps"
        options={{
          title: 'Roadmaps',
          tabBarLabel: 'Roadmaps',
        }}
      />
    </Tabs>
  );
}

