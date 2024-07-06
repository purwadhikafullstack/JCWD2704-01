export enum Order {
  asc = "asc",
  desc = "desc",
}

export interface UserSearchParams {
  page: number;
  show: number;
  sort_by: string;
  order: Order;
  search: string;
  date: string;
  city: string;
  province: string;
}

export interface StoreAdminSearchParams extends UserSearchParams {
  store_city: string;
  store_province: string;
}
