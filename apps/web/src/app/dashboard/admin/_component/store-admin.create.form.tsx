"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { storeAdminSchema } from "@/lib/zod-schemas/store-admin.schema";
import { TCity } from "@/models/address.model";
import { Gender } from "@/models/user.model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/form/form.field.input";
import { SelectItem } from "@/components/ui/select";
import FormSelect from "@/components/form/form.field.select";
import FormTextArea from "@/components/form/form.field.textarea";
import FormDatepicker from "@/components/form/form.field.datepicker";
import { subYears } from "date-fns";
import { createStoreAdmin } from "@/utils/fetch/client/admin.client-fetch";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { cities: TCity[] };
export default function StoreAdminCreateForm({ cities }: Props) {
  const form = useForm<z.infer<typeof storeAdminSchema>>({
    resolver: zodResolver(storeAdminSchema),
    defaultValues: {
      gender: Gender.male,
      dob: `${subYears(new Date(), 18).toDateString()}`,
      city_id: String(cities[0].city_id),
    },
  });
  function onSubmit(data: z.infer<typeof storeAdminSchema>) {
    createStoreAdmin(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <FormInput control={form.control} name="email" label="Email*" placeholder="Enter email here..." />
        <FormInput control={form.control} type="password" name="password" label="Password*" placeholder="Enter password here..." />
        <FormInput control={form.control} name="full_name" label="Full Name*" placeholder="Enter full name here..." />
        <FormSelect control={form.control} name="gender" label="Select Gender*:" placeholder="Pick a gender...">
          <SelectItem value={Gender.male}>{Gender.male}</SelectItem>
          <SelectItem value={Gender.female}>{Gender.female}</SelectItem>
        </FormSelect>
        <FormInput control={form.control} name="phone_no" label="Phone No.*" placeholder="Enter phone number..." />
        <FormDatepicker control={form.control} name="dob" label="Date Of Birth*" />
        <FormTextArea control={form.control} name="address" label="Address*" placeholder="Enter address here..." />
        <FormSelect control={form.control} name="city_id" label="Select City:*" placeholder="Pick a city...">
          {cities.map((city) => (
            <SelectItem key={city.city_id} value={String(city.city_id)}>
              {city.city_name}
            </SelectItem>
          ))}
        </FormSelect>
        <FormInput control={form.control} name="details" label="Details" placeholder="Enter address details..." />
        <Button type="submit" className="text-white" disabled={form.formState.isSubmitting ? true : false}>
          <Loader2 className={cn(form.formState.isSubmitting ? "block" : "hidden", "mr-2 h-4 w-4 animate-spin")} />
          Submit
        </Button>
      </form>
    </Form>
  );
}
