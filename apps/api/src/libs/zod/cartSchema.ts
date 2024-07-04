import { z } from 'zod';

export const upsertCartSchema = z.object({
  store_stock_id: z.string(),
  quantity: z.number().int().min(1),
});

export const deleteCartSchema = z.object({
  store_stock_id: z.string(),
});
