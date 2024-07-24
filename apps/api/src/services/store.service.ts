/** @format */
import { Request } from 'express';
import { prisma } from '@/libs/prisma';
import { AuthError, BadRequestError, InternalServerError } from '@/utils/error';
import { getNearestStoreSchema } from '@/libs/zod-schemas/store.schema';

export class StoreService {
  async getNearestStore(req: Request) {
    const { address_id } = getNearestStoreSchema.parse(req.query);
    const coordinate = await prisma.address.findUnique({ where: { id: address_id }, select: { latitude: true, longitude: true } });
    if (!coordinate || !coordinate.latitude || !coordinate.longitude) throw new BadRequestError('Address doesnt have coordinate');
    const { latitude, longitude } = coordinate;
    const result = await prisma.$queryRaw`
    SELECT id,
    (
      6371 * acos(
        cos(radians(${latitude})) * 
        cos(radians(latitude)) * 
        cos(radians(longitude) - radians(${longitude})) + 
        sin(radians(${latitude})) * 
        sin(radians(latitude))
      )
    ) AS distance
    FROM Addresses
    WHERE type = "store"
    ORDER BY distance
    LIMIT 1;
  `;
    return result;
  }

  async getStoreList(req: Request) {
    if (!req.user) throw new AuthError('not authorized');
    return await prisma.store.findMany({ select: { address_id: true } });
  }
}
export default new StoreService();
