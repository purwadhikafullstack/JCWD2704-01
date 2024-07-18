import { Variants } from "@/models/product.model";
import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, { message: "Must contain at least 3 characters." }),
  description: z.string().min(8, { message: "Must contain at least 8 characters." }),
  shelf_life: z.string().optional(),
  nutrition_facts: z.string().optional(),
  storage_instructions: z.string().optional(),
  category_id: z.string().trim(),
  sub_category_id: z.string().trim(),
});

export const createVariantSchema = z.object({
  name: z.string().min(2).trim(),
  type: z.enum([Variants.flavour, Variants.pcs, Variants.size, Variants.volume, Variants.weight]),
  weight: z.string().regex(new RegExp("^[0-9]*$")),
  product_id: z.string().trim().min(5),
  variant_image: z
    .instanceof(File)
    .refine((file) => file?.size < 1024 * 1024)
    .refine((file) => file.type.startsWith("image/")),
});

export const updateProductSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(8).optional(),
  shelf_life: z.string().optional(),
  nutrition_facts: z.string().optional(),
  storage_instructions: z.string().optional(),
  category_id: z.string().regex(new RegExp("^[0-9]*$")).optional(),
  sub_category_id: z.string().regex(new RegExp("^[0-9]*$")).optional(),
});

export const updateVariantSchema = z.object({
  type: z.enum([Variants.flavour, Variants.pcs, Variants.size, Variants.volume, Variants.weight]).optional(),
  name: z.string().min(2).optional(),
  weight: z.string().regex(new RegExp("^[0-9]*$")).optional(),
  product_id: z.string().trim().min(5).optional(),
  variant_image: z
    .instanceof(File)
    .refine((file) => file?.size < 1024 * 1024)
    .refine((file) => file.type.startsWith("image/"))
    .optional(),
});
