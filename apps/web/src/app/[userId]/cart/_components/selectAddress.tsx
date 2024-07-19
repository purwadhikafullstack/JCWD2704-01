"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/auth.store";
import { axiosInstanceCSR } from "@/lib/axios.client-config";

export function SelectAddress() {
  const sp = useSearchParams();
  const router = useRouter();
  const push = (k: string, v: string) => {
    const searchParams = new URLSearchParams(sp);
    searchParams.delete(k);
    searchParams.append(k, v);
    router.push(searchParams.toString());
  };
  const user = useAuthStore((s) => s.user);
  const [address, setAddress] = useState<typeof user.addresses>([]);
  useEffect(() => {
    const fetchAddress = async () => {
      if (!user.id) return;
      const res = await axiosInstanceCSR().get("/address/" + user.id);
      setAddress(res.data.data);
    };
    fetchAddress().catch((e) => {
      alert("fail fetch address");
    });
  }, [user]);
  return (
    <section>
      <label htmlFor="address">Address:</label>
      <select
        name="address"
        defaultValue={sp.get("address") || ""}
        onChange={(e) => {
          push("address", e.target.value);
        }}
      >
        <option value={""}>None</option>
        {address?.map((e, i) => <option value={e.id}>{e.address}</option>)}
      </select>
    </section>
  );
}
