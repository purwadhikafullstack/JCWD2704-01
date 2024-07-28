import { TAddress } from './address.model';
import { TVariant } from './products.model';
import { TPromotion } from './promo.models';
import { TUser } from './user.model';

export type TStoreSchedule = {
  id?: string;
  name: string;
  start_time?: Date | null;
  end_time?: Date | null;
  created_at?: Date;
  updated_at?: Date;
};

export type TStore = {
  address_id: string;
  address: TAddress;
  store_admin?: TUser[];
  product_stock?: TStoreStock[];
  schedule_id?: string | null;
  schedule?: TStoreSchedule | null;
  //   customer_orders: TCustomerOrders[]
  created_at?: Date;
  updated_at?: Date;
};

export type TStoreStock = {
  id?: string;
  store_id: string;
  store?: TStore | null;
  variant_id: string;
  product?: TVariant | null;
  stock_history?: TStockHistory[] | null;
  unit_price: number;
  discount?: number | null;
  promo_id?: string | null;
  promo?: TPromotion | null;
  quantity: number;
  reference?: string | null;
  created_at?: Date;
  updated_at?: Date;
};

export type TStockHistory = {
  id?: string;
  store_stock_id?: string | null;
  store_stock: TStoreStock;
  start_qty_at: number;
  qty_change: number;
  reference?: string | null;
  transaction_id?: string | null;
  created_at?: Date;
  updated_at?: Date;
};
