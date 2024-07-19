import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegisterType } from "@/schemas/user.schema";
import { UseFormReturn } from "react-hook-form";

export const RegisterSelectGender = ({
  form,
}: {
  form: UseFormReturn<RegisterType>;
}) => {
  return (
    <FormField
      control={form.control}
      name="gender"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Gender</FormLabel>

          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger disabled={form.formState.isSubmitting}>
              <FormControl>
                <SelectValue placeholder="Select your gender" />
              </FormControl>

              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </SelectTrigger>
          </Select>
        </FormItem>
      )}
    />
  );
};
