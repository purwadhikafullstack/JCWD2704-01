"use client";
import { updateCart } from "@/actions/updateCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { toIDR } from "@/utils/toIDR";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

function Checkout() {
  return (
    <div className="sticky bottom-0 w-full bg-white px-2">
      <div className="flex w-full items-center justify-between *:py-4">
        <div>
          <h1>{`Total: ${toIDR(100000)}`}</h1>
        </div>
        <Button>
          <h1>Checkout</h1>
        </Button>
      </div>
    </div>
  );
}

export function CartProduct({ cartProduct }: any) {
  const ref = useRef<HTMLInputElement>(null);
  const checkHandler = () => {
    if (ref.current?.checked != undefined)
      ref.current.checked = !ref.current.checked;
  };
  return (
    <Card
      className={`flex h-[128px] w-full text-ellipsis border-2 bg-white p-2 shadow-lg`}
      onClick={checkHandler}
    >
      <div className="flex items-center px-2">
        <input type="checkbox" ref={ref} />
      </div>
      <div className="relative aspect-square h-full overflow-hidden rounded-md">
        <Image
          src={
            "https://th.bing.com/th/id/OIP.DZW-4Lg2TdHZVQYtuzJUUAHaE7?rs=1&pid=ImgDetMain"
          }
          alt=""
          fill
          sizes="100% 100%"
        />
      </div>
      <CardContent className="flex w-full flex-col justify-between gap-2 p-2">
        <div>
          <Link href={`/product/${cartProduct.store_stock.id}`}>
            <CardDescription className="mb-2 min-w-40 font-bold">
              {cartProduct.store_stock.product.product.name} |{" "}
              {cartProduct.store_stock.product.name}
            </CardDescription>
          </Link>
          <CardDescription>
            {toIDR(cartProduct.store_stock.unit_price)}
          </CardDescription>
        </div>
        <InputQuantity
          quantity={cartProduct.quantity}
          store_stock_id={"clyh1x6h80002cv7hm23up2mm"}
        />
      </CardContent>
    </Card>
  );
}

type InputQuantityProps = { store_stock_id: string; quantity: number };
function InputQuantity({ quantity, store_stock_id }: InputQuantityProps) {
  const [isLoading, setLoading] = useState(false);
  const onClick = async (quantity: number) => {
    setLoading(true);
    updateCart({ store_stock_id, quantity }).finally(() => setLoading(false));
  };
  return (
    <div
      className="flex items-center gap-x-2 self-end overflow-hidden rounded-xl border-2 border-green-500"
      onClick={async (e) => {
        e.stopPropagation();
      }}
    >
      <Button
        className="border-r-2 border-green-500 hover:bg-gray-200"
        disabled={isLoading}
        onClick={async () => await onClick(quantity - 1)}
      >
        -
      </Button>
      <h1>{quantity}</h1>
      <Button
        disabled={isLoading}
        onClick={() => onClick(quantity + 1)}
        className="border-l-2 border-green-500 hover:bg-gray-200"
      >
        +
      </Button>
    </div>
  );
}

export function InputSearch() {
  const router = useRouter();
  return (
    <input
      type="text"
      placeholder="search..."
      className="px-2"
      onKeyDown={(e) => {
        if (e.key === "Enter") router.push("?s=" + e.currentTarget.value);
      }}
    />
  );
}
