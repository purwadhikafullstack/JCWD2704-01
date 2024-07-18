import { Suspense } from "react";
import { SelectAddress } from "./_components/selectAddress";
import { InputSearch } from "./_components/inputSearch";
import { Checkout } from "./_components/checkout";
import { CartList } from "./_components/cartList";

type Prop = {
  searchParams: { s?: string; store?: "all" };
  params: { userId: string };
};

export default function Page({ params, searchParams }: Prop) {
  return (
    <main className="min-h-screen w-full bg-[#eaeaea]">
      <section className="flex flex-wrap justify-center p-2">
        <InputSearch />
        <SelectAddress />
      </section>
      <section className="flex min-h-screen w-full flex-col gap-y-2 px-4 py-2">
        <ul className="flex flex-col gap-y-4">
          <Suspense fallback={<h1>Loading...</h1>}>
            <CartList user_id={params.userId || ""} search={searchParams.s || ""} store={searchParams?.store} />
          </Suspense>
        </ul>
      </section>
      <Checkout />
    </main>
  );
}
