"use client";
import { Form } from "@/components/ui/form";
import { Product } from "@/models/product.model";
import { useForm } from "react-hook-form";
import ProductCarouselForm from "./product.carousel.form";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { cartSchema } from "@/lib/zod-schemas/cart.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Loader2, PlusCircleIcon, ShoppingCartIcon, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { toIDR } from "@/utils/toIDR";
import { Badge } from "@/components/ui/badge";
import FormQuantityInput from "@/components/form/form.qty.number";
import useAuthStore from "@/stores/auth.store";
import { updateCart } from "@/actions/updateCart";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { NEXT_PUBLIC_BASE_API_URL } from "@/config/config";
import { formatQueryString } from "@/utils/formatter";
import { useSearchParams } from "next/navigation";
import { ButtonSubmit } from "@/components/ui/button-submit";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { calculateDiscount } from "@/utils/calculateDiscount";

type Props = { product: Product };
export default function ProductDetailsForm({ product }: Props) {
  const { user, keepLogin } = useAuthStore((s) => s);
  const form = useForm<z.infer<typeof cartSchema>>({
    resolver: zodResolver(cartSchema),
    defaultValues: {
      store_stock_id: product.variants[0].store_stock[0].id,
      quantity: 1,
    },
  });
  const searchParams = useSearchParams();
  async function onSubmit({ quantity, store_stock_id }: z.infer<typeof cartSchema>) {
    try {
      quantity += user.cart.find((e) => e.store_stock_id == store_stock_id)?.quantity || 0;
      const a = await updateCart({ store_stock_id, quantity });
      if (a) throw new Error(a);
      toast.success("Product added to cart");
      keepLogin();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }
  const findStock =
    product.variants.find((variant) => variant.store_stock[0].id === form.watch("store_stock_id"))?.store_stock[0] ||
    product.variants[0].store_stock[0];
  const discCalc = findStock?.discount && findStock?.unit_price - (findStock?.unit_price * findStock?.discount) / 100;

  const inCart = user.cart.find((e) => e.store_stock_id == findStock.id);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="order-1 md:order-2">
        <Card className="min-w-96 p-5">
          <ProductCarouselForm form={form} product={product} />
          <div className="px-1 md:hidden">
            <h2 className="mt-3 text-3xl font-extrabold">{product.name}</h2>
            <Separator className="my-3" />
            <div className="flex items-center gap-2">
              <Link
                href={`/categories/${product?.category.name.toLowerCase().split(" ").join("-")}?city_id=${searchParams.get("city_id")}`}
                className="flex w-fit items-center gap-4 rounded-lg border p-2"
              >
                <Image
                  src={`${NEXT_PUBLIC_BASE_API_URL}/images/${product?.category.image?.name}`}
                  alt={`${product?.category.image?.name} image`}
                  width={240}
                  height={240}
                  className="size-6 rounded-md border object-cover"
                />
                <p className="text-nowrap text-sm">{product?.category.name}</p>
              </Link>
              <ChevronRight className="w-5" />
              <Link
                className="text-sm hover:underline"
                href={`/categories/${product?.category.name.toLowerCase().split(" ").join("-")}?city_id=${searchParams.get("city_id")}&sub_category=${formatQueryString(product?.sub_category.name)}`}
              >
                {product?.sub_category.name}
              </Link>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-4 px-1">
            <Separator />
            <div className="flex items-center justify-between">
              <CardTitle>{toIDR(!findStock?.discount ? findStock?.unit_price : discCalc || 0)}</CardTitle>
              <Badge className={cn(!findStock?.promo?.id && "hidden", "text-white")}>
                <PlusCircleIcon className="mr-1" />
                {findStock?.promo?.title}
              </Badge>
            </div>
            <div className={cn(!findStock?.discount ? "hidden" : "flex items-center gap-2")}>
              <Badge variant={"destructive"} className="text-white">
                <Tag className="mr-1" />
                {findStock?.discount}% OFF
              </Badge>
              <span className="text-lg text-muted-foreground line-through">{toIDR(findStock?.unit_price)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p>Stock: {findStock?.quantity}</p>
                {inCart && <p className="opacity-70">{`(in cart: ${inCart.quantity})`}</p>}
              </div>
              <Separator className="h-8" orientation="vertical" />
              <FormQuantityInput form={form} name="quantity" stock={findStock?.quantity || 0} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p>Subtotal:</p>
              <CardTitle>
                {form.watch("quantity") <= 0 || !form.watch("quantity")
                  ? toIDR(calculateDiscount(findStock?.unit_price, findStock?.discount || 0))
                  : toIDR(calculateDiscount(findStock?.unit_price, findStock?.discount || 0) * form.watch("quantity"))}
              </CardTitle>
            </div>
          </div>
          <Separator className="mt-3" />
          <AlertDialog>
            <AlertDialogTrigger
              disabled={
                findStock?.quantity === 0 ||
                form.watch("quantity") > findStock?.quantity ||
                form.watch("quantity") <= 0 ||
                !form.watch("quantity") ||
                form.formState.isSubmitting
              }
              className="w-full"
              asChild
            >
              <Button type="button" className={cn(user?.email ? "hidden" : "flex", "mt-3 w-full text-white")}>
                <ShoppingCartIcon className="mr-2" />
                Add To Cart
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sign In Needed.</AlertDialogTitle>
                <AlertDialogDescription>Please sign in to add this product to your cart.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Link href="/auth">
                  <AlertDialogAction>Sign In</AlertDialogAction>
                </Link>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger
              disabled={
                findStock?.quantity === 0 ||
                form.watch("quantity") > findStock?.quantity ||
                form.watch("quantity") <= 0 ||
                !form.watch("quantity") ||
                form.formState.isSubmitting
              }
              className="w-full"
              asChild
            >
              <Button type="button" className={cn(user?.addresses.length || !user.email ? "hidden" : "flex", "mt-3 w-full text-white")}>
                <ShoppingCartIcon className="mr-2" />
                Add To Cart
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Address Needed.</AlertDialogTitle>
                <AlertDialogDescription>We want to know your origin to deliver this product safely to your home.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Link href="/account/address">
                  <AlertDialogAction>
                    <PlusCircleIcon className="mr-2" />
                    Create Address
                  </AlertDialogAction>
                </Link>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <ButtonSubmit
            type="submit"
            className={cn(!user?.email || !user?.addresses.length ? "hidden" : "flex", "mt-3 w-full text-white")}
            disable={
              findStock?.quantity === 0 ||
              form.watch("quantity") > findStock?.quantity ||
              form.watch("quantity") <= 0 ||
              !form.watch("quantity") ||
              form.formState.isSubmitting
            }
            isSubmitting={form.formState.isSubmitting}
            label={
              <>
                <Loader2 className={cn(form.formState.isSubmitting ? "block" : "hidden", "mr-2 h-4 w-4 animate-spin")} />
                <ShoppingCartIcon className="mr-2" />
                Add To Cart
              </>
            }
          />
        </Card>
      </form>
    </Form>
  );
}
