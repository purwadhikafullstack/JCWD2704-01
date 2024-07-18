import OrderCard from "@/components/order/orderCard";
import { Card, CardHeader } from "@/components/ui/card";
import React, { Suspense } from "react";

export default function Page({ params }: PageProps) {
  return (
    <main className="flex w-full justify-center p-2">
      <Card className="w-full md:max-w-[468px]">
        <CardHeader>{params.inv}</CardHeader>
        <Suspense fallback={<h1>Loading...</h1>}>
          <OrderCard inv={params.inv} />
        </Suspense>
      </Card>
    </main>
  );
}
