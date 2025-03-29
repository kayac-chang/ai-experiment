import { z } from 'zod';

export const InfoSchema = z.object({
  id: z.string().min(1, 'id is required'),
  created: z.coerce.date({ required_error: 'created is required' }),
  updated: z.coerce.date({ required_error: 'updated is required' }),
  url: z.string().url('url must be a valid URL'),
  url_title: z
    .string()
    .min(1, 'url_title is required')
    .max(255, 'url_title must be less than 255 characters'),
  content: z.string().min(1, 'content is required'),
});

export type Info = z.infer<typeof InfoSchema>;
