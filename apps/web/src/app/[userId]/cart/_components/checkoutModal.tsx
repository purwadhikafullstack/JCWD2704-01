"use client";

import axiosInstance from "@/lib/clientAxiosInstance";
import { useCheckout } from "@/lib/store/checkout";
import { toIDR } from "@/utils/toIDR";
import { useEffect, useState } from "react";

export default function CheckoutModal() {
  const { listTotal, shipCost } = useCheckout((s) => {
    const list = s.list;
    const listTotal = s.listTotal(list);
    const shipCost = s.shipCost;
    return { listTotal, shipCost };
  });

  const [courier, setCourier] = useState("jne");
  const [services, setServices] = useState();
  const fetchServices = async () =>
    await axiosInstance().get("/order/shipcost");
  useEffect(() => {}, [courier]);
  return (
    <div className="">
      <h1>Products Total: {toIDR(listTotal)}</h1>
      <div className="w-full">
        <select name="courier" className="w-full">
          <option value="jne">JNE</option>
          <option value="tiki">TIKI</option>
          <option value="pos">POS</option>
        </select>
      </div>
      <h1>Shipping Cost: {toIDR(shipCost)}</h1>
    </div>
  );
}
