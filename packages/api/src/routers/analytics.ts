import { router, protectedProcedure } from '../trpc';

export const analyticsRouter = router({
  getDashboard: protectedProcedure.query(({ ctx }) => {
    const user = ctx.db.user;
    const submissions = ctx.db.submissions;
    const flashcards = ctx.db.flashcards;

    // Readiness radar metrics
    const radarData = [
      { subject: 'Arrays & Two Pointers', score: 88, fullMark: 100 },
      { subject: 'Dynamic Programming', score: 72, fullMark: 100 },
      { subject: 'Trees & Graphs', score: 85, fullMark: 100 },
      { subject: 'System Design HLD', score: 80, fullMark: 100 },
      { subject: 'Object-Oriented LLD', score: 90, fullMark: 100 },
      { subject: 'Behavioral STAR', score: 86, fullMark: 100 },
    ];

    // 16-week contribution heatmap generator
    const activityMap: Array<{ date: string; count: number }> = [];
    const today = new Date();
    for (let i = 112; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      // Random deterministic density for realistic preview
      const count = (i % 7 === 0 || i % 5 === 0) ? Math.floor((i % 4) + 1) : (i % 3 === 0 ? 1 : 0);
      activityMap.push({ date: dateStr, count });
    }

    // Category breakdown
    const categoryStats = [
      { name: 'Arrays & Hashing', completed: 2, total: 2, percent: 100 },
      { name: 'Two Pointers & Sliding Window', completed: 3, total: 3, percent: 100 },
      { name: 'Stack & Linked List', completed: 2, total: 2, percent: 100 },
      { name: 'Trees & Heap', completed: 1, total: 2, percent: 50 },
      { name: 'Dynamic Programming', completed: 1, total: 1, percent: 100 },
    ];

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        targetRole: user.targetRole,
        streakCount: user.streakCount,
        readinessScore: user.readinessScore,
      },
      radarData,
      activityMap,
      categoryStats,
      recentSubmissions: submissions.slice(0, 5),
      totalSubmissions: submissions.length,
      totalFlashcardsReviewed: flashcards.length,
    };
  }),
});

