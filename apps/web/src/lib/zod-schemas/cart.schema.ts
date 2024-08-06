import { z } from "zod";

export const cartSchema = z.object({
  store_stock_id: z.string().trim(),
  quantity: z.number({ message: "Please enter a valid quantity" }).min(1).nonnegative(),
});
