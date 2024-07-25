"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NEXT_PUBLIC_BASE_API_URL } from "@/config/config";
import { cn } from "@/lib/utils";
import { Product, ProductVariant } from "@/models/product.model";
import { toIDR } from "@/utils/toIDR";
import { TagIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

type Props = { product: Product };
export default function ProductCard({ product }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const discount = product.variants[0].store_stock[0].discount;
  const unitPrice = product.variants[0].store_stock[0].unit_price;
  return (
    <Card
      key={product.id}
      className="cursor-pointer shadow-md"
      onClick={() => router.push(`/product/${product.name.toLowerCase().replaceAll(" ", "-")}?store_id=${searchParams.get("store_id")}`)}
    >
      <div className="relative">
        <Image
          src={`${NEXT_PUBLIC_BASE_API_URL}/images/${product.variants[0].images.name}`}
          alt={`${product.name} image`}
          width={240}
          height={240}
          className="aspect-square w-full object-cover"
        />
        <Badge className={cn(!discount && "hidden", "absolute left-2 top-2")} variant={"destructive"}>
          <TagIcon className="mr-2 size-4" />
          {discount}% OFF
        </Badge>
      </div>
      <div className="flex flex-col gap-1 p-3">
        <h2 className="text-md mb-0 font-bold">{product.name}</h2>
        <CardDescription className="flex gap-2">
          {product.variants.map((variant: ProductVariant) => (
            <div key={variant.id} className="rounded-full bg-primary px-3 text-[10px] font-bold text-white">
              {variant.name}
            </div>
          ))}
        </CardDescription>
        <CardContent className="p-0">
          <div className={cn(discount ? "text-xs font-normal text-muted-foreground line-through" : "text-sm font-bold")}>
            {toIDR(unitPrice)}
          </div>
          <div className="text-sm font-bold">{discount ? toIDR(unitPrice - unitPrice * (discount / 100)) : ""}</div>
        </CardContent>
      </div>
      <Separator />
      <CardFooter className="px-3 py-2 text-xs">Stock: {product.variants[0].store_stock[0].quantity}</CardFooter>
    </Card>
  );
}
