import { TAddress } from './address.model';
import { TVariant } from './products.model';
import { TPromotion } from './promo.models';
import { TUser } from './user.model';

export type TStore = {
  address_id: string;
  address: TAddress;
  store_admin: TUser[];
  product_stock: TStoreStock[];
  schedule_id?: string;
  //   schedule?:        TStoreSchedule
  //   customer_orders: TCustomerOrders[]
  created_at?: Date;
  updated_at?: Date;
};

export type TStoreStock = {
  id: string;
  store_id: string;
  store: TStore;
  variant_id: string;
  product: TVariant;
  //   stock_history: TStockHistory[];
  unit_price: number;
  discount?: number;
  promo_id?: string;
  promo?: TPromotion;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
};
