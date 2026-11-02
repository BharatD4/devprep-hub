import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';

export interface RoadmapTrack {
  id: string;
  title: string;
  description: string;
  totalProblems: number;
  categories: Array<{
    name: string;
    description: string;
    slugs: string[];
  }>;
}

const ROADMAPS: Record<string, RoadmapTrack> = {
  'blind-75': {
    id: 'blind-75',
    title: 'Blind 75',
    description: 'The definitive 75 essential LeetCode questions covering all fundamental algorithmic patterns.',
    totalProblems: 10,
    categories: [
      {
        name: 'Arrays & Hashing',
        description: 'Core linear structures and hash-based frequency counters',
        slugs: ['two-sum', 'valid-anagram'],
      },
      {
        name: 'Two Pointers & Sliding Window',
        description: 'Techniques for contiguous subarrays and sorted sequences',
        slugs: ['best-time-to-buy-and-sell-stock', '3sum', 'longest-substring-without-repeating-characters'],
      },
      {
        name: 'Stack & Linked List',
        description: 'LIFO collections and pointer manipulation',
        slugs: ['valid-parentheses', 'reverse-linked-list'],
      },
      {
        name: 'Trees & Heaps',
        description: 'Hierarchical traversals and priority queues',
        slugs: ['lowest-common-ancestor-of-a-bst', 'merge-k-sorted-lists'],
      },
      {
        name: 'Dynamic Programming',
        description: 'Optimal substructure and overlapping subproblems',
        slugs: ['maximum-subarray'],
      },
    ],
  },
  'neetcode-150': {
    id: 'neetcode-150',
    title: 'NeetCode 150',
    description: 'Expanded comprehensive roadmap categorized by deep topic mastery.',
    totalProblems: 10,
    categories: [
      {
        name: 'Core Fundamentals',
        description: 'Prerequisites for algorithmic mastery',
        slugs: ['two-sum', 'valid-anagram', 'valid-parentheses'],
      },
      {
        name: 'Linear & Subarray Patterns',
        description: 'Fast two-pointer scans and sliding windows',
        slugs: ['best-time-to-buy-and-sell-stock', '3sum', 'longest-substring-without-repeating-characters'],
      },
      {
        name: 'Non-Linear & Complex Patterns',
        description: 'Trees, Linked Lists, Heaps, and DP',
        slugs: ['reverse-linked-list', 'lowest-common-ancestor-of-a-bst', 'merge-k-sorted-lists', 'maximum-subarray'],
      },
    ],
  },
  'frontend-track': {
    id: 'frontend-track',
    title: 'Frontend Interview Path',
    description: 'DOM manipulation, React performance, async event loops, and UI data structures.',
    totalProblems: 5,
    categories: [
      {
        name: 'Data Structures for UI',
        description: 'Strings, hashes, and parsing nested components',
        slugs: ['valid-parentheses', 'two-sum', 'valid-anagram'],
      },
      {
        name: 'Async & Performance',
        description: 'Debouncing, memoization, and list virtualization',
        slugs: ['longest-substring-without-repeating-characters', 'best-time-to-buy-and-sell-stock'],
      },
    ],
  },
  'backend-track': {
    id: 'backend-track',
    title: 'Backend & Systems Path',
    description: 'High-throughput algorithms, caching, concurrency, and distributed transactions.',
    totalProblems: 6,
    categories: [
      {
        name: 'Algorithms & Optimizations',
        description: 'Subarray partitioning, sorting, and priority processing',
        slugs: ['merge-k-sorted-lists', 'maximum-subarray', '3sum'],
      },
      {
        name: 'System Primitives',
        description: 'Rate limiters, connection pools, and LRU caches',
        slugs: ['two-sum', 'valid-parentheses', 'reverse-linked-list'],
      },
    ],
  },
};

export const roadmapRouter = router({
  getRoadmaps: publicProcedure.query(() => {
    return Object.values(ROADMAPS);
  }),

  byKey: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(({ input }) => {
      const roadmap = ROADMAPS[input.key];
      if (!roadmap) throw new Error(`Roadmap ${input.key} not found`);
      return roadmap;
    }),

  getUserProgress: protectedProcedure.query(({ ctx }) => {
    const progressObj: Record<string, string[]> = {};
    ctx.db.roadmapProgress.forEach((slugs, key) => {
      progressObj[key] = slugs;
    });
    return progressObj;
  }),

  toggleProblem: protectedProcedure
    .input(
      z.object({
        roadmapKey: z.string(),
        problemSlug: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const current = ctx.db.roadmapProgress.get(input.roadmapKey) || [];
      const index = current.indexOf(input.problemSlug);
      let updated: string[];

      if (index > -1) {
        updated = current.filter((s) => s !== input.problemSlug);
      } else {
        updated = [...current, input.problemSlug];
      }

      ctx.db.roadmapProgress.set(input.roadmapKey, updated);
      return { success: true, completed: updated.includes(input.problemSlug), totalCompleted: updated.length };
    }),
});

