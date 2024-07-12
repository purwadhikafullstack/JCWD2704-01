export enum Order {
  asc = "asc",
  desc = "desc",
}

export interface UserSearchParams {
  page: number;
  show: number;
  search: string;
}

export interface StoreAdminSearchParams extends UserSearchParams {
  store_city: string;
  store_province: string;
}
