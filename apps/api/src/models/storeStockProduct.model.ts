import { StoreStock, ProductVariants, Cart } from '@prisma/client';

export interface IStoreStockProducts extends StoreStock {
  products: ProductVariants;
}

export interface ICartStoreStock extends Cart {
  store_stock: IStoreStockProducts;
}
