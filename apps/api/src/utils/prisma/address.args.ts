import { AddressType, Prisma } from '@prisma/client';
import { Request } from 'express';

export function addressFindMany(req: Request): Prisma.AddressFindManyArgs {
  const { search, city, province } = req.query;
  return {
    where: {
      type: AddressType.personal,
      AND: {
        OR: [
          { address: { contains: String(search) } },
          {
            city: {
              OR: [
                { city_name: { equals: String(city) } },
                { province: { equals: String(province) } },
              ],
            },
          },
        ],
      },
    },
    include: {
      city: true,
    },
  };
}

export function storeAddressFindFirst(req: Request): Prisma.StoreFindFirstArgs {
  const { search, store_city, store_province } = req.query;
  return {
    where: {
      address: {
        type: AddressType.store,
        AND: {
          OR: [
            { address: { contains: String(search) } },
            {
              city: {
                OR: [
                  { city_name: { equals: String(store_city) } },
                  { province: { equals: String(store_province) } },
                ],
              },
            },
          ],
        },
      },
    },
  };
}
