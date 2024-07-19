import { Variants } from '@prisma/client';
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(8),
});

export const createVariantSchema = z.object({
  type: z.enum([Variants.flavour, Variants.pcs, Variants.size, Variants.volume, Variants.weight]),
  name: z.string().min(2),
  weight: z.number().positive().min(1),
});
export const updateProductSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(8).optional(),
});

export const updateVariantSchema = z.object({
  type: z.enum([Variants.flavour, Variants.pcs, Variants.size, Variants.volume, Variants.weight]).optional(),
  name: z.string().min(2).optional(),
  weight: z.number().positive().min(1).optional(),
});
