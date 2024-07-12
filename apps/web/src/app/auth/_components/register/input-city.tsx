import { Button } from "@/components/ui/button";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";

import { RegisterType } from "@/schemas/user.schema";
import { CityType } from "@/types/cities.type";
import { SelectValue } from "@radix-ui/react-select";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

export const RegisterAddressInput = ({ form, data }: { form: UseFormReturn<RegisterType>; data: CityType[] }) => {
  return (
    <FormField
      control={form.control}
      name="city_id"
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          <FormLabel>City</FormLabel>
          <Select onValueChange={(e) => field.onChange(Number(e))}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select your City" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectGroup>
                {data.map(({ city_name, city_id, type, province, postal_code }) => {
                  return (
                    <SelectItem value={`${city_id}`} key={city_id}>
                      {city_name} ({type}), {province}, {postal_code}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
