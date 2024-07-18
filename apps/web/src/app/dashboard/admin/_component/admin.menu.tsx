"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { UserPlus2, LogOut } from "lucide-react";
import AdminCRUDDialog from "./admin.crud.dialog";
import StoreAdminCreateForm from "./store-admin.create.form";
import { TCity } from "@/models/address.model";
import useAuthStore from "@/stores/auth.store";
import { Role } from "@/models/user.model";
import { useEffect, useState } from "react";
import { fetchAllCities } from "@/utils/fetch/cities.fetch";

type Props = {};
export default function AdminMenu({}: Props) {
  const { user, logout } = useAuthStore((s) => s);
  const [cities, setCities] = useState<TCity[]>([]);
  async function fillCities() {
    setCities([...(await fetchAllCities())]);
  }
  useEffect(() => {
    fillCities();
  }, []);
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex h-full flex-col gap-2 sm:flex-row sm:self-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="flex items-center bg-primary text-white hover:bg-green-500"
            >
              <UserPlus2 /> Add Store Admin
            </Button>
          </DialogTrigger>
          <AdminCRUDDialog
            title="Add New Store Admin"
            desc="Use this form to add new store admin."
          >
            <StoreAdminCreateForm cities={cities} />
          </AdminCRUDDialog>
        </Dialog>
        <Button
          type="button"
          className="flex items-center bg-destructive text-white hover:bg-red-400"
          onClick={() => logout()}
        >
          <LogOut /> Logout
        </Button>
        <Separator orientation="vertical" className="hidden h-10 sm:block" />
        <div className="text-xs leading-[12px] sm:text-right">
          <p>
            Welcome,{" "}
            <span className="font-bold">
              {user.role === Role.super_admin ? "Super Admin" : "Store Admin"}
            </span>
          </p>
          <p>{user.full_name}</p>
          <p className="font-bold">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
