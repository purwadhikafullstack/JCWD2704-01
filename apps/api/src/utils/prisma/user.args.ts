import { Prisma, Role } from '@prisma/client';
import { Request } from 'express';
import { addressFindMany, storeAddressFindFirst } from './address.args';

export function userFindMany(
  role: Role,
  req: Request,
): Prisma.UserFindManyArgs {
  const { sort_by, order, search, date } = req.query;
  return {
    where: {
      role,
      AND: {
        is_banned: false,
        OR: [
          { full_name: { contains: String(search) } },
          { email: { contains: String(search) } },
          { created_at: new Date(String(date)) },
        ],
      },
    },
    orderBy: { [`${sort_by}`]: String(order) },
    include: {
      addresses: addressFindMany(req),
      store: storeAddressFindFirst(req),
    },
    omit: {
      password: true,
    },
  };
}

const adminOmit: Prisma.UserOmit = {
  avatar_id: true,
  reset_token: true,
  referral_code: true,
  reference_code: true,
  is_verified: true,
  voucher_id: true,
};

export function adminFindFirst(req: Request): Prisma.UserFindFirstArgs {
  const { email } = req.body;
  return {
    where: {
      email,
      AND: {
        OR: [{ role: Role.super_admin }, { role: Role.store_admin }],
      },
    },
    include: {
      addresses: true,
    },
    omit: adminOmit,
  };
}
