import z from 'zod';

const address = z.string();
const details = z.string();
const city_id = z.number();
const longitude = z.number();
const latitude = z.number();

export const userCreateAddress = z.object({
  address,
  details,
  longitude,
  latitude,
  city_id,
});

export type UserCreateAddressType = z.infer<typeof userCreateAddress>;
