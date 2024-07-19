"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CircleF, GoogleMap, MarkerF } from "@react-google-maps/api";

import { useLocation } from "@/stores/latLng.store";
import { mapId } from "./maps.config";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import { PlacesAutoComplete } from "./PlacesAutoComplete";
import { getGeocode, getLatLng } from "use-places-autocomplete";

export const Maps = ({ zoom = 15, className, activateInput = false, marker = false }: { zoom?: number; className?: string; activateInput?: boolean, marker?: boolean }) => {
  const {
    latLng: { lat, lng },
    location,
    setLocation,
  } = useLocation();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat, lng });
  const mapCenter = useMemo<google.maps.LatLngLiteral>(() => ({ lat, lng }), [lat, lng]);
  const mapOptions: google.maps.MapOptions = {
    mapId,
    disableDefaultUI: true,
    clickableIcons: false,
    scrollwheel: false,
    gestureHandling: "auto",
    tilt: 0,
  };

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const onDragEnd = () => {
    const newCenter = map?.getCenter()?.toJSON() || center;
    setCenter(newCenter);
  };

  useEffect(() => {
    setCenter({ lat, lng });
  }, [lat, lng]);

  useEffect(() => {
    if (map && center) {
      map.setCenter(center);
    }
  }, [map, center]);

  useEffect(() => {
    if (map) {
      map.addListener("zoom_changed", () => {
        const newCenter = map.getCenter()?.toJSON() || center;
        setCenter(newCenter);
      });
    }
  }, [map]);

  return (
    <div className={cn("size-full border-border", className)}>
      {activateInput && (
        <PlacesAutoComplete
          location={location}
          onAddressSelect={(address) => {
            getGeocode({ address }).then((results) => {
              const { lat, lng } = getLatLng(results[0]);
              setLocation({ lat, lng });
            });
          }}
        />
      )}

      <div className="relative h-96 w-full overflow-hidden rounded-md border">
        <Circle className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 fill-primary/50 stroke-primary/90" />

        <GoogleMap
          options={mapOptions}
          zoom={zoom}
          center={mapCenter}
          onLoad={onLoad}
          onDragEnd={onDragEnd}
          mapContainerClassName="size-full"
        >
          {marker && (<MarkerF position={center} draggable />)}

          <CircleF
            center={center}
            radius={1000}
            options={{
              fillColor: "#caf0f8",
              strokeColor: "#48cae4",
              strokeOpacity: 0.6,
            }}
          />
        </GoogleMap>
      </div>
    </div>
  );
};
