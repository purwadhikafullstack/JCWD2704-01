"use server";

import axiosInstance from "@/lib/serverAxiosInstance";
import { revalidatePath } from "next/cache";

type UpdateCartParams = {
  store_stock_id: string;
  quantity: number;
};

export const updateCart = async ({
  store_stock_id,
  quantity = 0,
}: UpdateCartParams) => {
  try {
    console.log(quantity);
    if (quantity === 0)
      await axiosInstance().delete("/cart", { data: { store_stock_id } });
    else
      await axiosInstance().post("/cart", {
        store_stock_id,
        quantity,
      });
  } catch (error) {
    throw error;
  }
  revalidatePath("/[userId]/cart", "page");
};
