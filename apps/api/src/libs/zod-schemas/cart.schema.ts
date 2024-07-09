import { z } from 'zod';

export const upsertCartSchema = z.object({
  store_stock_id: z.string(),
  // user_id: z.string(),
  quantity: z.preprocess(
    (val) => Math.ceil(parseInt(val as string, 10)),
    z.number().min(1),
  ),
});

export const deleteCartSchema = z.object({
  store_stock_id: z.string(),
});
