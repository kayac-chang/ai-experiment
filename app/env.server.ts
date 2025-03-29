import { z } from 'zod';

const envSchema = z.object({
  // OpenAI Configuration
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required'),

  // PocketBase Configuration
  POCKETBASE_URL: z.string().url('POCKETBASE_URL must be a valid URL'),
  POCKETBASE_USER: z.string().email('POCKETBASE_USER must be a valid email'),
  POCKETBASE_PASSWORD: z.string().min(1, 'POCKETBASE_PASSWORD is required'),
});

export const env = envSchema.parse({
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  POCKETBASE_URL: process.env.POCKETBASE_URL,
  POCKETBASE_USER: process.env.POCKETBASE_USER,
  POCKETBASE_PASSWORD: process.env.POCKETBASE_PASSWORD,
});
