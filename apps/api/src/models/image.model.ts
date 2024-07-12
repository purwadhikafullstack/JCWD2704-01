import { TCategory } from './category.model';
import { TVariant } from './products.model';
import { TUser } from './user.model';

export enum ImageType {
  avatar = 'avatar',
  store = 'store',
  product = 'product',
  promotion = 'promotion',
  discount = 'discount',
  voucher = 'voucher',
  category = 'category',
}

export type TImage = {
  id?: string;
  name?: string;
  blob: Buffer;
  type: ImageType;
  user?: TUser;
  ProductVariants: TVariant;
  category?: TCategory;
  created_at?: Date;
  updated_at?: Date;
};
