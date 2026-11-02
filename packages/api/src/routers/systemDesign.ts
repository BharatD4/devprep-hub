import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { ReviewArchitectureSchema } from '../schemas';

export const systemDesignRouter = router({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.systemDesigns.map((sd) => ({
      id: sd.id,
      slug: sd.slug,
      title: sd.title,
      type: sd.type,
      scaleRequirements: sd.scaleRequirements,
      functionalSpecs: sd.functionalSpecs,
    }));
  }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      const scenario = ctx.db.systemDesigns.find((sd) => sd.slug === input.slug);
      if (!scenario) throw new Error(`Scenario not found: ${input.slug}`);
      return scenario;
    }),

  reviewArchitecture: protectedProcedure
    .input(ReviewArchitectureSchema)
    .mutation(({ ctx, input }) => {
      const scenario = ctx.db.systemDesigns.find((sd) => sd.slug === input.promptSlug);
      if (!scenario) throw new Error(`Scenario not found: ${input.promptSlug}`);

      const nodes = input.diagramData?.nodes || [];
      const explanation = input.userExplanation.toLowerCase();

      // Heuristic analysis of architecture nodes
      const hasLB = nodes.some((n: any) => n.type === 'lb' || n.label?.toLowerCase().includes('balancer') || n.label?.toLowerCase().includes('cdn'));
      const hasCache = nodes.some((n: any) => n.type === 'cache' || n.label?.toLowerCase().includes('redis') || n.label?.toLowerCase().includes('memcached'));
      const hasDB = nodes.some((n: any) => n.type === 'db' || n.label?.toLowerCase().includes('postgres') || n.label?.toLowerCase().includes('database') || n.label?.toLowerCase().includes('cassandra'));
      const hasQueue = nodes.some((n: any) => n.label?.toLowerCase().includes('kafka') || n.label?.toLowerCase().includes('queue') || n.label?.toLowerCase().includes('rabbitmq'));

      const spofIssues: string[] = [];
      const bottleneckIssues: string[] = [];
      const commendations: string[] = [];

      if (!hasLB) {
        spofIssues.push('Single Point of Failure: No Load Balancer or CDN detected. Ingress traffic will overwhelm individual service instances.');
      } else {
        commendations.push('Redundant ingress layer with Load Balancer/CDN prevents ingress bottleneck.');
      }

      if (!hasCache) {
        bottleneckIssues.push('Database Bottleneck: High read-to-write ratio requires an in-memory caching tier (e.g. Redis LRU) to prevent disk I/O saturation.');
      } else {
        commendations.push('In-memory cache layer effectively shields persistent storage from high read volume.');
      }

      if (explanation.includes('sharding') || explanation.includes('partition')) {
        commendations.push('Explicit data partitioning strategy provides horizontal database scaling.');
      } else if (hasDB) {
        bottleneckIssues.push('Scale Limit: Single database instance without explicit read replicas or sharding will bottleneck at peak write traffic.');
      }

      if (explanation.includes('eventual consistency') || explanation.includes('cap')) {
        commendations.push('Thoughtful discussion of CAP theorem trade-offs and consistency guarantees.');
      }

      // Compute score
      let score = 70;
      if (hasLB) score += 8;
      if (hasCache) score += 8;
      if (hasQueue || explanation.includes('async')) score += 7;
      if (explanation.length > 150) score += 7;
      score = Math.min(98, score);

      return {
        overallScore: score,
        breakdown: {
          spofScore: hasLB ? 90 : 50,
          bottlenecksScore: hasCache ? 88 : 55,
          scalabilityScore: nodes.length >= 4 ? 92 : 65,
          tradeoffsScore: explanation.includes('trade') || explanation.includes('cap') ? 95 : 75,
        },
        spofIssues,
        bottleneckIssues,
        commendations,
        executiveSummary: `Evaluated architecture composed of ${nodes.length} components. Architecture demonstrated ${
          score >= 85 ? 'production-grade resilience and sound horizontal scalability.' : 'good core structure with several key availability bottlenecks that should be hardened.'
        }`,
      };
    }),
});

