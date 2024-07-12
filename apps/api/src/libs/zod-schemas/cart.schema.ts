import { z } from 'zod';

export const upsertCartSchema = z.object({
  store_stock_id: z.string(),
  quantity: z.preprocess((v) => Number(v), z.number()),
});

export const deleteCartSchema = z.object({
  store_stock_id: z.string(),
});
