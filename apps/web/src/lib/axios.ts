import axios from "axios";
import { cookies } from "next/headers";
import { customAxiosInstance } from "@/models/customAxiosInstance.model";
import { NEXT_PUBLIC_BASE_API_URL } from "@/config/config";

interface IRoute {
  cart: "/cart" | `/cart/${string}`;
  user: "/user" | `/user/${string}`;
  product: "/product" | `/product/${string}`;
  ticket: "/ticket" | `/ticket/${string}`;
  branch: "/branch" | `/branch/${string}`;
  transaction: "/transaction" | `/transaction/${string}`;
  rating: "/rating" | `/rating/${string}`;
}

export type TRoute = IRoute[keyof IRoute];

export default function axiosInstance(token1?: string) {
  const token = token1 || cookies().get("aauth")?.value || "0";
  return axios.create({
    baseURL: NEXT_PUBLIC_BASE_API_URL,
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + token,
    },
  }) as customAxiosInstance<TRoute, { message: string; data: unknown }>;
}
