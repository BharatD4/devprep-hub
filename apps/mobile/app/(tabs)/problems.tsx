import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { SEED_PROBLEMS, SeedProblem } from '@devprep/db';
import { tokens } from '@devprep/ui';

export default function MobileProblemsScreen() {
  const [search, setSearch] = useState('');

  const filtered = SEED_PROBLEMS.filter(
    (p: SeedProblem) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>Offline Problem Vault</Text>
      <Text style={styles.headerSubtitle}>
        10 essential patterns cached locally for reading without network access.
      </Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Filter by title or topic..."
        placeholderTextColor="#6b7280"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.list}>
        {filtered.map((prob: SeedProblem) => {
          const diffColor = tokens.colors.difficulty[prob.difficulty] || tokens.colors.difficulty.MEDIUM;
          return (
            <Link key={prob.id} href={`/arena/${prob.slug}`} asChild>
              <TouchableOpacity style={styles.problemCard}>
                <View style={styles.rowTop}>
                  <Text style={styles.probTitle}>{prob.title}</Text>
                  <View style={[styles.diffBadge, { backgroundColor: diffColor.bg, borderColor: diffColor.border }]}>
                    <Text style={[styles.diffText, { color: diffColor.text }]}>{prob.difficulty}</Text>
                  </View>
                </View>

                <View style={styles.rowBottom}>
                  <Text style={styles.probCategory}>{prob.category}</Text>
                  <Text style={styles.companyTags}>{prob.companyTags.slice(0, 2).join(' • ')}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          );
        })}
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
    marginBottom: 12,
  },
  searchBar: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 12,
    padding: 12,
    color: '#ffffff',
    fontSize: 13,
    marginBottom: 14,
  },
  list: {
    gap: 10,
  },
  problemCard: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 12,
    padding: 14,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  probTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f3f4f6',
    flex: 1,
  },
  diffBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    marginLeft: 8,
  },
  diffText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  rowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  probCategory: {
    fontSize: 11,
    color: '#818cf8',
  },
  companyTags: {
    fontSize: 11,
    color: '#6b7280',
  },
});
