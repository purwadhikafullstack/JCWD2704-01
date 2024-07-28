import { TImage } from "./image.model";
import { Product } from "./product.model";

export type TCategory = {
  id: number;
  name: string;
  image_id?: string;
  image?: TImage;
  product: Product[];
  sub_categories: TSubCategory[];
  created_at?: string;
  updated_at?: string;
};

export type TSubCategory = {
  id: number;
  name: string;
  category_id: number;
  category: TCategory;
  products: Product[];
  created_at?: string;
  updated_at?: string;
};
