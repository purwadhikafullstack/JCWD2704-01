import { TCategory } from "./category.model";
import { ProductVariant } from "./product.model";
import { TUser } from "./user.model";

export enum ImageType {
  avatar = "avatar",
  store = "store",
  product = "product",
  promotion = "promotion",
  discount = "discount",
  voucher = "voucher",
  category = "category",
}

export type TImage = {
  id?: string;
  name?: string;
  blob: Buffer;
  type: ImageType;
  user?: TUser;
  ProductVariants: ProductVariant;
  category?: TCategory;
  created_at?: string;
  updated_at?: string;
};
