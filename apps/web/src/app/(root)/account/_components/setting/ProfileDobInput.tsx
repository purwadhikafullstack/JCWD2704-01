import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChangeProfileType } from "@/schemas/user.schema";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

export const ProfielDobInput = ({ form, dob }: { form: UseFormReturn<ChangeProfileType>; dob: string }) => {
  return (
    <FormField
      control={form.control}
      name="dob"
      render={({ field, formState }) => (
        <FormItem className="w-full">
          <FormLabel>Date of Birth</FormLabel>
          <Popover>
            <PopoverTrigger asChild className="w-full" disabled={formState.isSubmitting}>
              <FormControl>
                <Button variant="outline" className={cn("flex w-full", !field.value && "text-muted-foreground")}>
                  {field.value ? format(field.value, "PP") : <span>{dob ? format(dob, "PP") : "Pick a Date"}</span>}
                  <CalendarIcon className="ml-auto size-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent align="start" sideOffset={10} className="size-fit border-none p-0">
              <Calendar
                mode="single"
                captionLayout="dropdown-buttons"
                className="rounded border bg-background"
                fromYear={1950}
                toYear={new Date().getFullYear()}
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date > new Date() || date < new Date("1990-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
