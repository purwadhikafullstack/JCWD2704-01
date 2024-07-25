import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangeProfileType } from "@/schemas/user.schema";
import { UseFormReturn } from "react-hook-form";

export const ProfileInput = ({
  form,
  name,
  label,
  className,
  placeholder,
  type,
  pattern
}: {
  form: UseFormReturn<Omit<ChangeProfileType, "avatar" | "dob">>;
  name: keyof Omit<ChangeProfileType, "avatar" | "dob">;
  label: string;
  className?: string;
  placeholder: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  pattern?: React.InputHTMLAttributes<HTMLInputElement>["pattern"];
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} pattern={pattern} className={className} disabled={formState.isSubmitting} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
