import CartProductCard, {
  CartProductCardSkeleton,
} from "@/components/ui/cards/cartProductCard";
import axiosInstance from "@/lib/axios";
import { Suspense } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { s?: string };
}) {
  return (
    <main className="min-h-screen w-full bg-[#eaeaea]">
      <Suspense fallback={<h1>Loading...</h1>}>
        <CardList search={searchParams.s} />
      </Suspense>
    </main>
  );
}

async function CardList({ search }: { search?: string }) {
  const fetchProducts = async () => {
    try {
      return (await axiosInstance().get("/cart", { params: { s: search } }))
        .data.data;
    } catch (err) {
      return [{}, {}];
    }
  };
  const products = (await fetchProducts()) as any[];
  return (
    <section className="flex w-full flex-col gap-y-2 px-4 py-2">
      {products.map((e, i) => (
        <Suspense key={i} fallback={<CartProductCardSkeleton />}>
          <CartProductCard product_id={e.store_stock_id} />
        </Suspense>
      ))}
    </section>
  );
}
