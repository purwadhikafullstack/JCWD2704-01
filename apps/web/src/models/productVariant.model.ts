import { TImage } from "./image.model";

export type TProductVariant = {
  id: string;
  type: Variants;
  image_id?: string | null;
  images?: TImage | null;
  name: string;
  // store_stock: StoreStock[];
  product_id: string;
  product: TProductVariant;
  weight: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
};

enum Variants {
  weight = "weight",
  volume = "volume",
  size = "size",
  flavour = "flavour",
  pcs = "pcs",
}
