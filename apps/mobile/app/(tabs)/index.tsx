import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { ParsonsDrill } from '../../components/ParsonsDrill';
import { tokens } from '@devprep/ui';

export default function MobileDashboard() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Welcome */}
      <View style={styles.heroCard}>
        <Text style={styles.badgeText}>TARGET: SENIOR FULL-STACK</Text>
        <Text style={styles.heroTitle}>DevPrep Mobile Hub</Text>
        <Text style={styles.heroSubtitle}>
          Commute-ready offline drills, Parsons code ordering, and daily spaced repetition review.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>🔥 14</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>✨ 84%</Text>
            <Text style={styles.statLabel}>Readiness</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>🧠 4</Text>
            <Text style={styles.statLabel}>Due Today</Text>
          </View>
        </View>
      </View>

      {/* Interactive Parsons Problem Drill */}
      <ParsonsDrill />

      {/* Quick Access Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Commute Study Actions</Text>
        
        <Link href="/(tabs)/flashcards" asChild>
          <TouchableOpacity style={styles.actionCard}>
            <View>
              <Text style={styles.actionCardTitle}>🎴 Review SRS Flashcards</Text>
              <Text style={styles.actionCardDesc}>Review 4 cards due today via SuperMemo SM-2.</Text>
            </View>
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/problems" asChild>
          <TouchableOpacity style={styles.actionCard}>
            <View>
              <Text style={styles.actionCardTitle}>📖 Offline Problem Reader</Text>
              <Text style={styles.actionCardDesc}>10 curated Blind 75 problems cached locally.</Text>
            </View>
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/roadmaps" asChild>
          <TouchableOpacity style={styles.actionCard}>
            <View>
              <Text style={styles.actionCardTitle}>🗺️ Blind 75 Roadmap</Text>
              <Text style={styles.actionCardDesc}>Check completion status across topics.</Text>
            </View>
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </Link>
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
  heroCard: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 8,
  },
  badgeText: {
    color: '#818cf8',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#090d16',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  statVal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 2,
  },
  section: {
    marginTop: 12,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 12,
    padding: 14,
  },
  actionCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f3f4f6',
  },
  actionCardDesc: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  arrowText: {
    fontSize: 18,
    color: '#6366f1',
    fontWeight: 'bold',
  },
});

