"use client";
import { TUser } from "@/models/user.model";
import StoreAdminEditForm from "./store-admin.edit.form";
import { fetchAllCitiesClient } from "@/utils/fetch/client/cities.client-fetch";
import { useEffect, useState } from "react";
import { TCity } from "@/models/address.model";
import AdminCRUDDialog from "./admin.crud.dialog";

type Props = { user: TUser };
export default function StoreAdminEdit({ user }: Props) {
  const [cities, setCities] = useState<TCity[]>([]);
  async function fillCities() {
    setCities([...(await fetchAllCitiesClient())]);
  }
  useEffect(() => {
    fillCities();
  }, []);
  return (
    <AdminCRUDDialog title="Store Admin Edit Profile" desc="Edit your store admin details with this form.">
      <StoreAdminEditForm user={user} cities={cities} />
    </AdminCRUDDialog>
  );
}
