"use client";
import FormComboBox from "@/components/form/form.field.combobox";
import FormInput from "@/components/form/form.field.input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { updateSubCatSchema } from "@/lib/zod-schemas/category.schema";
import { TCategory, TSubCategory } from "@/models/category.model";
import { fetchCategoriesClient, updateSubCat } from "@/utils/fetch/client/categories.client-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = { subCategory: TSubCategory };
export default function SubCatEditForm({ subCategory }: Props) {
  const [categories, setCategories] = useState<TCategory[]>([]);
  async function handleSetCategories() {
    setCategories([...(await fetchCategoriesClient())]);
  }
  useEffect(() => {
    handleSetCategories();
  }, []);
  const form = useForm<z.infer<typeof updateSubCatSchema>>({
    resolver: zodResolver(updateSubCatSchema),
    defaultValues: {
      name: subCategory.name,
      category_id: subCategory.category_id,
    },
  });
  function onSubmit(data: z.infer<typeof updateSubCatSchema>) {
    updateSubCat(subCategory.id, data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormInput control={form.control} name="name" label="Name:*" placeholder="Enter sub-category name here..." />
        <FormComboBox
          form={form}
          datas={categories}
          name="category_id"
          label="Select A Category:*"
          placeholder="Select category"
          emptyMsg="No category found"
        />
        <Button type="submit" className="text-white" disabled={form.formState.isSubmitting ? true : false}>
          <Loader2 className={cn(form.formState.isSubmitting ? "block" : "hidden", "mr-2 h-4 w-4 animate-spin")} />
          Submit
        </Button>
      </form>
    </Form>
  );
}
