import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react";

export const PlacesAutoComplete = ({
  location,
  onAddressSelect,
}: {
  location: google.maps.GeocoderResult | null;
  onAddressSelect: (address: string) => void;
}) => {
  const placeholder = location?.address_components.find((loc) => loc.types[0] === "route")?.short_name;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: "id" } },
    debounce: 300,
    cache: 86400,
  });

  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description,
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
          }}
          className="cursor-pointer rounded-md px-2 py-2 hover:bg-primary hover:text-primary-foreground"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };

  return (
    <div className="relative space-y-4">
      <Input value={value} disabled={!ready} onChange={handleChange} placeholder={placeholder} />

      {status === "OK" && <ul className="absolute z-10 w-full rounded-md border bg-background p-1 shadow-lg">{renderSuggestions()}</ul>}
    </div>
  );
};
