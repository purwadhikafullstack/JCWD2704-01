import { TStoreStock } from "./storeStock.model";

export type TCart = {
  user_id: string;
  store_stock_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  store_stock: TStoreStock;
};
