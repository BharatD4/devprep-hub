import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { InterviewMessageSchema, BehavioralStorySchema } from '../schemas';

const STAFF_INTERVIEWER_PROMPTS: Record<string, string> = {
  DSA_TECHNICAL: `You are a Senior Staff Software Engineer at Google conducting a 45-minute coding interview.
Evaluate the candidate on:
1. Clarifying questions & edge cases (empty inputs, constraints, duplicates).
2. Clean algorithmic communication before writing code.
3. Accurate Big-O analysis.
Provide progressive subtle hints only when explicitly asked. Maintain a professional, supportive, but rigorous tone.`,
  SYSTEM_DESIGN_HLD: `You are a Principal Systems Architect conducting a High-Level Design interview.
Probe for scale estimations, API design, data storage trade-offs, cache invalidation, and failure isolation.`,
  SYSTEM_DESIGN_LLD: `You are a Lead Software Engineer evaluating Low-Level Design and Object-Oriented principles.
Look for SOLID compliance, design patterns, interface clarity, and thread safety.`,
  BEHAVIORAL_STAR: `You are an Engineering Director conducting a behavioral interview focused on Leadership Principles (Ownership, Disagree & Commit, Customer Obsession, Delivering Results).
Evaluate using the STAR framework (Situation, Task, Action, Result) and push for quantifiable business impact metrics.`,
};

export const aiInterviewRouter = router({
  startSession: protectedProcedure
    .input(
      z.object({
        type: z.enum(['DSA_TECHNICAL', 'SYSTEM_DESIGN_HLD', 'SYSTEM_DESIGN_LLD', 'BEHAVIORAL_STAR']),
        roleTarget: z.string().default('Senior Software Engineer'),
      })
    )
    .mutation(({ ctx, input }) => {
      const sessionId = `mock-session-${Date.now()}`;
      
      const welcomeMessages: Record<string, string> = {
        DSA_TECHNICAL: `Welcome! I'm your interviewer today. We'll be working through an algorithmic problem. Before jumping straight into code, I'd love to hear your thoughts on clarifying questions, input boundaries, and your high-level approach. Are you ready to begin?`,
        SYSTEM_DESIGN_HLD: `Hello! Today we will design a large-scale distributed system. Feel free to ask about our expected traffic scale, storage retention, latency SLAs, and core user-facing features. What would you like to clarify first?`,
        SYSTEM_DESIGN_LLD: `Hi there! We are going to design an object-oriented system with clean modularity and extensible patterns. Let's start with identifying the core domain entities and their responsibilities.`,
        BEHAVIORAL_STAR: `Welcome! In this behavioral session, I want to learn about your leadership and past engineering experiences. Could you tell me about a time when you faced a severe production incident or had a technical disagreement with senior stakeholders?`,
      };

      const session = {
        id: sessionId,
        userId: ctx.user.id,
        type: input.type,
        roleTarget: input.roleTarget,
        createdAt: new Date(),
        messages: [
          {
            role: 'assistant',
            content: welcomeMessages[input.type] || welcomeMessages.DSA_TECHNICAL,
          },
        ],
      };

      ctx.db.mockInterviews.push(session);
      return session;
    }),

  sendMessage: protectedProcedure
    .input(InterviewMessageSchema)
    .mutation(async ({ ctx, input }) => {
      const userMessage = input.messages[input.messages.length - 1]?.content || '';
      const isHintRequested = input.requestHint || userMessage.toLowerCase().includes('hint') || userMessage.toLowerCase().includes('stuck');

      // AI Response Generation Logic (Staff Engineer Persona)
      let reply = '';
      if (isHintRequested) {
        reply = `💡 **Interviewer Hint (Level 1)**: Consider the relationship between time complexity and lookups. Can you trade a small amount of extra memory (like a hash map) to eliminate the nested scanning loop from O(N²) down to O(N)?`;
      } else if (userMessage.length < 25) {
        reply = `Good initial thought. Could you elaborate further? For instance, what happens if the input array contains negative values, or what if all numbers are identical? How would your solution handle that?`;
      } else if (userMessage.toLowerCase().includes('hash') || userMessage.toLowerCase().includes('map') || userMessage.toLowerCase().includes('pointer')) {
        reply = `Spot on. An auxiliary hash structure or pointer approach is promising. What would be the exact Space and Time complexity of this approach? When you're ready, let's write out the function signature or pseudocode.`;
      } else {
        reply = `I like your line of reasoning. Before we finalize the approach: what are the primary trade-offs you see here, and are there any edge cases (like null inputs or single-element inputs) we should guard against?`;
      }

      return {
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
      };
    }),

  evaluateStory: protectedProcedure
    .input(BehavioralStorySchema)
    .mutation(({ ctx, input }) => {
      // Analyze STAR components for quantifiable metrics
      const hasNumbers = /\d+/.test(input.result) || /\d+%/.test(input.result) || /\$\d+/.test(input.result);
      const isActionDetailed = input.action.length > 50;

      let score = 75;
      const feedbackNotes: string[] = [];

      if (hasNumbers) {
        score += 15;
        feedbackNotes.push('Excellent inclusion of measurable business and performance metrics in the Result.');
      } else {
        score -= 10;
        feedbackNotes.push('Metric Gap: Enhance your Result section with concrete numbers (e.g., "reduced latency by 35%", "scaled to 5M DAU").');
      }

      if (isActionDetailed) {
        score += 10;
        feedbackNotes.push('Clear articulation of your personal ownership and leadership actions ("I designed", "I implemented").');
      }

      const evaluated = {
        id: `story-${Date.now()}`,
        userId: ctx.user.id,
        ...input,
        aiScore: Math.min(100, score),
        aiFeedback: feedbackNotes.join(' '),
        createdAt: new Date(),
      };

      ctx.db.behavioralStories.unshift(evaluated);
      return evaluated;
    }),

  getStories: protectedProcedure.query(({ ctx }) => {
    return ctx.db.behavioralStories;
  }),
});

