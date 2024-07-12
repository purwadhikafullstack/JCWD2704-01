import { AddressType } from '@prisma/client';

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
};
