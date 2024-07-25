"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { HeaderPlaces } from "./HeaderPlaces";

export const Header = () => {
  const pathname = usePathname();

  if (!pathname.startsWith("/account"))
    return (
      <header className="sticky top-0 z-50 h-[6.5rem] w-full border-b border-zinc-300 bg-white">
        <div className="mx-auto flex size-full max-w-screen-xl items-center justify-between px-4 text-black">
          <HeaderPlaces />

          <Button variant="ghost" size="sm">
            <span>Cart</span>
          </Button>
        </div>
      </header>
    );

  return null;
};
