import { z } from 'zod';

export const testApplyVoucherSchema = z.object({
  promoId: z.coerce.string(),
  shipCost: z.coerce.number().min(0),
  total: z.coerce.number().gt(0),
});
