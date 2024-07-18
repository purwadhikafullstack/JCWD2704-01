import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterType } from "@/schemas/user.schema";
import Image from "next/image";
import { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";

export const RegisterAvatarInput = ({ form }: { form: UseFormReturn<RegisterType> }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    form.setValue("avatar", file);
  };

  return (
    <FormField
      control={form.control}
      name="avatar"
      render={({ field: { value, onChange, ...field }, formState: { isSubmitting } }) => (
        <FormItem className="w-fit overflow-hidden rounded-full">
          <FormLabel>
            <Image
              src={form.getValues("avatar") ? window.URL.createObjectURL(form.getValues("avatar")!) : "/placeholder.jpg"}
              alt="Profile Picture"
              height={100}
              width={100}
              className="aspect-square object-cover cursor-pointer"
              sizes="100px"
            />
          </FormLabel>

          <FormControl>
            <Input accept="image/*" type="file" className="hidden" disabled={isSubmitting} onChange={handleChange} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
