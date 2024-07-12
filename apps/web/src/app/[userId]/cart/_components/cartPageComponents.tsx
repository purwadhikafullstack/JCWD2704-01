"use client";
import { updateCart } from "@/actions/updateCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import useDebounce from "@/hooks/debounce";
import { useCheckout } from "@/lib/store/checkout";
import { toIDR } from "@/utils/toIDR";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { InputQuantityProps } from "../_model/props";

export function Checkout() {
  const total = useCheckout((s) => {
    const list = s.list;
    return s.listTotal(list);
  });

  const [modal, setModal] = useState(false);
  const CheckoutModal = dynamic(() => import("./checkoutModal"));
  const Modal = dynamic(() => import("@/components/Modal"));
  return (
    <>
      <div className="sticky bottom-0 w-full bg-white px-2">
        <div className="flex w-full items-center justify-between *:py-4">
          <div>
            <h1>{`Total: ${toIDR(total)}`}</h1>
          </div>
          <Button onClick={() => setModal(true)}>
            <h1>Checkout</h1>
          </Button>
        </div>
      </div>
      {modal && (
        <Modal isOpen={modal} onClose={() => setModal(false)}>
          <CheckoutModal />
        </Modal>
      )}
    </>
  );
}

export function CartProduct({ cartProduct }: { cartProduct: Cart }) {
  const ref = useRef<HTMLInputElement>(null);
  const store_id = cartProduct.store_stock.store_id;
  const [add, remove] = useCheckout((s) => [s.add, s.remove]);
  const checkHandler = () => {
    if (ref.current?.checked != undefined) {
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
      ref.current.checked = !ref.current.checked;
    }
  };
  return (
    <Card
      className={`relative flex h-[128px] w-full text-ellipsis border-2 bg-white p-2 shadow-lg`}
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
      <div className="flex items-center px-2">
        <input type="checkbox" ref={ref} onClick={checkHandler} />
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
          weight={cartProduct.store_stock.product.weight}
          unit_price={cartProduct.store_stock.unit_price}
          quantity={cartProduct.quantity}
          store_stock_id={cartProduct.store_stock_id}
        />
      </CardContent>
    </Card>
  );
}

function InputQuantity({
  quantity,
  store_stock_id,
  unit_price,
  weight,
}: InputQuantityProps) {
  const [add, remove] = useCheckout((s) => [s.add, s.remove]);
  const [isLoading, setLoading] = useState(false);
  const onClick = async (quantity: number) => {
    setLoading(true);
    await updateCart({ store_stock_id, quantity }).finally(() =>
      setLoading(false),
    );
    if (quantity < 1) remove(store_stock_id);
    else add({ store_stock_id, quantity, unit_price, weight });
  };
  return (
    <div
      className="z-20 flex items-center gap-x-2 self-end overflow-hidden rounded-xl border-2 border-green-500"
      onClick={async (e) => {
        e.stopPropagation();
      }}
    >
      <Button
        className="border-r-2 border-green-500 hover:bg-gray-200"
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
        className="border-l-2 border-green-500 hover:bg-gray-200"
      >
        +
      </Button>
    </div>
  );
}

export function InputSearch() {
  const router = useRouter();
  const sp = useSearchParams();
  const [searchParams, setSearchParams] = useState(new URLSearchParams(sp));

  const push = () => {
    router.push(`?${searchParams.toString()}`);
  };
  useDebounce(push, { delay: 300, triggerValues: [searchParams] });

  const setParams = (cb: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams);
    cb(params);
    setSearchParams(params);
  };
  return (
    <>
      <input
        type="text"
        placeholder="search..."
        className="px-2"
        defaultValue={sp.get("s") || ""}
        onChange={(e) => {
          setParams((p) => {
            p.delete("s");
            p.append("s", e.target.value);
          });
        }}
      />
      <div className="mx-2 flex gap-x-2">
        <label htmlFor="store">All Store</label>
        <input
          id="store"
          name="store"
          type="checkbox"
          defaultChecked={Boolean(sp.get("store"))}
          onChange={(e) => {
            setParams((p) => {
              if (e.target.checked) p.append("store", "all");
              else p.delete("store");
            });
          }}
        />
      </div>
    </>
  );
}
