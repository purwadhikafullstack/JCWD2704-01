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
  form: UseFormReturn<RegisterType>;
  placeholder: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  name: keyof RegisterType;
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
