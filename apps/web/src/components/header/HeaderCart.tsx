"use client";

import { ShoppingCart } from "lucide-react";

import useAuthStore from "@/stores/auth.store";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const HeaderCart = ({ className }: { className?: string }) => {
  const { user } = useAuthStore();

  return (
    <Button variant="ghost" size="sm" className={cn("relative", className)}>
      <ShoppingCart className="size-6" />
      <span className="absolute right-0.5 top-0.5 flex size-[20px] items-center justify-center rounded-full bg-primary">
        <span className="block size-fit text-center text-[12px] leading-none text-primary-foreground">{user.cart?.length || 0}</span>
      </span>
    </Button>
  );
};
