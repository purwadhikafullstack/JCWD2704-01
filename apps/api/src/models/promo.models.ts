import { TStoreStock } from './store.model';
import { TUser } from './user.model';

export enum PromoType {
  discount = 'discount',
  voucher = 'voucher',
  referral_voucher = 'referral_voucher',
  cashback = 'cashback',
  free_shipping = 'free_shipping',
}

export type TPromotion = {
  id?: string;
  title: string;
  description?: string;
  type: PromoType;
  amount: number;
  min_transaction: number;
  expiry_date: Date;
  is_valid: Boolean;
  store_stock: TStoreStock[];
  // CustomerOrders  CustomerOrders[],
  user?: TUser[];
  created_at?: Date;
  updated_at?: Date;
};
