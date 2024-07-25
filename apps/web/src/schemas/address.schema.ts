import z from "zod";

const address = z.string();
const longitude = z.number();
const latitude = z.number();
const details = z.string().min(4, { message: "Min. 4 Character" });
const city_id = z.string();

export const userCreateAddress = z.object({
  address,
  details,
  longitude,
  latitude,
  city_id,
});

export type UserCreateAddressType = z.infer<typeof userCreateAddress>;
