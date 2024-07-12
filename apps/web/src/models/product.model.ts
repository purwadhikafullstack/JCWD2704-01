type ProductVariant = {
  id: string;
  type: string;
  image_id: string | null;
  name: string;
  product_id: string;
  weight: number;
  created_at: string;
  updated_at: string;

  product: Product;
};

type StoreStock = {
  id: string;
  store_id: string;
  variant_id: string;
  unit_price: number;
  discount: number;
  quantity: number;
  promo_id: string | null;
  created_at: string;
  updated_at: string;
  product: ProductVariant;
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  shelf_life: string | null;
  nutrition_facts: string | null;
  storage_instructions: string | null;
  category_id: number;
  sub_category_id: number;
  created_at: string;
  updated_at: string;
};
