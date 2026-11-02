import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CodeSnippetLine {
  id: string;
  code: string;
  correctIndex: number;
}

const DEFAULT_BLOCKS: CodeSnippetLine[] = [
  { id: '1', code: 'def twoSum(nums, target):', correctIndex: 0 },
  { id: '2', code: '    seen = {}', correctIndex: 1 },
  { id: '3', code: '    for i, n in enumerate(nums):', correctIndex: 2 },
  { id: '4', code: '        diff = target - n', correctIndex: 3 },
  { id: '5', code: '        if diff in seen:', correctIndex: 4 },
  { id: '6', code: '            return [seen[diff], i]', correctIndex: 5 },
  { id: '7', code: '        seen[n] = i', correctIndex: 6 },
  { id: '8', code: '    return []', correctIndex: 7 },
];

export function ParsonsDrill() {
  // Scrambled blocks
  const [blocks, setBlocks] = useState<CodeSnippetLine[]>([
    DEFAULT_BLOCKS[3],
    DEFAULT_BLOCKS[1],
    DEFAULT_BLOCKS[0],
    DEFAULT_BLOCKS[4],
    DEFAULT_BLOCKS[6],
    DEFAULT_BLOCKS[2],
    DEFAULT_BLOCKS[7],
    DEFAULT_BLOCKS[5],
  ]);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (index: number) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else {
      // Swap blocks
      const copy = [...blocks];
      const temp = copy[selectedIndex];
      copy[selectedIndex] = copy[index];
      copy[index] = temp;
      setBlocks(copy);
      setSelectedIndex(null);
      setIsCorrect(null);
    }
  };

  const verifyOrder = () => {
    const verified = blocks.every((b, idx) => b.correctIndex === idx);
    setIsCorrect(verified);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧩 Parsons Commute Drill</Text>
      <Text style={styles.subtitle}>
        Tap two lines to swap their positions until the algorithm is ordered correctly.
      </Text>

      <View style={styles.blockList}>
        {blocks.map((block, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <TouchableOpacity
              key={block.id}
              onPress={() => handleSelect(idx)}
              style={[styles.block, isSelected && styles.blockSelected]}
            >
              <Text style={styles.lineNum}>{idx + 1}</Text>
              <Text style={styles.codeText}>{block.code}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity onPress={verifyOrder} style={styles.button}>
        <Text style={styles.buttonText}>Verify Solution</Text>
      </TouchableOpacity>

      {isCorrect !== null && (
        <View style={[styles.resultBanner, isCorrect ? styles.bannerSuccess : styles.bannerError]}>
          <Text style={styles.resultText}>
            {isCorrect
              ? '🎉 Accepted! Perfect algorithmic ordering.'
              : '❌ Incorrect order. Review your control flow and try again.'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#111827',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f3f4f6',
  },
  subtitle: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
    marginBottom: 12,
  },
  blockList: {
    gap: 6,
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#090d16',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 8,
    padding: 10,
  },
  blockSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#1e1b4b',
  },
  lineNum: {
    width: 24,
    fontSize: 11,
    color: '#6366f1',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  codeText: {
    color: '#e0e7ff',
    fontFamily: 'monospace',
    fontSize: 12,
    flex: 1,
  },
  button: {
    backgroundColor: '#4f46e5',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 14,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  resultBanner: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
  },
  bannerSuccess: {
    backgroundColor: '#064e3b',
  },
  bannerError: {
    backgroundColor: '#7f1d1d',
  },
  resultText: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
});

