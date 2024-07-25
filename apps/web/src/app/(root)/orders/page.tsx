import { Label } from "@radix-ui/react-label";
import FillterInput from "@/components/fillter/fillterInput";
import FillterDateTime from "@/components/fillter/fillterDateTime";
import { Suspense } from "react";
import OrderList from "@/components/order/orderList";

type Props = {
  searchParams: {
    s: string;
  };
};

export default function Page({ searchParams }: Props) {
  return (
    <main className="min-h-screen bg-[#eaeaea]">
      {/* Fillter */}
      <section className="flex w-full items-center justify-center gap-x-2">
        <Label htmlFor="inv" className="hidden sm:block">
          Search by Invoice:
        </Label>
        <FillterInput name="inv" queryKey="inv" className="w-full max-w-[360px]" placeholder="Invoice" />
      </section>
      <section className="my-4 flex w-full flex-wrap justify-center gap-4 *:flex *:items-center *:gap-x-1">
        <div>
          <Label htmlFor="product" className="hidden sm:block">
            Product
          </Label>
          <FillterInput name="product" queryKey="pn" placeholder="Product Name" />
        </div>
        <div>
          <Label htmlFor="before">Before</Label>
          <FillterDateTime queryKey="before" />
        </div>
        <div>
          <Label htmlFor="after">After</Label>
          <FillterDateTime name="after" queryKey="after" />
        </div>
      </section>
      {/* Table */}
      <section className="p-x-2 my-4 w-full">
        <Suspense fallback={<h1>Loading...</h1>}>
          <OrderList searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}
