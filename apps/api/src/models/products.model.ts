export type TProduct = {
  id?: string;
  name: string;
  description?: string;
  shelf_life?: string;
  nutrition_facts?: string;
  storage_instructions?: string;
  category_id: number;
  sub_category_id: number;
  variants: TVariant[];
  created_at?: Date;
  updated_at?: Date;
};

export enum Variants {
  weight = 'weight',
  volume = 'volume',
  size = 'size',
  flavour = 'flavour',
  pcs = 'pcs',
}

export type TVariant = {
  id?: string;
  type: Variants;
  image_id?: string;
  image: TImage;
  name: string;
  store_stock?: TStoreStock[];
  product_id?: string;
  product: TProduct;
  created_at?: Date;
  updated_at?: Date;
};
