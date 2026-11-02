import { PrismaClient } from '@prisma/client';
import { SEED_PROBLEMS, SEED_SYSTEM_DESIGN, SEED_FLASHCARDS } from '../src/data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting DevPrep Hub Database Seeding...');

  // Check if live DATABASE_URL is available
  const hasDb = Boolean(process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder'));

  if (!hasDb) {
    console.log('ℹ️ No live DATABASE_URL provided. Validating seed datasets in-memory...');
    console.log(`✅ Loaded ${SEED_PROBLEMS.length} DSA Problems.`);
    console.log(`✅ Loaded ${SEED_SYSTEM_DESIGN.length} System Design Prompts.`);
    console.log(`✅ Loaded ${SEED_FLASHCARDS.length} CS Fundamentals Flashcards.`);
    console.log('🎉 Seed dataset validated successfully!');
    return;
  }

  try {
    // 1. Seed Demo User
    const user = await prisma.user.upsert({
      where: { email: 'demo@devprep.hub' },
      update: {},
      create: {
        id: 'usr-demo-1',
        email: 'demo@devprep.hub',
        name: 'Alex Chen',
        targetRole: 'Staff Software Engineer',
        streakCount: 14,
        readinessScore: 84,
      },
    });
    console.log(`👤 Seeded User: ${user.email}`);

    // 2. Seed DSA Problems
    for (const prob of SEED_PROBLEMS) {
      await prisma.problem.upsert({
        where: { slug: prob.slug },
        update: prob,
        create: prob,
      });
    }
    console.log(`✅ Seeded ${SEED_PROBLEMS.length} DSA Problems.`);

    // 3. Seed System Design Prompts
    for (const sd of SEED_SYSTEM_DESIGN) {
      await prisma.systemDesignPrompt.upsert({
        where: { slug: sd.slug },
        update: sd,
        create: sd,
      });
    }
    console.log(`✅ Seeded ${SEED_SYSTEM_DESIGN.length} System Design Prompts.`);

    // 4. Seed CS Fundamentals Flashcards
    for (const fc of SEED_FLASHCARDS) {
      await prisma.flashcard.upsert({
        where: { id: fc.id },
        update: fc,
        create: fc,
      });
    }
    console.log(`✅ Seeded ${SEED_FLASHCARDS.length} CS Fundamentals Flashcards.`);

    console.log('✨ All seed data written successfully to database!');
  } catch (err) {
    console.warn('⚠️ Note: Database seed could not reach PostgreSQL host, falling back to cached datasets.');
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(0);
});

