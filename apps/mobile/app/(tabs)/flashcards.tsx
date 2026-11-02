import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SEED_FLASHCARDS, SeedFlashcard } from '@devprep/db';
import { calculateSM2 } from '@devprep/ui';

export default function MobileFlashcardsScreen() {
  const [cards] = useState<SeedFlashcard[]>(SEED_FLASHCARDS);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const activeCard = cards[index % cards.length];

  const handleNext = (quality: number) => {
    // SM-2 calculation demonstration
    calculateSM2(quality, 1, 1, 2.5);
    setFlipped(false);
    setIndex((prev) => prev + 1);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>🧠 SM-2 Spaced Repetition</Text>
      <Text style={styles.headerSubtitle}>
        Card {index + 1} of {cards.length} • Offline Cached
      </Text>

      {/* Card Body */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setFlipped(!flipped)}
        style={styles.card}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.deckBadge}>{activeCard.deckCategory}</Text>
          <Text style={styles.tapHint}>Tap to flip</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.phaseLabel}>{flipped ? 'ANSWER' : 'QUESTION'}</Text>
          <Text style={styles.cardContent}>
            {flipped ? activeCard.back : activeCard.front}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.tagText}>#{activeCard.tags.join(' #')}</Text>
        </View>
      </TouchableOpacity>

      {/* Confidence Buttons */}
      <View style={styles.buttonContainer}>
        <Text style={styles.ratingPrompt}>Rate Recall Quality (SM-2):</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => handleNext(1)} style={[styles.rateBtn, styles.btnAgain]}>
            <Text style={styles.btnText}>Again</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNext(3)} style={[styles.rateBtn, styles.btnHard]}>
            <Text style={styles.btnText}>Hard</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNext(4)} style={[styles.rateBtn, styles.btnGood]}>
            <Text style={styles.btnText}>Good</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNext(5)} style={[styles.rateBtn, styles.btnEasy]}>
            <Text style={styles.btnText}>Easy</Text>
          </TouchableOpacity>
        </View>
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
  card: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 20,
    padding: 20,
    minHeight: 280,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deckBadge: {
    color: '#818cf8',
    backgroundColor: '#1e1b4b',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    fontSize: 11,
    fontWeight: 'bold',
  },
  tapHint: {
    color: '#6b7280',
    fontSize: 11,
  },
  cardBody: {
    marginVertical: 20,
  },
  phaseLabel: {
    fontSize: 10,
    color: '#6366f1',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 15,
    color: '#f3f4f6',
    lineHeight: 22,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
    paddingTop: 10,
  },
  tagText: {
    color: '#9ca3af',
    fontSize: 11,
  },
  buttonContainer: {
    marginTop: 20,
  },
  ratingPrompt: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  rateBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnAgain: { backgroundColor: '#7f1d1d' },
  btnHard: { backgroundColor: '#78350f' },
  btnGood: { backgroundColor: '#312e81' },
  btnEasy: { backgroundColor: '#064e3b' },
  btnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
