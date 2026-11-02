import { router } from './trpc';
import { problemRouter } from './routers/problem';
import { roadmapRouter } from './routers/roadmap';
import { srsRouter } from './routers/srs';
import { systemDesignRouter } from './routers/systemDesign';
import { aiInterviewRouter } from './routers/aiInterview';
import { atsRouter } from './routers/ats';
import { analyticsRouter } from './routers/analytics';

export const appRouter = router({
  problem: problemRouter,
  roadmap: roadmapRouter,
  srs: srsRouter,
  systemDesign: systemDesignRouter,
  aiInterview: aiInterviewRouter,
  ats: atsRouter,
  analytics: analyticsRouter,
});

export type AppRouter = typeof appRouter;

