import axiosInstance from "@/lib/serverAxiosInstance";
import { Suspense } from "react";
import { CartProduct, InputSearch } from "./_components/cartPageComponents";
import { json } from "stream/consumers";

export default function Page({
  searchParams,
}: {
  searchParams: { s?: string };
}) {
  return (
    <main className="min-h-screen w-full bg-[#eaeaea]">
      <section className="flex justify-center p-2">
        <InputSearch />
      </section>
      <section className="flex min-h-screen w-full flex-col gap-y-2 px-4 py-2">
        <ul className="flex flex-col gap-y-4">
          <Suspense fallback={<h1>Loading...</h1>}>
            <CartList search={searchParams.s || ""} />
          </Suspense>
        </ul>
      </section>
    </main>
  );
}

async function CartList({ search }: { search: string }) {
  const fetchCart = (await axiosInstance().get("/cart", {
    data: { search },
  })) as any[];
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
