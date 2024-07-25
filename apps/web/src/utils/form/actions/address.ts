import { axiosInstanceCSR } from "@/lib/axios.client-config";
import { UserCreateAddressType } from "@/schemas/address.schema";

export const userAddressAction = async (payload: UserCreateAddressType) => {
  const { details, city_id, ...address } = payload;
  return await axiosInstanceCSR().post("/addresses/user", {
    ...(details && { details }),
    ...(city_id && { city_id }),
    ...address,
  });
};
