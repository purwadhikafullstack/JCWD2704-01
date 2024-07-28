import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TAddress } from "@/models/address.model";
import { UserCreateAddressType } from "@/schemas/address.schema";
import { UseFormReturn } from "react-hook-form";

export const AddressInput = ({
  form,
  address,
  name,
  label,
  placeholder,
}: {
  form: UseFormReturn<UserCreateAddressType>;
  name: keyof UserCreateAddressType;
  address: TAddress[];
  label: string;
  placeholder: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input
              {...field}
              disabled={formState.isSubmitting}
              placeholder={!address.length ? placeholder : address[0].details?.toString()}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
