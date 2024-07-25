import prisma from '@/prisma';
import { Request } from 'express';

import { addressUpsertArgs } from '@/constants/address.constant';
import { userCreateAddress } from '@/schemas/address.schema';
import { AuthError, CustomError } from '@/utils/error';

class AddressService {
  async getUserAddresses(req: Request) {
    if (!req.user) throw new AuthError('not authorized');
    const { user_id } = req.params;
    if (req.user.role == 'customer') {
      if (user_id != req.user.id) throw new AuthError('cant access other user address');
    }
    return await prisma.address.findMany({ where: { user_id, type: 'personal' } });
  }

  async create(req: Request) {
    const { longitude, latitude, address, details, city_id } = req.body;
    const validate = userCreateAddress.parse({
      address,
      details,
      city_id: Number(city_id),
      longitude: Number(longitude),
      latitude: Number(latitude),
    });
    return await prisma.$transaction(async (tx) => {
      const city = await tx.city.findFirst({ where: { city_id: validate.city_id } });
      if (!city?.city_id) throw new CustomError(`Cannot find City: ${city_id}`);
      await tx.address.upsert(addressUpsertArgs({ city_id: city.city_id, user_id: req.user?.id!, validate }));
    });
  }

  async delete(req: Request) {
    return await prisma.$transaction(async (tx) => {
      const address = await tx.address.findFirst({ where: { user_id: req.user?.id } });
      if (!address?.id) throw new CustomError("You don't have an address");
      await tx.address.delete({ where: { id: address.id } });
    });
  }

  async get(req: Request) {
    if (!req.user) throw new CustomError('not authorized');
    return await prisma.address.findMany({ where: { id: req.user.address?.id } });
  }
}

export default new AddressService();
