import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  control: Control<any, any>;
  name: string;
  label: string;
  placeholder?: string;
  isPatch?: boolean;
  children: React.ReactNode;
  useParams?: boolean;
  setState?: (v: any) => void;
};
export default function FormSelect({ control, name, label, placeholder, children, useParams = false, setState }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleChange(v: string) {
    const params = new URLSearchParams(searchParams);
    v ? params.set("category_id", v) : params.delete("category_id");
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(v) => {
              field.onChange(v);
              useParams && handleChange(v);
              setState && setState(v);
            }}
            defaultValue={field.value}
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
