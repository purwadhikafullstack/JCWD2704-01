import { z } from "zod";

export const cartSchema = z.object({
  store_stock_id: z.string().trim(),
  quantity: z.number().min(1).nonnegative(),
});
