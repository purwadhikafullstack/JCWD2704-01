import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginType } from "@/schemas/user.schema";
import { UseFormReturn } from "react-hook-form";

export const LoginInput = ({
  form,
  label,
  name,
  placeholder,
  type,
  className,
}: {
  form: UseFormReturn<LoginType>;
  name: keyof LoginType;
  label: string;
  placeholder: string;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, formState }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input disabled={formState.isSubmitting} type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
