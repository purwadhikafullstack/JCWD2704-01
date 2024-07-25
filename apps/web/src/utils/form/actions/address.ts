import { axiosInstanceCSR } from "@/lib/axios.client-config";
import { UserCreateAddressType } from "@/schemas/address.schema";

export const userAddressAction = async (payload: UserCreateAddressType) => {
  return await axiosInstanceCSR().post("/addresses/user", payload);
}