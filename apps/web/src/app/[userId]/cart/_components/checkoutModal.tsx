"use client";

import axiosInstance from "@/lib/clientAxiosInstance";
import { useCheckout } from "@/lib/store/checkout";
import { toIDR } from "@/utils/toIDR";
import { useEffect, useState } from "react";

export default function CheckoutModal() {
  const { listTotal, shipCost, weight } = useCheckout((s) => {
    const list = s.list;
    const listTotal = s.listTotal(list);
    const shipCost = s.shipCost;
    const weight = s.weight(list);
    return { listTotal, shipCost, weight };
  });

  const [courier, setCourier] = useState("jne");
  const [services, setServices] = useState();
  const fetchServices = async () =>
    await axiosInstance().get("/order/shipcost");
  useEffect(() => {}, [courier]);
  return (
    <div className="grid grid-cols-2 gap-x-2">
      <h1>Products Total: </h1>
      <h1>{toIDR(listTotal)}</h1>
      <h1>Products weight: </h1>
      <h1>{weight + " gram"}</h1>

      <select
        name="courier"
        className="w-full"
        value={courier}
        onChange={(e) => setCourier(e.target.value)}
      >
        <option value="jne">JNE</option>
        <option value="tiki">TIKI</option>
        <option value="pos">POS</option>
      </select>

      <h1>Shipping Cost: {toIDR(shipCost)}</h1>
    </div>
  );
}
