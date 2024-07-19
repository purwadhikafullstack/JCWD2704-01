"use client";
import { axiosInstanceCSR } from "@/lib/axios.client-config";
import { OrderStatus } from "@/models/order.model";
import { z } from "zod";

interface IUpdateOrderStatus {
  inv: string;
  status: Exclude<OrderStatus, "wait_for_payment"> | File;
}

const paymentProofSchema = z
  .instanceof(Blob)
  .refine((file) => file?.type.startsWith("image/"))
  .refine((file) => (file?.size ? file.size < 1024 : true));

export async function updateOrderStatus({ inv, status }: IUpdateOrderStatus) {
  if (status instanceof File) {
    const img = paymentProofSchema.parse(status);
    return await axiosInstanceCSR().patch(`/${inv}/v1`, { img });
  }
  const v = () => {
    switch (status) {
      case "canceled":
        return "v2";
      case "process":
        return "v3";
      case "sending":
        return "v4";
      case "sended":
        return "v5";
    }
  };
  return await axiosInstanceCSR().patch(`/order/${inv}/${v()}`, { status });
}
