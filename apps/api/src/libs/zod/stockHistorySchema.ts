import { z } from 'zod';

export const stockChangeHandlerSchema = z.object({
  list: z.array(
    z.object({
      id: z.string(),
      quantity: z.number().min(1),
    }),
  ),
  reference: z.string(),
  changeAll: z.enum(['increase', 'decrease']),
});
