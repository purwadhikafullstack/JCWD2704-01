"use client";

import FormInput from "@/components/form/form.field.input";
import FormSelect from "@/components/form/form.field.select";
import FormTextArea from "@/components/form/form.field.textarea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { createProductSchema } from "@/lib/zod-schemas/product.schema";
import { TCategory, TSubCategory } from "@/models/category.model";
import { createNewProduct } from "@/utils/fetch/client/product.client-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = { datas: [TCategory[], TSubCategory[]] };
export default function ProductCreateForm({ datas }: Props) {
  const [categories, subCats]: [TCategory[], TSubCategory[]] = datas;
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      shelf_life: "",
      nutrition_facts: "",
      storage_instructions: "",
      category_id: "",
      sub_category_id: "",
    },
  });
  function onSubmit(data: z.infer<typeof createProductSchema>) {
    console.log(data);
    createNewProduct(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormInput control={form.control} name="name" label="Name:*" placeholder="Enter product name here..." />
        <FormTextArea control={form.control} name="description" label="Description:*" placeholder="Enter product description here..." />
        <FormInput control={form.control} name="shelf_life" label="Shelf Life:" placeholder="Enter product's shelf life here..." />
        <FormTextArea
          control={form.control}
          name="nutrition_facts"
          label="Nutrition Facts:"
          placeholder="Enter product's nutrition facts here..."
        />
        <FormTextArea
          control={form.control}
          name="storage_instructions"
          label="Storage Instructions:"
          placeholder="Enter product's storage instructions here..."
        />{" "}
        <FormSelect control={form.control} name="category_id" label="Select Category:" placeholder="Pick a category..." useParams>
          {categories.map((cat: TCategory) => (
            <SelectItem key={cat.id} value={String(cat.id)}>
              {cat.name}
            </SelectItem>
          ))}
        </FormSelect>
        {subCats.length !== 0 && (
          <FormSelect control={form.control} name="sub_category_id" label="Select Sub-Category:" placeholder="Pick a sub-category...">
            {subCats.map((sub: TSubCategory) => (
              <SelectItem key={sub.id} value={String(sub.id)}>
                {sub.name}
              </SelectItem>
            ))}
          </FormSelect>
        )}
        <Button type="submit" className="text-white" disabled={form.formState.isSubmitting ? true : false}>
          <Loader2 className={cn(form.formState.isSubmitting ? "block" : "hidden", "mr-2 h-4 w-4 animate-spin")} />
          Submit
        </Button>
      </form>
    </Form>
  );
}
