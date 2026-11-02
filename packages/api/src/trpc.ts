import { initTRPC } from '@trpc/server';
import { memoryDb } from '@devprep/db';

export interface Context {
  user?: {
    id: string;
    email: string;
    role: string;
    name?: string;
  };
  db: typeof memoryDb;
}

export const createContext = async (opts?: { req?: any }): Promise<Context> => {
  return {
    user: memoryDb.user,
    db: memoryDb,
  };
};

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  return next({
    ctx: {
      ...ctx,
      user: ctx.user ?? memoryDb.user,
    },
  });
});

