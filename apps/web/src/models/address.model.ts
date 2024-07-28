export enum AddressType {
  personal = "personal",
  store = "store",
  destination = "destination",
}

export type TAddress = {
  id?: string;
  user_id: string;
  address: string;
  city_id: number;
  type: AddressType;
  details?: string;
  longitude: number;
  latitude: number;
  created_at: Date;
  updated_at: Date;
  city: TCity;
};

export type TCity = {
  city_id: number;
  province: string;
  type: string;
  city_name: string;
  postal_code: number;
  created_at: Date;
  updated_at: Date;
};
