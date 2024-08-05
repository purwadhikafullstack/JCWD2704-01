"use server";
import { cookiesOpt } from "@/config/config";
import { axiosInstanceSSR } from "@/lib/axios.server-config";
import { AxiosError, AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type UpdateCartParams = {
  store_stock_id: string;
  quantity: number;
};

export const updateCart = async ({ store_stock_id, quantity = 0 }: UpdateCartParams) => {
  try {
    let res: AxiosResponse;
    if (quantity === 0) res = await axiosInstanceSSR().delete("/cart", { data: { store_stock_id } });
    else
      res = await axiosInstanceSSR().post("/cart", {
        store_stock_id,
        quantity,
      });
    const acc = res.data.cookie;
    cookies().set("access_token", acc, cookiesOpt);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
    throw error;
  }
  revalidatePath("/[userId]/cart", "page");
  revalidatePath("/product/[name]", "page");
};
