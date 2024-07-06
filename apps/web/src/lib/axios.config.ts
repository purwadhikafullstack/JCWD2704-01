import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

export function axiosInstance(): AxiosInstance {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${getCookie("access_token")}`,
    },
  });
}
