import { z } from 'zod';

export const getNearestStoreSchema = z.object({
  address_id: z.string(),
});
