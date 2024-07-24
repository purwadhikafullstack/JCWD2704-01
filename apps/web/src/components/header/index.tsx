"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { HeaderPlaces } from "./HeaderPlaces";
import useAuth from "@/stores/auth.store";

export const Header = () => {
  const pathname = usePathname();
  const userId = useAuth((s) => s.user.id);
  const router = useRouter();
  if (!pathname.startsWith("/account"))
    return (
      <header className="fixed left-0 top-0 z-50 h-[6.5rem] w-full mix-blend-difference">
        <div className="mx-auto flex size-full max-w-screen-xl items-center justify-between px-4 text-background">
          <HeaderPlaces />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              router.push(`/cart`);
            }}
            disabled={!Boolean(userId)}
          >
            <span>Cart</span>
          </Button>
        </div>
      </header>
    );

  return null;
};
