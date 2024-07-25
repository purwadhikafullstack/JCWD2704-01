import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterType } from "@/schemas/user.schema";
import type { UseFormReturn } from "react-hook-form";

export const RegisterInput = ({
  form,
  label,
  name,
  type,
  placeholder,
  className,
}: {
  form: UseFormReturn<Omit<RegisterType, "avatar" | "dob">>;
  placeholder: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  name: keyof Omit<RegisterType, "avatar" | "dob">;
  className?: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input className={className} disabled={form.formState.isSubmitting} type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
