export enum Order {
  asc = "asc",
  desc = "desc",
}

export interface SearchParams {
  page: number;
  show: number;
  search: string;
  category_id?: string;
}

export const searchParams: string = "?page=1&show=10&search=&category_id=1";
