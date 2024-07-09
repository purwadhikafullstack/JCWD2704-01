import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { toIDR } from "@/utils/toIDR";

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
      <Checkout />
    </main>
  );
}

async function CardList({ search }: { search?: string }) {
  const fetchProducts = async () => {
    try {
      return (await axiosInstance().get("/cart", { params: { s: search } }))
        .data.data;
    } catch (err) {
      return [{}, {}, {}, {}, {}];
    }
  };
  const products = (await fetchProducts()) as any[];
  return (
    <section className="flex min-h-screen w-full flex-col gap-y-2 px-4 py-2">
      <ul className="flex flex-col gap-y-4">
        {products.map((e, i) => (
          <Suspense key={i} fallback={<h1>Loading...</h1>}>
            <li>
              <Card className="flex h-[128px] w-full text-ellipsis">
                <div className="relative aspect-square h-full">
                  <Image src={"/"} alt="" fill sizes="100% 100%" />
                </div>
                <CardContent className="flex w-full flex-col justify-between gap-2 p-2">
                  <div>
                    <CardDescription className="mb-2 min-w-40 font-bold">
                      Product Name Is So LOOOOOONG
                    </CardDescription>
                    <CardDescription>Rp.XX,XXX.XX</CardDescription>
                  </div>
                  <div className="end-0 flex items-center self-end">
                    <Button>-</Button>
                    <CardDescription>10</CardDescription>
                    <Button>+</Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          </Suspense>
        ))}
      </ul>
    </section>
  );
}

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
