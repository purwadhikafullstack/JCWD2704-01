import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type Props = {
  control: Control<any, any>;
  name: string;
  placeholder?: string;
  label: string;
  type?: string;
  disabled?: boolean;
};
export default function FormInput({ control, name, label, placeholder = "", type = "text", disabled = false }: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grow">
          <FormLabel htmlFor={name} className="text-right">
            {label}
          </FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} disabled={disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
