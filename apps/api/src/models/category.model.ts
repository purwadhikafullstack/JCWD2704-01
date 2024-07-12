import { TImage } from './image.model';
import { TProduct } from './products.model';

export type TCategory = {
  id: number;
  name: string;
  image_id?: string;
  image?: TImage;
  product: TProduct[];
  sub_categories: TSubCategory[];
  created_at?: Date;
  updated_at?: Date;
};

export type TSubCategory = {
  id?: number;
  name: string;
  category_id: number;
  category: TCategory;
  products: TProduct[];
  created_at?: Date;
  updated_at?: Date;
};
