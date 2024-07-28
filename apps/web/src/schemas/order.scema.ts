import { z } from "zod";

export const createOrderSchema = z.object({
  store_id: z.string(),
  destination_id: z.string(),
  promotion_id: z.string().optional(),
  courier: z.enum(["jne", "pos", "tiki"]),
  courier_service: z.string(),

  req_products: z
    .array(
      z.object({
        id: z.string(),
        quantity: z.number().min(1),
      }),
    )
    .min(1),
});
