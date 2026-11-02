import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { ReviewCardSchema } from '../schemas';
import { calculateSM2 } from '@devprep/ui';

export const srsRouter = router({
  listTheory: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        search: z.string().optional(),
      }).optional()
    )
    .query(({ ctx, input }) => {
      let cards = ctx.db.flashcards;
      if (input?.category && input.category !== 'ALL') {
        cards = cards.filter((c) => c.deckCategory.toLowerCase().includes(input.category!.toLowerCase()));
      }
      if (input?.search) {
        const q = input.search.toLowerCase();
        cards = cards.filter(
          (c) =>
            c.front.toLowerCase().includes(q) ||
            c.back.toLowerCase().includes(q) ||
            c.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return cards;
    }),

  getDueQueue: protectedProcedure.query(({ ctx }) => {
    const now = new Date();
    const flashcards = ctx.db.flashcards;

    const queue = flashcards.map((card) => {
      const state = ctx.db.srsCards.get(card.id) || {
        easeFactor: 2.5,
        interval: 0,
        repetition: 0,
        nextReviewDate: new Date(),
      };

      const isDue = new Date(state.nextReviewDate) <= now;

      return {
        ...card,
        isDue,
        interval: state.interval,
        repetition: state.repetition,
        easeFactor: state.easeFactor,
        nextReviewDate: state.nextReviewDate,
      };
    });

    const dueCards = queue.filter((c) => c.isDue);

    return {
      totalCards: flashcards.length,
      dueCount: dueCards.length,
      dueCards,
      allCards: queue,
    };
  }),

  reviewCard: protectedProcedure
    .input(ReviewCardSchema)
    .mutation(({ ctx, input }) => {
      const card = ctx.db.flashcards.find((c) => c.id === input.cardId);
      if (!card) throw new Error(`Card not found: ${input.cardId}`);

      const state = ctx.db.srsCards.get(input.cardId) || {
        easeFactor: 2.5,
        interval: 0,
        repetition: 0,
        nextReviewDate: new Date(),
      };

      const qualityMap: Record<string, number> = {
        AGAIN: 1,
        HARD: 3,
        GOOD: 4,
        EASY: 5,
      };

      const quality = qualityMap[input.rating] || 3;
      const { interval, repetitions, easeFactor } = calculateSM2(
        quality,
        state.repetition,
        state.interval,
        state.easeFactor
      );

      const nextReviewDate = new Date(Date.now() + interval * 86400000);

      ctx.db.srsCards.set(input.cardId, {
        easeFactor,
        interval,
        repetition: repetitions,
        nextReviewDate,
      });

      return {
        cardId: input.cardId,
        interval,
        repetition: repetitions,
        easeFactor,
        nextReviewDate,
      };
    }),
});

