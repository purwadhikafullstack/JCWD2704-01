import { TAddress } from "./address.model";
import { TUser } from "./user.model";

export type TStore = {
  address_id: string;
  address: TAddress;
  store_admin: TUser[];
  created_at: Date;
  updated_at: Date;
};
