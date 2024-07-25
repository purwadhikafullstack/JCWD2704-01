"use client";
import FormNumber from "@/components/form/form.field.number";
import FormTextArea from "@/components/form/form.field.textarea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { updateStockSchema } from "@/lib/zod-schemas/stock.schema";
import { TStoreStock } from "@/models/store.model";
import { updateStock } from "@/utils/fetch/client/store.client-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = { stock: TStoreStock };
export default function UpdateStockForm({ stock }: Props) {
  const form = useForm<z.infer<typeof updateStockSchema>>({
    resolver: zodResolver(updateStockSchema),
    defaultValues: {
      unit_price: stock.unit_price,
      discount: Number(stock.discount),
    },
  });
  function onSubmit(data: z.infer<typeof updateStockSchema>) {
    updateStock(stock.id || "", data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormNumber form={form} name="quantity" label="Quantity:*" placeholder="Enter stock quantity..." useSwitch />
        <FormNumber form={form} name="unit_price" label="Price(IDR):*" placeholder="Enter unit price..." />
        <FormNumber form={form} name="discount" label="Discount:*" placeholder="Enter product discount amount..." />
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
