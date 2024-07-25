import useAuthStore from "@/stores/auth.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CityType } from "@/types/cities.type";
import { userCreateAddress, UserCreateAddressType } from "@/schemas/address.schema";

import { ButtonSubmit } from "@/components/ui/button-submit";
import { Form } from "@/components/ui/form";
import { userAddressSubmit } from "@/utils/form/handlers/address";

import { AddressInput } from "./input";
import { AddressCityInput } from "./input-city";

export const AddressDetailForm = ({
  cities,
  maps,
  latLng,
}: {
  cities: CityType[];
  maps: google.maps.places.PlaceResult | null;
  latLng: {
    lat: number;
    lng: number;
  };
}) => {
  const { user } = useAuthStore();
  const form = useForm<UserCreateAddressType>({
    resolver: zodResolver(userCreateAddress),
    defaultValues: {
      address: maps?.formatted_address,
      latitude: latLng.lat,
      longitude: latLng.lng,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(userAddressSubmit)}>
        <AddressInput
          form={form}
          name="details"
          label="Address Details"
          placeholder="Details (Block/Unit/Floor, Etc.)"
          address={user.addresses}
        />

        <AddressCityInput form={form} cities={cities} city={user.addresses[0]?.city.city_name} />

        <ButtonSubmit isSubmitting={form.formState.isSubmitting} label="Save Location" className="w-full" />
      </form>
    </Form>
  );
};
