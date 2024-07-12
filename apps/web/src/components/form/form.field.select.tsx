import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  control: Control<any, any>;
  name: string;
  label: string;
  placeholder?: string;
  isPatch?: boolean;
  children: React.ReactNode;
};
export default function FormSelect({
  control,
  name,
  label,
  placeholder,
  children,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={String(field.value)}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{children}</SelectContent>
            <FormMessage />
          </Select>
        </FormItem>
      )}
    />
  );
}
