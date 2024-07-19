import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<any>;
  datas: any[];
  name: string;
  label: string;
  placeholder?: string;
  emptyMsg?: string;
  desc?: string;
};
export default function FormComboBox({
  datas,
  form,
  name,
  label,
  placeholder = "Select product",
  emptyMsg = "No product found",
  desc = "",
}: Props) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("w-full grow justify-between", !field.value && "text-muted-foreground")}
                >
                  {field.value ? datas.find((data) => data.id === field.value)?.name : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="grow p-0">
              <Command>
                <CommandInput placeholder={placeholder} />
                <CommandList>
                  <CommandEmpty>{emptyMsg}</CommandEmpty>
                  <CommandGroup>
                    {datas.map((data) => (
                      <CommandItem
                        value={data.name}
                        key={data.id}
                        onSelect={() => {
                          form.setValue(name, data.id);
                        }}
                      >
                        <Check className={cn("mr-2 size-4", data.name === field.value ? "opacity-100" : "opacity-0")} />
                        {data.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>{desc}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
