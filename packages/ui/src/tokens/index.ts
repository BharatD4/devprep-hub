export const tokens = {
  colors: {
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      900: '#312e81',
    },
    difficulty: {
      EASY: {
        bg: '#dcfce7',
        text: '#15803d',
        border: '#86efac',
        hex: '#22c55e',
      },
      MEDIUM: {
        bg: '#fef3c7',
        text: '#b45309',
        border: '#fde68a',
        hex: '#f59e0b',
      },
      HARD: {
        bg: '#fee2e2',
        text: '#b91c1c',
        border: '#fca5a5',
        hex: '#ef4444',
      },
    },
    category: {
      'Arrays & Hashing': '#6366f1',
      'Two Pointers': '#06b6d4',
      'Sliding Window': '#0ea5e9',
      'Stack': '#8b5cf6',
      'Binary Search': '#ec4899',
      'Linked List': '#10b981',
      'Trees': '#14b8a6',
      'Tries': '#f97316',
      'Heap / Priority Queue': '#f59e0b',
      'Backtracking': '#a855f7',
      'Graphs': '#3b82f6',
      'Advanced Graphs': '#2563eb',
      'Dynamic Programming': '#ef4444',
      '1-D Dynamic Programming': '#f43f5e',
      '2-D Dynamic Programming': '#e11d48',
      'Bit Manipulation': '#64748b',
      'Math & Geometry': '#84cc16',
      'System Design': '#0284c7',
      'CS Fundamentals': '#7c3aed',
    },
    status: {
      ACCEPTED: { label: 'Accepted', color: '#22c55e' },
      WRONG_ANSWER: { label: 'Wrong Answer', color: '#ef4444' },
      TIME_LIMIT_EXCEEDED: { label: 'Time Limit Exceeded', color: '#f59e0b' },
      MEMORY_LIMIT_EXCEEDED: { label: 'Memory Limit Exceeded', color: '#f97316' },
      RUNTIME_ERROR: { label: 'Runtime Error', color: '#dc2626' },
      COMPILATION_ERROR: { label: 'Compilation Error', color: '#9333ea' },
    },
  },
  typography: {
    fontMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  readinessThresholds: {
    beginner: 30,
    intermediate: 60,
    jobReady: 80,
    faangReady: 92,
  },
} as const;

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';
export type SubmissionStatusCode = keyof typeof tokens.colors.status;

