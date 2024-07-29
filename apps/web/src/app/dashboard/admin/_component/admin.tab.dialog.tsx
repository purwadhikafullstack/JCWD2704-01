"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import useAuthStore from "@/stores/auth.store";
import { Role } from "@/models/user.model";
import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; btnLabel: string };
export default function AdminTabDialog({ children, btnLabel }: Props) {
  const { user: admin } = useAuthStore((s) => s);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(admin.role === Role.store_admin ? "hidden" : "flex", "items-center gap-1 text-white")}>
          <PlusCircle />
          {btnLabel}
        </Button>
      </DialogTrigger>
      {children}
    </Dialog>
  );
}
