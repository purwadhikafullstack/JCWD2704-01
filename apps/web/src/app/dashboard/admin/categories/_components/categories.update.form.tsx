"use client";
import FormFile from "@/components/form/form.field.file";
import FormInput from "@/components/form/form.field.input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { updateCategorySchema } from "@/lib/zod-schemas/category.schema";
import { TCategory } from "@/models/category.model";
import { updateCategory } from "@/utils/fetch/client/categories.client-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = { category: TCategory };
export default function CategoriesEditForm({ category }: Props) {
  const form = useForm<z.infer<typeof updateCategorySchema>>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: category.name,
    },
  });
  function onSubmit(data: z.infer<typeof updateCategorySchema>) {
    updateCategory(category.id, data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormInput control={form.control} name="name" label="Name:*" placeholder="Enter category name here..." />
        <FormFile control={form} name="cat_image" label="Category Image:*" data={category.image?.id} />
        <Button type="submit" className="text-white" disabled={form.formState.isSubmitting ? true : false}>
          <Loader2 className={cn(form.formState.isSubmitting ? "block" : "hidden", "mr-2 h-4 w-4 animate-spin")} />
          Submit
        </Button>
      </form>
    </Form>
  );
}
