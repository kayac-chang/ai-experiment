import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import dedent from 'dedent';
import z from 'zod';

const SiteSchema = z.object({
  title: z.string(),
  path: z.string(),
  description: z.string().optional(),
});
type Site = z.infer<typeof SiteSchema>;

const sys_prompt = (sitemap: Site[]) => dedent`
  You are an intent recognizer.
  Given a user query, output the correct site that best matches the user's intent based on the sitemap.
  If the query does not match any known intent, return { title: "UNKNOWN", path: "" }.

  === sitemap ===
  ${JSON.stringify(sitemap)}
  ===============
`;

export const intentToSite = (sitemap: Site[]) => (text: string) =>
  generateObject({
    model: openai('gpt-4o-mini'),
    schema: SiteSchema,
    system: sys_prompt(sitemap),
    prompt: text,
  })
    //
    .then((res) => (res.object.title === 'UNKNOWN' ? undefined : res.object));

const sitemap = [
  {
    title: 'Home',
    path: '/',
    lastModified: '2025-03-30',
    description: 'Welcome to our homepage. Learn who we are and what we do.',
  },
  {
    title: 'About',
    path: '/about',
    lastModified: '2025-03-15',
    description: 'Read about our mission, vision, and team.',
  },
  {
    title: 'Blog',
    path: '/blog',
    lastModified: '2025-03-28',
    description: 'Explore our latest articles, tutorials, and technical insights.',
    children: [
      {
        title: 'How to Start Coding',
        path: '/blog/how-to-start-coding',
        lastModified: '2025-03-27',
        description: "A beginner's guide to getting started with programming.",
      },
      {
        title: 'Best IDEs in 2025',
        path: '/blog/best-ides-2025',
        lastModified: '2025-03-26',
        description: 'Our roundup of the top IDEs developers love in 2025.',
      },
    ],
  },
  {
    title: 'Projects',
    path: '/projects',
    lastModified: '2025-03-25',
    description: 'Check out our portfolio of past and current projects.',
  },
  {
    title: 'Contact',
    path: '/contact',
    lastModified: '2025-03-10',
    description: 'Get in touch with us for questions, support, or collaborations.',
  },
];

const res = await intentToSite(sitemap)('我想點餐');
console.log(res);
