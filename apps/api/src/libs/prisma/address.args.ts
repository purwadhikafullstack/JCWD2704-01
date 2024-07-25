import { AddressType, Prisma } from '@prisma/client';
import { Request } from 'express';

export function addressFindMany(req: Request): Prisma.AddressFindManyArgs {
  const { search } = req.query;
  const where: Prisma.AddressWhereInput = { type: AddressType.personal };
  if (search) where.AND = { OR: [{ address: { contains: String(search) } }, { city: { city_name: { contains: String(search) } } }] };
  return {
    where,
    include: {
      city: true,
    },
  };
}
