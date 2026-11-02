declare const process: { env: Record<string, string | undefined> };

import { PrismaClient } from '@prisma/client';
import { SEED_PROBLEMS, SEED_SYSTEM_DESIGN, SEED_FLASHCARDS, SeedProblem, SeedSystemDesign, SeedFlashcard } from './data';

export * from './data';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createSafePrisma(): PrismaClient {
  let instance: PrismaClient | null = null;
  return new Proxy({} as PrismaClient, {
    get(_target, prop) {
      if (!instance) {
        try {
          instance =
            globalForPrisma.prisma ||
            new PrismaClient({
              log: typeof process !== 'undefined' && process.env?.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
            });
          if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
            globalForPrisma.prisma = instance;
          }
        } catch (err) {
          console.warn('Prisma client not yet generated or available, using fallback store');
          return () => Promise.resolve(null);
        }
      }
      const val = (instance as any)[prop];
      return typeof val === 'function' ? val.bind(instance) : val;
    },
  });
}

export const prisma = createSafePrisma();

/**
 * Resilient In-Memory Data Store
 * Used when DATABASE_URL is not configured or in offline / demo environments
 */
class MemoryDataStore {
  problems: SeedProblem[] = [...SEED_PROBLEMS];
  systemDesigns: SeedSystemDesign[] = [...SEED_SYSTEM_DESIGN];
  flashcards: SeedFlashcard[] = [...SEED_FLASHCARDS];
  
  user = {
    id: 'usr-demo-1',
    email: 'alex.chen@devprep.hub',
    name: 'Alex Chen',
    role: 'PREMIUM',
    targetRole: 'Senior Full-Stack Engineer',
    streakCount: 14,
    readinessScore: 82,
    lastActiveDate: new Date(),
  };

  submissions: Array<{
    id: string;
    userId: string;
    problemId: string;
    language: string;
    code: string;
    status: string;
    runtimeMs: number;
    memoryKb: number;
    timeComplexity: string;
    spaceComplexity: string;
    aiCritique?: string;
    passedTestCases: number;
    totalTestCases: number;
    createdAt: Date;
  }> = [
    {
      id: 'sub-1',
      userId: 'usr-demo-1',
      problemId: 'prob-1',
      language: 'python',
      code: 'def twoSum(nums, target): seen = {}; for i, n in enumerate(nums): ...',
      status: 'ACCEPTED',
      runtimeMs: 48,
      memoryKb: 15400,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      aiCritique: 'Optimal one-pass hash map solution with minimal overhead.',
      passedTestCases: 3,
      totalTestCases: 3,
      createdAt: new Date(Date.now() - 3600 * 1000 * 24),
    },
  ];

  srsCards: Map<string, { easeFactor: number; interval: number; repetition: number; nextReviewDate: Date }> = new Map();

  roadmapProgress: Map<string, string[]> = new Map([
    ['blind-75', ['two-sum', 'valid-anagram', 'valid-parentheses']],
    ['neetcode-150', ['two-sum', 'valid-anagram']],
  ]);

  behavioralStories: Array<{
    id: string;
    userId: string;
    title: string;
    companyPillar: string;
    situation: string;
    task: string;
    action: string;
    result: string;
    aiScore: number;
    aiFeedback: string;
    createdAt: Date;
  }> = [
    {
      id: 'story-1',
      userId: 'usr-demo-1',
      title: 'Payment Gateway Migration under High Load',
      companyPillar: 'Bias for Action / Ownership',
      situation: 'Legacy payment processing service caused intermittent 504 timeouts during Black Friday traffic spikes.',
      task: 'Led zero-downtime cutover to distributed idempotent checkout microservice within a 6-week window.',
      action: 'Implemented dark launching with shadow traffic, circuit breakers with Redis token buckets, and automated canary rollback scripts.',
      result: 'Reduced p99 latency from 1.2s to 140ms and prevented an estimated $450k in abandoned carts.',
      aiScore: 92,
      aiFeedback: 'Strong quantifiable outcomes and clear articulation of personal technical decisions.',
      createdAt: new Date(),
    },
  ];

  mockInterviews: Array<any> = [];

  constructor() {
    // Initialize default SRS intervals
    this.flashcards.forEach((fc, idx) => {
      this.srsCards.set(fc.id, {
        easeFactor: 2.5,
        interval: idx % 2 === 0 ? 0 : 3,
        repetition: idx % 2 === 0 ? 0 : 2,
        nextReviewDate: idx % 2 === 0 ? new Date() : new Date(Date.now() + 86400000 * 3),
      });
    });
  }
}

export const memoryDb = new MemoryDataStore();
