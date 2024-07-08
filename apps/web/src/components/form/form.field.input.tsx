import { Control, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type Props = {
  control: Control<any, any>;
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
};
export default function FormInput({
  control,
  name,
  label,
  type = "text",
  disabled = false,
}: Props) {
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
            <Input type={type} {...field} disabled={disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
