"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";
import useAuthStore from "@/stores/auth.store";
import { Role } from "@/models/user.model";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

type Props = {};
export default function AdminMenu({}: Props) {
  const { user, logout } = useAuthStore((s) => s);
  const router = useRouter();
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex h-full flex-col-reverse gap-5 sm:flex-row sm:gap-2 sm:self-end">
        <Button
          type="button"
          className="flex items-center bg-destructive text-white hover:bg-red-400"
          onClick={() => {
            logout();
            if (!getCookie("access_token")) router.push("/dashboard/admin/login");
          }}
        >
          <LogOut /> Logout
        </Button>
        <Separator orientation="vertical" className="hidden h-10 sm:block" />
        <div className="text-xs leading-[12px] sm:text-right">
          <p>
            Welcome, <span className="font-bold">{user.role === Role.super_admin ? "Super Admin" : "Store Admin"}</span>
          </p>
          <p>{user.full_name}</p>
          <p className="font-bold">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
