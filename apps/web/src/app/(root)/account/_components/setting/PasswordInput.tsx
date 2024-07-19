import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangePasswordType } from "@/schemas/user.schema";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

export const PasswordInput = ({
  form,
  name,
  label,
  className,
}: {
  form: UseFormReturn<ChangePasswordType>;
  name: keyof ChangePasswordType;
  label: string;
  className?: string;
}) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input {...field} type={isShow ? "text" : "password"} />
            </FormControl>
            <span onClick={() => setIsShow(!isShow)} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/70">
              {isShow ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
            </span>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
