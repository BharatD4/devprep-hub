import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { CONCEPT_CHEAT_SHEETS } from '@devprep/db';

export const conceptRouter = router({
  list: publicProcedure
    .input(
      z.object({
        category: z.enum(['DSA', 'System Design', 'OS', 'DBMS', 'Networks']).optional(),
        search: z.string().optional(),
      }).optional()
    )
    .query(({ input }) => {
      let results = [...CONCEPT_CHEAT_SHEETS];
      if (input?.category) {
        results = results.filter((c) => c.category === input.category);
      }
      if (input?.search) {
        const q = input.search.toLowerCase();
        results = results.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.shortSummary.toLowerCase().includes(q) ||
            c.formulas.some((f) => f.toLowerCase().includes(q)) ||
            c.shortTricks.some((t) => t.toLowerCase().includes(q))
        );
      }
      return results;
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const found = CONCEPT_CHEAT_SHEETS.find((c) => c.id === input.id);
      if (!found) throw new Error(`Concept cheat sheet not found: ${input.id}`);
      return found;
    }),
});

