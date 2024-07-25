"use client";
import FillterSelect from "@/components/fillter/fillterSelect";
import { Label } from "@/components/ui/label";
import { axiosInstanceCSR } from "@/lib/axios.client-config";
import useAuthStore from "@/stores/auth.store";
import { useCheckout } from "@/stores/checkout";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CheckoutAddressOption() {
  const userId = useAuthStore((s) => s.user.id);
  const [address, setAddress] = useState<any[]>([]);
  const sp = useSearchParams();
  const [destination, setDestination, setOrigin] = useCheckout((s) => [s.destination, s.setDestination, s.setOrigin]);
  const a = Number(sp.get("address")) || 0;

  useEffect(() => {
    if (!userId) return;
    const fetchAddress = async () => (await axiosInstanceCSR().get("/addresses/user/" + userId)).data.data as any[];
    fetchAddress().then((r) => {
      setAddress(r);
      setDestination(r[a].id);
    });
  }, [sp, userId]);

  useEffect(() => {
    if (!destination) return;
    axiosInstanceCSR()
      .get("/store/nearest", { params: { address_id: destination } })
      .then((r) => setOrigin(r.data.data[0].id));
  }, [destination]);

  return (
    <Label htmlFor="address" className="flex flex-col">
      <p>Select Address</p>
      <FillterSelect queryKey="address" name="address" className="w-full" value={destination}>
        {address.map((e, i) => (
          <option value={i}>{e.address}</option>
        ))}
      </FillterSelect>
    </Label>
  );
}
