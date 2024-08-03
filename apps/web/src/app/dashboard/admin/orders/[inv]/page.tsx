import { PageProps } from "@/app/(root)/account/orders/_model/invPageProps";
import OrderCard from "@/components/order/orderCard";
import { Card, CardHeader } from "@/components/ui/card";
import React, { Suspense } from "react";

export default function Page({ params }: PageProps) {
  return (
    <main className="flex w-full justify-center p-2">
      <Card className="w-full md:max-w-[468px]">
        <CardHeader className="px-2 text-center text-xs font-semibold">{params.inv}</CardHeader>
        <Suspense fallback={<h1>Loading...</h1>}>
          <OrderCard inv={params.inv} role="admin" />
        </Suspense>
      </Card>
    </main>
  );
}
