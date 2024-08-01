import { Section } from "@/components/Section";
import { Revalidate } from "next/dist/server/lib/revalidate";
import { Category } from "./_components/categories";
import { Promotion } from "./_components/promotion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { dummyPromotion } from "@/constants/promotion";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";
import { fetchProductsByQuery } from "@/utils/fetch/server/store.fetch";
import { SearchParams } from "@/models/search.params";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Product } from "@/models/product.model";
import ProductCard from "./_components/products/product.card";
import { cn } from "@/lib/utils";

export const revalidate: Revalidate = 900;

type Props = {
  searchParams: SearchParams;
};
export default async function Home({ searchParams }: Props) {
  const getProductByDiscount = await fetchProductsByQuery({ city_id: searchParams.city_id, discount: "true" });
  return (
    <>
      <Header />
      <main className="size-full min-h-screen space-y-6 pb-6">
        <section className="container">
          <Promotion datas={dummyPromotion} />
        </section>

        <div className="size-full px-4 md:px-0">
          <Section className="w-full space-y-4 py-4">
            <h1 className="mx-auto max-w-screen-md text-3xl font-bold leading-tight md:text-4xl lg:leading-[1.1]">Category</h1>
            <Suspense fallback={<Spinner />}>
              <Category />
            </Suspense>
          </Section>
        </div>
        <div className="size-full px-4 md:px-0">
          <Section className={cn(!getProductByDiscount.length && "hidden", "flex p-0")}>
            <div className="w-60 rounded-l-md bg-primary p-4 text-white">
              <h2 className="text-5xl font-extrabold">Diskon Meriah Hari Ini!</h2>
            </div>
            <div className="w-full px-16 py-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {getProductByDiscount?.map((product: Product, i: number) => (
                    <CarouselItem key={i} className="basis-1/4">
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
