import { TCategory, TSubCategory } from "./category.model";
import { TProductVariant } from "./productVariant.model";

export type TProduct = {
  id: string;
  name: string;
  description: string | null;
  shelf_life: string | null;
  nutrition_facts: string | null;
  storage_instructions: string | null;
  category_id: number;
  sub_category_id: number;
  category: TCategory;
  sub_category: TSubCategory;
  variants: TProductVariant[];
  created_at: string;
  updated_at: string;
};
