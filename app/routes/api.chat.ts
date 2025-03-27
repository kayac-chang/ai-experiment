import { streamText, coreMessageSchema } from 'ai';
import { openai } from '@ai-sdk/openai';
import type { Route } from './+types/api.chat';

import { z } from 'zod';

const ChatRequestSchema = z.object({
  messages: z.array(coreMessageSchema),
});

export async function action({ request }: Route.ActionArgs) {
  const { messages } = await request.json().then(ChatRequestSchema.parseAsync);

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toDataStreamResponse();
}
