import { AddressType, Prisma } from '@prisma/client';
import { Request } from 'express';

export function addressFindMany(req: Request): Prisma.AddressFindManyArgs {
  const { search, city } = req.query;
  const where: Prisma.AddressWhereInput = { type: AddressType.personal };
  if (search) where.AND = { OR: [{ address: { contains: String(search) } }] };
  if (city) where.AND = { OR: [{ city: { city_name: { equals: String(city) } } }] };
  return {
    where,
    include: {
      city: true,
    },
  };
}
