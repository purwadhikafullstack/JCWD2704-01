/** @format */
import { Request } from 'express';
import { prisma } from '@/libs/prisma';
import { haversineDistance } from '@/utils/haversineDistance';
import { AuthError, InternalServerError, NotFoundError } from '@/utils/error';
import { getNearestStoreSchema } from '@/libs/zod-schemas/store.schema';
import { Prisma } from '@prisma/client';

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

  async getStoreNamesIds(req: Request) {
    const { search_sel1 } = req.query;
    let where: Prisma.StoreWhereInput = { is_deleted: false };
    if (search_sel1)
      where.AND = {
        OR: [{ address: { address: { contains: String(search_sel1) } } }, { address: { city: { city_name: { contains: String(search_sel1) } } } }],
      };
    const data = await prisma.store.findMany({
      where,
      include: { address: { select: { address: true, id: true, city: { select: { city_name: true } } } } },
    });
    if (!data) throw new NotFoundError('Store not found.');
    return data;
  }
}
export default new StoreService();
