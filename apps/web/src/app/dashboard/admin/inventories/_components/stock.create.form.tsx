"use client";
import FormNumber from "@/components/form/form.field.number";
import FormTextArea from "@/components/form/form.field.textarea";
import FormComboBoxStores from "@/components/form/form.store.combobox";
import FormComboBoxVariants from "@/components/form/form.variants.combobox";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { initStockSchema } from "@/lib/zod-schemas/stock.schema";
import { ProductVariant } from "@/models/product.model";
import { TStore } from "@/models/store.model";
import { initStock } from "@/utils/fetch/client/store.client-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAuthStore from "@/stores/auth.store";
import { Role } from "@/models/user.model";

type Props = { stores: TStore[]; variants: ProductVariant[] };
export default function AssignStockForm({ stores, variants }: Props) {
  const { user } = useAuthStore((s) => s);
  const form = useForm<z.infer<typeof initStockSchema>>({
    resolver: zodResolver(initStockSchema),
    defaultValues: {
      store_id: user.role === Role.store_admin ? user?.store_id : "",
    },
  });
  function onSubmit(data: z.infer<typeof initStockSchema>) {
    console.log(data);
    initStock(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className={cn(user.role !== Role.super_admin && "hidden")}>
          <FormComboBoxStores
            form={form}
            datas={stores}
            name="store_id"
            label="Select Store:*"
            placeholder="Pick a store."
            emptyMsg="Store not found."
            setSearch="search_sel1"
          />
        </div>

        <FormComboBoxVariants
          form={form}
          datas={variants}
          name="variant_id"
          label="Select Product:*"
          placeholder="Pick a product."
          emptyMsg="Product not found."
          setSearch="search_sel2"
        />
        <FormNumber form={form} name="quantity" label="Quantity:*" placeholder="Enter stock quantity..." />
        <FormNumber form={form} name="unit_price" label="Price(IDR):*" placeholder="Enter unit price..." />
        <FormNumber form={form} name="discount" label="Discount:" placeholder="Enter product discount amount..." />
        <FormTextArea
          control={form.control}
          name="reference"
          label="Reference Notes:"
          placeholder="Enter stock change reference notes here..."
        />
        <Button type="submit" className="text-white" disabled={form.formState.isSubmitting ? true : false}>
          <Loader2 className={cn(form.formState.isSubmitting ? "block" : "hidden", "mr-2 h-4 w-4 animate-spin")} />
          Submit
        </Button>
      </form>
    </Form>
  );
}
