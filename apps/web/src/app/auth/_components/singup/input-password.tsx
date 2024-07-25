import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterType } from "@/schemas/user.schema";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

export const RegisterPasswordInput = ({
  form,
  label,
  name,
  placeholder,
  className,
}: {
  form: UseFormReturn<{ password: string; confirmPassword: string }>;
  placeholder: string;
  label: string;
  name: keyof { password: string; confirmPassword: string };
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
              <Input
                className={className}
                disabled={form.formState.isSubmitting}
                type={isShow ? "text" : "password"}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <span
              onClick={() => setIsShow(!isShow)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-foreground/70"
            >
              {isShow ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
            </span>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
