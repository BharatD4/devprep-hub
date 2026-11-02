import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SEED_PROBLEMS, SeedProblem } from '@devprep/db';
import { ParsonsDrill } from '../../components/ParsonsDrill';
import { tokens } from '@devprep/ui';

export default function MobileProblemDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const problem: SeedProblem = SEED_PROBLEMS.find((p: SeedProblem) => p.slug === slug) || SEED_PROBLEMS[0];

  const [activeTab, setActiveTab] = useState<'reader' | 'parsons' | 'editorial'>('reader');
  const diffColor = tokens.colors.difficulty[problem.difficulty] || tokens.colors.difficulty.MEDIUM;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Problem Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{problem.title}</Text>
          <View style={[styles.diffBadge, { backgroundColor: diffColor.bg, borderColor: diffColor.border }]}>
            <Text style={[styles.diffText, { color: diffColor.text }]}>{problem.difficulty}</Text>
          </View>
        </View>

        <Text style={styles.category}>{problem.category}</Text>

        <View style={styles.companyRow}>
          {problem.companyTags.map((t: string) => (
            <View key={t} style={styles.companyTag}>
              <Text style={styles.companyText}>🏢 {t}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setActiveTab('reader')}
          style={[styles.tabBtn, activeTab === 'reader' && styles.tabBtnActive]}
        >
          <Text style={[styles.tabBtnText, activeTab === 'reader' && styles.tabBtnTextActive]}>
            Description
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('parsons')}
          style={[styles.tabBtn, activeTab === 'parsons' && styles.tabBtnActive]}
        >
          <Text style={[styles.tabBtnText, activeTab === 'parsons' && styles.tabBtnTextActive]}>
            Parsons Drill
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('editorial')}
          style={[styles.tabBtn, activeTab === 'editorial' && styles.tabBtnActive]}
        >
          <Text style={[styles.tabBtnText, activeTab === 'editorial' && styles.tabBtnTextActive]}>
            Editorial
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'reader' && (
        <View style={styles.section}>
          <Text style={styles.descText}>{problem.descriptionMdx}</Text>

          {/* Constraints */}
          <View style={styles.cardBox}>
            <Text style={styles.subHeader}>CONSTRAINTS</Text>
            {problem.constraints.map((c: string, i: number) => (
              <Text key={i} style={styles.constraintItem}>
                • {c}
              </Text>
            ))}
          </View>

          {/* Solution Preview */}
          <View style={styles.cardBox}>
            <Text style={styles.subHeader}>OPTIMAL PYTHON 3 CODE</Text>
            <Text style={styles.codeSnippet}>
              {problem.starterCodeJson?.python || '# Code solution'}
            </Text>
          </View>
        </View>
      )}

      {activeTab === 'parsons' && <ParsonsDrill />}

      {activeTab === 'editorial' && (
        <View style={styles.section}>
          <View style={styles.cardBox}>
            <Text style={styles.subHeader}>ALGORITHMIC CRITIQUE & DERIVATION</Text>
            <Text style={styles.descText}>{problem.editorialMdx}</Text>
          </View>
        </View>
      )}
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
  header: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  diffBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    marginLeft: 8,
  },
  diffText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 12,
    color: '#818cf8',
    marginTop: 4,
  },
  companyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  companyTag: {
    backgroundColor: '#090d16',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  companyText: {
    fontSize: 10,
    color: '#9ca3af',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
    padding: 4,
    marginBottom: 14,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#4f46e5',
  },
  tabBtnText: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '600',
  },
  tabBtnTextActive: {
    color: '#ffffff',
  },
  section: {
    gap: 12,
  },
  descText: {
    fontSize: 13,
    color: '#e5e7eb',
    lineHeight: 20,
  },
  cardBox: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 12,
    padding: 14,
    marginTop: 6,
  },
  subHeader: {
    fontSize: 10,
    color: '#818cf8',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  constraintItem: {
    fontSize: 11,
    color: '#9ca3af',
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  codeSnippet: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#a5b4fc',
    lineHeight: 18,
  },
});
