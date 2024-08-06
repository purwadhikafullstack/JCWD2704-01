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
import { Minus, Plus, Trash2 } from "lucide-react";
import { NEXT_PUBLIC_BASE_API_URL } from "@/config/config";
import { calculateDiscount } from "@/utils/calculateDiscount";
import useAuthStore from "@/stores/auth.store";
import { Checkbox } from "@/components/ui/checkbox";
import { imageUrl } from "@/utils/imageUrl";

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

  console.log(cartProduct.store_stock.store_id);
  console.log(nearestStore);
  const checked = useMemo(() => Boolean(list.find((e) => e.store_stock_id == cartProduct.store_stock_id)), [list]);

  return (
    <Card
      className={cn(
        "relative flex w-full flex-col text-ellipsis border bg-white p-4 shadow-none md:flex-row",
        hide && "hidden",
        checked ? "border-green-500" : "",
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

      <div className="flex w-full gap-2 md:gap-4">
        <CardContent
          id={cartProduct.store_stock.product.product.name.toLowerCase().replaceAll(" ", "-") + "-" + cartProduct.store_stock_id}
          className="p-0"
        >
          <div className="flex gap-2 md:gap-4">
            <input
              type="checkbox"
              className="hidden"
              ref={ref}
              onClick={checkHandler}
              disabled={store_id !== nearestStore}
              checked={checked}
            />
            <Checkbox checked={checked} className="size-6" />
            <div className="relative size-14 overflow-hidden rounded-md border md:size-24">
              <Image
                src={imageUrl.render(cartProduct.store_stock.product.images?.name)}
                alt={cartProduct.store_stock.product.name}
                fill
                sizes="25vw"
                className="size-auto object-contain"
              />
            </div>
          </div>
        </CardContent>

        <CardContent className="flex w-full flex-col justify-between gap-0 p-0">
          <div className="flex flex-col md:gap-2 md:pb-4">
            <Link
              href={`/product/${cartProduct.store_stock.product.product.name.toLowerCase().replaceAll(" ", "-")}?city_id=${user.addresses[0].city_id}`}
              className="w-fit"
            >
              <CardDescription className="flex justify-between p-0 text-lg font-medium text-foreground">
                <span className="block">{cartProduct.store_stock.product.product.name}</span>
              </CardDescription>
              <CardDescription className="p-0 text-base">{cartProduct.store_stock.product.name}</CardDescription>
            </Link>
            <CardDescription className="relative text-xs">
              <span className={`block ${!cartProduct.store_stock.discount && "hidden"}`}>
                {toIDR(calculateDiscount(cartProduct.store_stock.unit_price, cartProduct.store_stock.discount))}
              </span>
              <span className={`absolute -bottom-full block ${cartProduct.store_stock.discount && "line-through"}`}>
                {toIDR(cartProduct.store_stock.unit_price)}
              </span>
            </CardDescription>
          </div>
        </CardContent>

        <InputQuantity
          disable={nearestStore !== cartProduct.store_stock.store_id}
          weight={cartProduct.store_stock.product.weight}
          unit_price={cartProduct.store_stock.unit_price}
          quantity={cartProduct.quantity}
          store_stock_id={cartProduct.store_stock_id}
          discount={cartProduct.store_stock.discount}
        />
      </div>
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
    <div className="flex h-full flex-col items-end justify-between">
      <Button
        variant={"ghost"}
        size="sm"
        className="text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
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
        <Trash2 className="size-5 shrink-0" />
      </Button>

      <div
        className="z-[10] flex items-center gap-1"
        onClick={async (e) => {
          e.stopPropagation();
        }}
      >
        <button
          className="flex aspect-square size-5 items-center justify-center rounded-md border border-primary text-primary transition-colors duration-100 hover:bg-primary hover:text-primary-foreground"
          disabled={isLoading || disable}
          onClick={async (e) => {
            e.stopPropagation();
            await onClick(quantity - 1);
          }}
        >
          <Minus className="size-5" />
        </button>
        <span className="flex size-5 select-none items-center justify-center tabular-nums">
          <span className="block leading-none tracking-tighter">{quantity}</span>
        </span>
        <button
          className="flex aspect-square size-5 items-center justify-center rounded-md border border-primary text-primary transition-colors duration-100 hover:bg-primary hover:text-primary-foreground"
          disabled={isLoading || disable}
          onClick={async (e) => {
            e.stopPropagation();
            await onClick(quantity + 1);
          }}
        >
          <Plus className="size-5" />
        </button>
      </div>
    </div>
  );
}
