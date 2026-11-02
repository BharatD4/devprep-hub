import { tokens, DifficultyLevel, SubmissionStatusCode } from './tokens';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  iconName?: string;
}

export interface CodeBlockItem {
  id: string;
  text: string;
  order: number;
}

/**
 * SuperMemo SM-2 Spaced Repetition calculation
 * @param quality: 0 (blackout) to 5 (perfect recall)
 * @param repetitions: consecutive successful reviews
 * @param previousInterval: previous interval in days
 * @param previousEaseFactor: ease factor (starts at 2.5)
 */
export function calculateSM2(
  quality: number,
  repetitions: number,
  previousInterval: number,
  previousEaseFactor: number
): { interval: number; repetitions: number; easeFactor: number } {
  const q = Math.max(0, Math.min(5, quality));
  let easeFactor =
    previousEaseFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  let interval = 1;
  let nextRepetitions = repetitions;

  if (q < 3) {
    // Incorrect response, reset streak
    nextRepetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(previousInterval * easeFactor);
    }
    nextRepetitions = repetitions + 1;
  }

  return { interval, repetitions: nextRepetitions, easeFactor };
}

export function formatRuntime(ms?: number | null): string {
  if (ms == null) return '-- ms';
  return `${ms} ms`;
}

export function formatMemory(kb?: number | null): string {
  if (kb == null) return '-- MB';
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function getDifficultyColor(diff: DifficultyLevel) {
  return tokens.colors.difficulty[diff] || tokens.colors.difficulty.MEDIUM;
}

