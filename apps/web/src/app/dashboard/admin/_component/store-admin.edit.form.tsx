"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { storeAdminUpdateSchema } from "@/lib/zod-schemas/store-admin.schema";
import { TCity } from "@/models/address.model";
import { Gender, TUser } from "@/models/user.model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/form/form.field.input";
import { SelectItem } from "@/components/ui/select";
import FormDatepicker from "@/components/form/form.field.datepicker";
import FormSelect from "@/components/form/form.field.select";
import { updateStoreAdmin } from "@/utils/fetch/admin.fetch";
import FormTextArea from "@/components/form/form.field.textarea";

type Props = { user: TUser; cities: TCity[] };
export default function StoreAdminEditForm({ user, cities }: Props) {
  const form = useForm<z.infer<typeof storeAdminUpdateSchema>>({
    resolver: zodResolver(storeAdminUpdateSchema),
    defaultValues: {
      email: user.email,
      full_name: user.full_name,
      gender: user.gender,
      dob: user.dob,
      phone_no: user.phone_no,
      address: user.addresses?.length ? user.addresses[0]?.address : "",
      city_id: user.addresses?.length ? user.addresses[0]?.city_id : 151,
      details: user.addresses?.length ? user.addresses[0]?.details : "",
    },
  });
  function onSubmit(data: z.infer<typeof storeAdminUpdateSchema>) {
    updateStoreAdmin(user.id, data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormInput control={form.control} name="email" label="Email" />
        <FormInput control={form.control} name="full_name" label="Full Name" />
        <FormSelect control={form.control} name="gender" label="Select Gender:">
          <SelectItem value={Gender.male}>{Gender.male}</SelectItem>
          <SelectItem value={Gender.female}>{Gender.female}</SelectItem>
        </FormSelect>
        <FormInput control={form.control} name="phone_no" label="Phone No." />
        <FormDatepicker
          control={form.control}
          name="dob"
          label="Date Of Birth"
        />
        <FormTextArea
          control={form.control}
          name="address"
          label="Address"
          placeholder="Enter address here..."
        />
        <FormSelect control={form.control} name="city_id" label="Select City:">
          {cities.map((city) => (
            <SelectItem key={city.city_id} value={String(city.city_id)}>
              {city.city_name}
            </SelectItem>
          ))}
        </FormSelect>
        <FormInput control={form.control} name="details" label="Details" />
        <Button type="submit" className="text-white">
          Submit
        </Button>
      </form>
    </Form>
  );
}
