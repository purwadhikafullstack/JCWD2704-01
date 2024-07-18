"use client";
import { axiosInstanceCSR } from "@/lib/axios.client-config";
import { TRajaOngkirCostResponse } from "@/models/rajaOngkirCost.model";
import { useCheckout } from "@/stores/checkout";
import useAuthStore from "@/stores/auth.store";
import { toIDR } from "@/utils/toIDR";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CheckoutModal() {
  const { listTotal, shipCost, weight } = useCheckout((s) => {
    const list = s.list;
    const listTotal = s.listTotal(list);
    const shipCost = s.shipCost;
    const weight = s.weight(list);
    return { listTotal, shipCost, weight };
  });
  const nStoreId = useAuthStore((s)=>s.nearestStoreId)
  const [courier, setCourier] = useState("jne");
  const [services, setServices] = useState<TRajaOngkirCostResponse["rajaongkir"]["results"]>();
  const [userAddresses,setUserAddresses] = useState<any[]>([])
  const fetchUserAddress = async ()=>{
    try {
      const userAddresses = (await axiosInstanceCSR().get("/user/addresses")).data.data
      setUserAddresses(userAddresses);
    } catch (error) {}
  }
  const fetchServices = async () =>{
    if(userAddresses.length<1)return;
    const services = (await axiosInstanceCSR().get("/order/shipcost",{params:{
      weight,
      origin:nStoreId,
      destination: userAddresses[0].id,
      courier,
    }})).data.data as TRajaOngkirCostResponse;
    setServices(services.rajaongkir.results)
  }
  useEffect(()=>{fetchUserAddress(),[]})
  useEffect(() => {fetchServices()}, [userAddresses,courier,weight,nStoreId]);
  return (
    <div className="w-full">
    <div className="w-full">
      <div className="flex justify-between">
      <h1>Products Total: </h1>
      <h1>{toIDR(listTotal)}</h1>
      </div>
      
      <div className="flex justify-between">
      <h1>Products weight:</h1>
      <h1>{weight + " gram"}</h1>
      </div>

      {userAddresses.length>0&&<select
        name="destination"
        className="w-full"
        defaultValue={services?.[0].name}
        >
          
      </select>}

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

      {services&&<select
        name="service"
        className="w-full"
        defaultValue={services?.[0].name}
        >
          {services[0].costs.map((e,i)=><option key={i} value={e.service}><p className="semi-bold">{e.service}</p><p>{toIDR(e.cost[0].value)}</p></option>)}
      </select>}

    </div>
      <h1>Shipping Cost: {toIDR(shipCost)}</h1>
      <div className="flex w-full item-center flex-col justify-center my-2 gap-y-2">
      <h1 className="text-center font-semibold">Total Cost: {toIDR(shipCost+listTotal)}</h1>
      <Button className="m-auto">Checkout</Button>
      </div>
    </div>
  );
}
