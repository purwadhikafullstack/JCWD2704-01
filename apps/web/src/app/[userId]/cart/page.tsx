import axiosInstance from "@/lib/serverAxiosInstance";
import { Suspense } from "react";
import {
  CartProduct,
  Checkout,
  InputSearch,
} from "./_components/cartPageComponents";

export default function Page({
  searchParams,
}: {
  searchParams: { s?: string; store?: "all" };
}) {
  return (
    <main className="min-h-screen w-full bg-[#eaeaea]">
      <section className="flex justify-center p-2">
        <InputSearch />
      </section>
      <section className="flex min-h-screen w-full flex-col gap-y-2 px-4 py-2">
        <ul className="flex flex-col gap-y-4">
          <Suspense fallback={<h1>Loading...</h1>}>
            <CartList
              search={searchParams.s || ""}
              store={searchParams?.store}
            />
          </Suspense>
        </ul>
      </section>
      <Checkout />
    </main>
  );
}

async function CartList({ search, store }: { search: string; store?: "all" }) {
  const fetchCart = (await axiosInstance().get("/cart", {
    data: { search, store_id: store ? undefined : undefined },
  })) as Cart[];
  return (
    <>
      {fetchCart?.map((e, i) => (
        <li key={i}>
          <CartProduct cartProduct={e} />
        </li>
      ))}
    </>
  );
}
