import { z } from 'zod';

export const createOrderSchema = z.object({
  store_id: z.string(),
  shipping_cost: z.number().int(),
  promotion_id: z.string().optional(),

  products: z.array(
    z.object({
      store_stock_id: z.string(),
      quantity: z.number(),
      store_stock: z.object({
        products: z.object({
          unit_price: z.number(),
          discount: z.number(),
        }),
      }),
    }),
  ),
});
