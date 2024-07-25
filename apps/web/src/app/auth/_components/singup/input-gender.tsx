import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RegisterType } from "@/schemas/user.schema";
import { useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";

export const RegisterSelectGender = ({ form }: { form: UseFormReturn<RegisterType> }) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (form.watch("gender")) ref.current?.click();
    console.log(form.watch("gender"));
  }, [form.watch("gender")]);

  return (
    <FormField
      control={form.control}
      name="gender"
      render={({ field }) => (
        <FormItem role="combobox">
          <FormLabel>Gender</FormLabel>

          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger ref={ref} disabled={form.formState.isSubmitting}>
              <FormControl>
                <SelectValue placeholder="Select your gender" />
              </FormControl>

              <SelectContent>
                <SelectItem className="cursor-pointer" value="male">
                  Male
                </SelectItem>
                <SelectItem className="cursor-pointer" value="female">
                  Female
                </SelectItem>
              </SelectContent>
            </SelectTrigger>
          </Select>
        </FormItem>
      )}
    />
  );
};
