import z from 'zod';

const address = z.string();
const longitude = z.number();
const latitude = z.number();
const details = z.string().optional();
const city_id = z.number().optional();

export const userCreateAddress = z.object({
  address,
  details,
  longitude,
  latitude,
  city_id,
});

export type UserCreateAddressType = z.infer<typeof userCreateAddress>;
