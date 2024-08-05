import { z } from "zod";

const errors = {
  nan: { message: "Enter valid number." },
  price: { message: "Price need to be at least Rp.100,-/item" },
  pos: { message: "Need to be a positive number." },
  qty: { message: "Quantity need to be at least 1 item." },
  disc: { message: "Discount need to start at least at 5%" },
  ref: { message: "Reference must contain at least 8 characters" },
};

export const initStockSchema = z.object({
  store_id: z.string().trim(),
  variant_id: z.string().trim(),
  unit_price: z.number({ message: errors.nan.message }).min(100, errors.price.message).positive(errors.pos.message),
  quantity: z.number({ message: errors.nan.message }).min(1, errors.qty.message).positive(errors.pos.message),
  discount: z.number({ message: errors.nan.message }).optional(),
  promo_id: z.string({ message: errors.nan.message }).trim().optional(),
  reference: z.string().trim().optional(),
});

export const updateStockSchema = z.object({
  unit_price: z.number({ message: errors.nan.message }).min(100, errors.price.message).positive(errors.pos.message).optional(),
  quantity: z.number({ message: errors.nan.message }).optional(),
  discount: z.number({ message: errors.nan.message }).nonnegative(errors.pos.message).optional(),
  promo_id: z.string().trim().optional(),
  reference: z
    .string()
    .trim()
    .min(5, { message: "Need to be at least 5 characters" })
    .max(100, { message: "Need to be at most 100 characters" }),
});
