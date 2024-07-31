import { UserCreateAddressType } from '@/schemas/address.schema';
import { Prisma } from '@prisma/client';

export const addressUpsertArgs = ({
  validate,
  user_id,
  city_id,
}: {
  validate: UserCreateAddressType;
  user_id: string;
  city_id: number;
}): Prisma.AddressUpsertArgs => {
  return {
    create: {
      user_id,
      city_id,
      address: validate.address,
      details: validate.details,
      longitude: validate.longitude,
      latitude: validate.latitude,
    },
    update: {
      user_id,
      city_id,
      address: validate.address,
      details: validate.details,
      longitude: validate.longitude,
      latitude: validate.latitude,
    },
    where: {
      user_id,
    },
  };
};
