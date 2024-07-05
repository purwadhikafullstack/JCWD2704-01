"use client";
import { toIDR } from "@/utils/toIDR";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function CartProductCardSuccess({ product }: { product: any }) {
  const checkbox = useRef<HTMLInputElement | null>(null);
  function recheck() {
    if (checkbox.current) checkbox.current.checked = !checkbox.current.checked;
  }
  return (
    <div
      className="card flex h-36 w-full justify-between rounded-md border-2 border-green-600 bg-white px-2 sm:h-48 md:h-56 md:px-4 lg:h-64"
      onClick={recheck}
    >
      <div className="flex w-full items-center text-ellipsis">
        <input ref={checkbox} className="hidden" type="checkbox" />
        <div className="relative flex aspect-square h-[80%] items-center">
          <Image
            src={product?.image?.name}
            alt={product?.image?.name}
            fill
            sizes="full"
          />
        </div>
        <div className="flex h-full w-full flex-col overflow-hidden rounded-lg p-4 text-xs md:text-base">
          <Link href={"/products"} className="font-bold">
            Nama Barang yang agak panjang
          </Link>
          <h2 className="font-bold">
            {/* {toIDR(product?.products?.unit_price - product?.products?.discount)} */}
            {toIDR(product?.products?.unit_price)}
          </h2>
          <h2 className="font-light">{toIDR(product?.products?.unit_price)}</h2>
          <div className="flex h-full items-end self-end">
            <div className="flex justify-center text-center">
              <button className="aspect-square rounded-full border-2 border-black">
                -
              </button>
              <div className="flex aspect-square items-center px-2">
                <h1>1</h1>
              </div>
              <button className="aspect-square rounded-full border-2 border-black p-0">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartProductCardError({ product_id }: { product_id: string }) {
  return (
    <div className="card flex h-36 w-full items-center justify-between rounded-md border-2 border-green-600 bg-white px-2 text-center sm:h-48 md:h-56 md:px-4 lg:h-64">
      <h1 className="w-full">Something went wrong</h1>
      <button></button>
    </div>
  );
}
