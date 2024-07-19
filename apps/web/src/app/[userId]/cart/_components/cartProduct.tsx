"use client";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { updateCart } from "@/actions/updateCart";
import { useCheckout } from "@/stores/checkout";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { InputQuantityProps } from "../_model/props";
import { toIDR } from "@/utils/toIDR";
import { Button } from "@/components/ui/button";

export function CartProduct({ cartProduct }: { cartProduct: Cart }) {
  const store_id = cartProduct.store_stock.store_id;
  const sp = useSearchParams();
  const nearestStore = "clynyglqz0000rynxmx7t4ex8";
  const hide = sp.get("store_id") != "all" ? cartProduct.store_stock.store_id !== nearestStore : false;

  const ref = useRef<HTMLInputElement>(null);
  const [add, remove, list] = useCheckout((s) => [s.add, s.remove, s.list]);
  const checkHandler = () => {
    if (store_id !== nearestStore) return;
    if (!ref.current) return;
    if (ref.current.checked == true) {
      remove(cartProduct.store_stock_id);
    } else {
      add({
        store_stock_id: cartProduct.store_stock_id,
        quantity: cartProduct.quantity,
        unit_price: cartProduct.store_stock.unit_price,
        weight: cartProduct.store_stock.product.weight,
      });
    }
  };
  const checked = useMemo(() => Boolean(list.find((e) => e.store_stock_id == cartProduct.store_stock_id)), [list]);
  console.log(hide);
  return (
    <Card
      className={`relative flex w-full flex-col text-ellipsis border-2 bg-white p-2 shadow-lg sm:h-48 sm:flex-row ${hide ? "hidden" : ""}`}
      onClick={checkHandler}
    >
      {cartProduct.store_stock.quantity < cartProduct.quantity && (
        <div
          className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.60)]"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-center font-bold text-white">Out of Stock</h1>
        </div>
      )}
      <CardContent id="OHIO" className="flex flex-col-reverse gap-2 p-2 sm:h-full sm:flex-row">
        <div className="flex items-center justify-center px-2">
          <input type="checkbox" ref={ref} onClick={checkHandler} disabled={store_id !== nearestStore} checked={checked} />
        </div>
        <div className="relative m-auto aspect-square w-full overflow-hidden rounded-md sm:h-full sm:w-auto">
          <Image src={"https://th.bing.com/th/id/OIP.DZW-4Lg2TdHZVQYtuzJUUAHaE7?rs=1&pid=ImgDetMain"} alt="" fill sizes="auto full" />
        </div>
      </CardContent>
      <CardContent className="flex w-full flex-col justify-between gap-2 p-2">
        <div>
          <Link href={`/product/${cartProduct.store_stock.id}`}>
            <CardDescription className="mb-2 min-w-40 font-bold">
              {cartProduct.store_stock.product.product.name} | {cartProduct.store_stock.product.name}
            </CardDescription>
          </Link>
          <CardDescription>{toIDR(cartProduct.store_stock.unit_price)}</CardDescription>
        </div>
        <InputQuantity
          weight={cartProduct.store_stock.product.weight}
          unit_price={cartProduct.store_stock.unit_price}
          quantity={cartProduct.quantity}
          store_stock_id={cartProduct.store_stock_id}
        />
      </CardContent>
    </Card>
  );
}

function InputQuantity({ quantity, store_stock_id, unit_price, weight }: InputQuantityProps) {
  const [add, remove] = useCheckout((s) => [s.add, s.remove]);
  const [isLoading, setLoading] = useState(false);
  const onClick = async (quantity: number) => {
    setLoading(true);
    await updateCart({ store_stock_id, quantity }).finally(() => setLoading(false));
    if (quantity < 1) remove(store_stock_id);
    else add({ store_stock_id, quantity, unit_price, weight });
  };
  return (
    <div
      className="z-[10] flex h-[24px] items-center gap-x-2 self-end overflow-hidden rounded-xl border-2 border-green-500"
      onClick={async (e) => {
        e.stopPropagation();
      }}
    >
      <Button
        className="border-r-2 border-green-500 p-2 hover:bg-gray-200"
        disabled={isLoading}
        onClick={async () => {
          await onClick(quantity - 1);
        }}
      >
        -
      </Button>
      <h1>{quantity}</h1>
      <Button
        disabled={isLoading}
        onClick={async () => await onClick(quantity + 1)}
        className="border-l-2 border-green-500 p-2 hover:bg-gray-200"
      >
        +
      </Button>
    </div>
  );
}
