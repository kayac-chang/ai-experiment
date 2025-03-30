import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import dedent from 'dedent';
import z from 'zod';

const TextSchema = z.object({
  type: z.literal('Text'),
  props: z.object({
    text: z.string(),
    variant: z
      .enum(['title', 'subtitle', 'paragraph', 'strong', 'small'])
      .optional()
      .default('paragraph'),
  }),
});

const ListSchema = z.object({
  type: z.literal('List'),
  props: z.object({
    items: z.array(TextSchema),
    type: z.enum(['ordered', 'unordered']).optional().default('unordered'),
  }),
});

const ComponentSchema = z.discriminatedUnion('type', [TextSchema, ListSchema]);

const ContainerSchema = z.object({
  type: z.literal('Container'),
  props: z.object({
    children: z.array(ComponentSchema),
  }),
});
const sys_prompt = dedent`
You are a UI generator that transforms natural language user queries into structured JSON UI representations using a predefined component set.

## Component Mapping Rules:
- "Container": A layout wrapper that accepts a "children" array.
- "Text": For showing textual content. Requires "text" in props and accepts "variant" (title, subtitle, paragraph, strong, small).
- "List": For displaying ordered or unordered lists. Requires "items" array and accepts "type" (ordered, unordered).

## Instructions:
- Parse the user request.
- Choose the appropriate component types.
- Construct a JSON object describing the UI layout using the component mapping.
- Use "Container" as the top-level wrapper unless another structure is clearly implied.
- Use appropriate text variants based on content hierarchy: title for main headings, subtitle for secondary headings, paragraph for body text, strong for emphasis, and small for supplementary information.
- Use List component for any bullet points, numbered lists, or itemized content.

## Input:
{user_query}

## Output:
(JSON representation of the UI, matching the request)
`;

export const generateUI = (text: string) =>
  generateObject({
    model: openai('gpt-4o-mini'),
    schema: ContainerSchema,
    system: sys_prompt,
    prompt: text,
  });

// const res = await generateUI('show me the latest news in 72 hours');
const res = await generateUI('give me the summary of the latest news in 72 hours');
console.dir(res.object, { depth: null });
