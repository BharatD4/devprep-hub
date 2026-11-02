import { z } from 'zod';

export const RunCodeSchema = z.object({
  language: z.enum(['python', 'javascript', 'typescript', 'cpp', 'java', 'go']),
  code: z.string().min(1, 'Code cannot be empty'),
  problemSlug: z.string(),
  customInput: z.string().optional(),
});

export const SubmitProblemSchema = z.object({
  language: z.enum(['python', 'javascript', 'typescript', 'cpp', 'java', 'go']),
  code: z.string().min(1, 'Code cannot be empty'),
  problemSlug: z.string(),
});

export const ReviewCardSchema = z.object({
  cardId: z.string(),
  rating: z.enum(['AGAIN', 'HARD', 'GOOD', 'EASY']), // Maps to SM-2 quality 1, 3, 4, 5
});

export const ReviewArchitectureSchema = z.object({
  promptSlug: z.string(),
  diagramData: z.any(),
  userExplanation: z.string().min(10, 'Please provide an architectural explanation'),
});

export const InterviewMessageSchema = z.object({
  sessionId: z.string().optional(),
  type: z.enum(['DSA_TECHNICAL', 'SYSTEM_DESIGN_HLD', 'SYSTEM_DESIGN_LLD', 'BEHAVIORAL_STAR']),
  roleTarget: z.string().default('Senior Software Engineer'),
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string(),
    })
  ),
  requestHint: z.boolean().optional(),
});

export const ATSScanSchema = z.object({
  jobDescription: z.string().min(20, 'Please provide a valid job description'),
  resumeText: z.string().min(50, 'Please provide resume text with work experience'),
});

export const BehavioralStorySchema = z.object({
  title: z.string().min(3),
  companyPillar: z.string(),
  situation: z.string().min(10),
  task: z.string().min(10),
  action: z.string().min(10),
  result: z.string().min(10),
});

