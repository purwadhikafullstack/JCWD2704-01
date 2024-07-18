/** @format */
import { Request } from 'express';
import { prisma } from '@/libs/prisma';
import { haversineDistance } from '@/utils/haversineDistance';
import { AuthError, InternalServerError } from '@/utils/error';
import { getNearestStoreSchema } from '@/libs/zod-schemas/store.schema';

export class StoreService {
  async getNearestStore(req: Request) {
    const { longitude, latitude } = getNearestStoreSchema.parse(req.query);
    const stores = await prisma.store.findMany({ include: { address: true } });
    if (stores.length < 1) throw new InternalServerError('There is no store');
    const condition = stores.every(({ address }) => (typeof address.latitude != null && typeof address.longitude != null ? true : false));
    if (!condition) throw new InternalServerError('There is store with no latitude or longitude');
    const storesDistance = stores
      .map((e) => ({
        store_id: e.address_id,
        distance: haversineDistance({ latitude, longitude }, { latitude: e.address.latitude as number, longitude: e.address.longitude as number }),
      }))
      .sort((a, b) => a.distance - b.distance);
    return storesDistance[0];
  }

  async getStoreList(req: Request) {
    if (!req.user) throw new AuthError('not authorized');
    return await prisma.store.findMany({ select: { address_id: true } });
  }
}
export default new StoreService();
