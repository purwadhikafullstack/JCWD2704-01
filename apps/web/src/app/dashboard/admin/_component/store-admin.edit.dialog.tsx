"use client";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TUser } from "@/models/user.model";
import StoreAdminEditForm from "./store-admin.edit.form";
import { fetchAllCities } from "@/utils/fetch/cities.fetch";
import { useEffect, useState } from "react";
import { TCity } from "@/models/address.model";

type Props = { user: TUser };
export default function StoreAdminEdit({ user }: Props) {
  const [cities, setCities] = useState<TCity[]>([]);
  async function fillCities() {
    setCities([...(await fetchAllCities())]);
  }
  useEffect(() => {
    fillCities();
  }, []);
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Store Admin Profile</DialogTitle>
        <DialogDescription>
          Make changes to store admin's profile here. Click save when you're
          done.
        </DialogDescription>
      </DialogHeader>
      <div className="max-h-[480px] overflow-y-scroll rounded-md border-2 p-3">
        <StoreAdminEditForm user={user} cities={cities} />
      </div>
    </DialogContent>
  );
}
