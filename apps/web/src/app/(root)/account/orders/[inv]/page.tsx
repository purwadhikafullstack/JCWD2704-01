import OrderCard from "@/components/order/orderCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { Suspense } from "react";
import { PageProps } from "../_model/invPageProps";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ButtonBack } from "../../_components/ButtonBack";

export default function Page({ params, searchParams }: PageProps) {
  return (
    <>
      <Header searchParams={searchParams} />
      <div className="container flex h-16 w-full items-center justify-between bg-primary px-4 xl:rounded-b-md">
        <ButtonBack isCenter={false} className="w-fit gap-1.5 text-primary-foreground md:gap-4">
          Order Details
        </ButtonBack>
      </div>
      <main className="flex w-full items-center justify-center px-10 py-4 md:py-5">
        <Card className="min-h-dvh md:max-w-md">
          <CardHeader className="text-lg font-semibold">Transaction</CardHeader>
          <CardContent>
            <span className="block font-normal text-muted-foreground">Invoice</span>
            <span className="block text-pretty text-sm font-semibold text-primary">{params.inv.replaceAll("-", " /")}</span>
          </CardContent>
          <Suspense fallback={<h1>Loading...</h1>}>
            <OrderCard inv={params.inv} />
          </Suspense>
        </Card>
      </main>
      <Footer />
    </>
  );
}
