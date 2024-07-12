"use client";
import Image from "next/image";
import Link from "next/link";

type Props = {};
export default function AdminNavLinks({}: Props) {
  return (
    <>
      <Link
        href="#"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Image
          src={"/logo/Farm2Door-logo.png"}
          width={403}
          height={99}
          alt="Farm2Door logo"
          className="w-40 min-w-36"
        />
      </Link>
      <Link
        href="#"
        className="text-foreground transition-colors hover:text-foreground"
      >
        Users
      </Link>
      <Link
        href="#"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Products
      </Link>
      <Link
        href="#"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Inventory
      </Link>
      <Link
        href="#"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Orders
      </Link>
      <Link
        href="#"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Analytics
      </Link>
    </>
  );
}
