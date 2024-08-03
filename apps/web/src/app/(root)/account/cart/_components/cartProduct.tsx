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
import { TCart } from "@/models/cart.model";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { NEXT_PUBLIC_BASE_API_URL } from "@/config/config";
import { calculateDiscount } from "@/utils/calculateDiscount";
import useAuthStore from "@/stores/auth.store";

export function CartProduct({ cartProduct }: { cartProduct: TCart }) {
  const { user } = useAuthStore((s) => s);
  const store_id = cartProduct.store_stock.store_id;
  const sp = useSearchParams();
  const [add, remove, list, nearestStore] = useCheckout((s) => [s.add, s.remove, s.list, s.origin]);
  const hide = sp.get("store_id") != "all" ? cartProduct.store_stock.store_id !== nearestStore : false;
  const ref = useRef<HTMLInputElement>(null);
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
        discount: cartProduct.store_stock.discount,
      });
    }
  };
  console.log(nearestStore);
  const checked = useMemo(() => Boolean(list.find((e) => e.store_stock_id == cartProduct.store_stock_id)), [list]);

  return (
    <Card
      className={cn(
        "relative flex w-full flex-col text-ellipsis border-2 bg-white p-2 shadow-lg sm:h-48 sm:flex-row",
        hide && "hidden",
        checked ? "border-green-500" : "border-transparent",
      )}
      onClick={checkHandler}
    >
      {cartProduct.store_stock.quantity < cartProduct.quantity && (
        <div
          className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center rounded-md bg-foreground/60"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-center font-bold text-white">Out of Stock</h1>
        </div>
      )}
      <CardContent className="flex flex-col-reverse gap-2 p-2 sm:h-full sm:flex-row">
        <div className="flex items-center justify-center px-2">
          <input
            type="checkbox"
            className="hidden sm:block"
            ref={ref}
            onClick={checkHandler}
            disabled={store_id !== nearestStore}
            checked={checked}
          />
        </div>
        <div className="relative m-auto aspect-square w-full overflow-hidden rounded-md sm:h-full sm:w-auto">
          <Image
            src={`${NEXT_PUBLIC_BASE_API_URL}/images/${cartProduct.store_stock.product.images?.name || ""}`}
            alt=""
            fill
            sizes="auto full"
          />
        </div>
      </CardContent>
      <CardContent className="flex w-full flex-col justify-between gap-2 p-2">
        <div>
          <div className="w-max">
            <Link
              href={`/product/${cartProduct.store_stock.product.product.name.toLowerCase().replaceAll(" ", "-")}?city_id=${user.addresses[0].city_id}`}
              className="*:font-2 *:mb-2 *:w-max"
            >
              <CardDescription className="mb-2 font-bold">{cartProduct.store_stock.product.product.name}</CardDescription>
              <CardDescription className="mb-2 font-bold">{cartProduct.store_stock.product.name}</CardDescription>
            </Link>
          </div>
          <CardDescription>
            <span className={`${cartProduct.store_stock.discount && "line-through"}`}>{toIDR(cartProduct.store_stock.unit_price)}</span>
            <span className={`${!cartProduct.store_stock.discount && "hidden"}`}>
              {toIDR(calculateDiscount(cartProduct.store_stock.unit_price, cartProduct.store_stock.discount))}
            </span>
          </CardDescription>
          <CardDescription>{cartProduct.store_stock.store.address.address}</CardDescription>
        </div>
        <InputQuantity
          disable={nearestStore !== cartProduct.store_stock.store_id}
          weight={cartProduct.store_stock.product.weight}
          unit_price={cartProduct.store_stock.unit_price}
          quantity={cartProduct.quantity}
          store_stock_id={cartProduct.store_stock_id}
          discount={cartProduct.store_stock.discount}
        />
      </CardContent>
    </Card>
  );
}

function InputQuantity({ quantity, store_stock_id, unit_price, weight, disable = false, discount = 0 }: InputQuantityProps) {
  const [add, remove] = useCheckout((s) => [s.add, s.remove]);
  const [isLoading, setLoading] = useState(false);
  const onClick = async (quantity: number) => {
    setLoading(true);
    await updateCart({ store_stock_id, quantity }).finally(() => setLoading(false));
    if (quantity < 1) remove(store_stock_id);
    else add({ store_stock_id, quantity, unit_price, weight, discount });
  };
  return (
    <div className="flex items-center justify-between gap-x-2">
      <div
        className="z-[10] flex h-[24px] items-center gap-x-2 self-end overflow-hidden rounded-xl border-2 border-green-500 sm:my-auto"
        onClick={async (e) => {
          e.stopPropagation();
        }}
      >
        <Button
          className="border-r-2 border-green-500 p-2 hover:bg-gray-200"
          disabled={isLoading || disable}
          onClick={async (e) => {
            e.stopPropagation();
            await onClick(quantity - 1);
          }}
        >
          {" "}
          -
        </Button>
        <h1>{quantity}</h1>
        <Button
          disabled={isLoading || disable}
          onClick={async (e) => {
            e.stopPropagation();
            await onClick(quantity + 1);
          }}
          className="border-l-2 border-green-500 p-2 hover:bg-gray-200"
        >
          +
        </Button>
      </div>
      <Button
        variant={"ghost"}
        onClick={async (e) => {
          e.stopPropagation();
          const con = confirm(`are you sure to remove this product from your cart`);
          if (con) {
            setLoading(true);
            await updateCart({ store_stock_id, quantity: 0 })
              .then(() => remove(store_stock_id))
              .finally(() => setLoading(false));
          }
        }}
      >
        <Trash2 />
      </Button>
    </div>
  );
}
