import { z } from 'zod';

export const CollectionSchema = <T extends z.ZodType>(itemSchema: T) => {
  return z.object({
    page: z.number().int().positive(),
    perPage: z.number().int().positive(),
    totalItems: z.number().int().nonnegative(),
    totalPages: z.number().int().positive(),
    items: z.array(itemSchema),
  });
};

export type Collection<T> = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
};
