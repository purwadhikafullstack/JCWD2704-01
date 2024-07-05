"use server";

import axiosInstance, { TRoute } from "@/lib/axios";
import axios, { AxiosInterceptorOptions } from "axios";
import { revalidatePath } from "next/cache";

export type FetchOption = {
  url:
    | { server: TRoute; other: undefined }
    | { other: string; server: undefined };
  method: "get" | "post" | "patch" | "put" | "delete";
  option: AxiosInterceptorOptions;
};
export default async function serverFetch({
  url,
  method,
  option,
}: FetchOption) {
  if (url.server) return await axiosInstance()[method](url.server, option);
  if (url.other) return await axios[method](url.other, option);
}

export async function fetchProduct(product_id: string) {
  "use server";
  await axiosInstance()
    .get(`/product/${product_id}`, {})
    .then((res) => res.data.data as any)
    .catch((err) => err);

  revalidatePath("/[userId]/cart");
}
