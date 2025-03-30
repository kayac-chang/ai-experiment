import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';

/**
 * Classifies the sentiment of a given text as positive, negative, or neutral.
 *
 * This function uses the OpenAI GPT-4o-mini model to analyze the emotional tone
 * of the provided text and categorize it into one of three sentiment categories.
 *
 * @param text - The text string to analyze for sentiment
 * @returns A Promise that resolves to either 'positive', 'negative', or 'neutral'
 * @example
 * ```typescript
 * const sentiment = await classifySentiment("I really enjoyed the movie!");
 * console.log(sentiment); // 'positive'
 * ```
 */
export const classifySentiment = (text: string) =>
  generateObject({
    model: openai('gpt-4o-mini'),
    output: 'enum',
    enum: ['positive', 'negative', 'neutral'],
    system: `classify the sentiment of the text`,
    prompt: text,
  });
