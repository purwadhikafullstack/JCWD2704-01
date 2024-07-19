import { z } from 'zod';

export const getNearestStoreSchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});
