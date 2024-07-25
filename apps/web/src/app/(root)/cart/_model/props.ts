export interface InputQuantityProps {
  store_stock_id: string;
  quantity: number;
  unit_price: number;
  weight: number;
  discount?: number;
  disable?: boolean;
}

export type TVoucher = {
  id: string;
  title: string;
  description?: string;
  amount: number;
  min_transaction: number;
  expiry_date: Date;
};
