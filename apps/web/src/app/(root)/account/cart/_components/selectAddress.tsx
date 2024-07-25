"use client";
import FillterSelect from "@/components/fillter/fillterSelect";
import { Label } from "@/components/ui/label";
import { axiosInstanceCSR } from "@/lib/axios.client-config";
import { TAddress } from "@/models/address.model";
import useAuthStore from "@/stores/auth.store";
import { useCheckout } from "@/stores/checkout";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CheckoutAddressOption() {
  const { user } = useAuthStore();
  const [address, setAddress] = useState<TAddress[]>([]);
  const sp = useSearchParams();
  const [destination, setDestination, setOrigin] = useCheckout((s) => [s.destination, s.setDestination, s.setOrigin]);
  const a = Number(sp.get("address")) || 0;

  useEffect(() => {
    // const fetchAddress = async () => (await axiosInstanceCSR().get("/addresses/user/" + userId)).data.data as any[];
    // fetchAddress().then((r) => {
    //   if (!r) return;
    // });

    if (user.addresses.length) {
      setAddress(user.addresses);
      setDestination(user.addresses[0].id!);
    }
  }, [sp, user]);

  useEffect(() => {
    if (!destination) return;
    axiosInstanceCSR()
      .get("/store/nearest", { params: { address_id: destination } })
      .then((r) => {
        setOrigin(r.data.data.lenght ? r.data.data[0].id : "");
      });
  }, [destination]);

  return (
    <Label htmlFor="address" className="flex flex-col gap-4">
      <p>Select Address</p>
      <FillterSelect queryKey="address" name="address" className="w-full rounded-md border px-4 py-2" value={destination}>
        {address.map((e, i) => (
          <option value={i} className="rounded-md px-4 py-2 shadow-md">
            {e.address}
          </option>
        ))}
      </FillterSelect>
    </Label>
  );
}
