import { z } from 'zod';

export const chatMessageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty'),
  role: z.enum(['user', 'assistant']),
  timestamp: z.date().optional(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema),
  model: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
