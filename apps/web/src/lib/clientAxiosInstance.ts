"use client";
import axios from "axios";
import { customAxiosInstance } from "@/models/customAxiosInstance.model";
import { NEXT_PUBLIC_BASE_API_URL } from "@/config/config";

interface IRoute {
  cart: "/cart" | `/cart/${string}`;
  user: "/user" | `/user/${string}`;
  product: "/product" | `/product/${string}`;
  order: "/order" | `/order/${string}`;
  branch: "/branch" | `/branch/${string}`;
  transaction: "/transaction" | `/transaction/${string}`;
  rating: "/rating" | `/rating/${string}`;
}

export type TRoute = IRoute[keyof IRoute];

export default function axiosInstance(token1?: string) {
  const token = token1 || "client";
  return axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + token,
    },
  }) as customAxiosInstance<TRoute, { message: string; data: unknown }>;
}
