import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const ROADMAP_PREVIEWS = [
  {
    title: 'Blind 75 Essential DSA',
    progress: '3 / 10 Completed',
    percent: 30,
    topics: ['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Stack', 'Trees'],
  },
  {
    title: 'NeetCode 150 Deep Mastery',
    progress: '2 / 10 Completed',
    percent: 20,
    topics: ['Linear Patterns', 'Graph Traversals', 'Dynamic Programming'],
  },
  {
    title: 'Frontend System & UI DSA',
    progress: '2 / 5 Completed',
    percent: 40,
    topics: ['DOM Tree Virtualization', 'Async Debouncing', 'State Parsers'],
  },
];

export default function MobileRoadmapsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>🗺️ Structured Roadmaps</Text>
      <Text style={styles.headerSubtitle}>
        Track your topic prerequisites and preparation velocity on the go.
      </Text>

      <View style={styles.list}>
        {ROADMAP_PREVIEWS.map((rm) => (
          <View key={rm.title} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.title}>{rm.title}</Text>
              <Text style={styles.percentText}>{rm.percent}%</Text>
            </View>

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${rm.percent}%` }]} />
            </View>

            <Text style={styles.progressLabel}>{rm.progress}</Text>

            <View style={styles.tagsRow}>
              {rm.topics.map((t) => (
                <View key={t} style={styles.topicTag}>
                  <Text style={styles.tagText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 14,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  percentText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6366f1',
    marginLeft: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#1f2937',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4f46e5',
  },
  progressLabel: {
    fontSize: 11,
    color: '#9ca3af',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },
  topicTag: {
    backgroundColor: '#090d16',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontSize: 10,
    color: '#818cf8',
  },
});

