"use client";

import { useLocation } from "@/stores/latLng.store";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { ReactNode, useEffect, useMemo } from "react";
import { googleMapsApiKey } from "./maps.config";

import Spinner from "../ui/spinner";
import { useMediaQueries } from "@/hooks/use-media-queries";
import { toast } from "sonner";

export const MapsProvider = ({ children }: { children: ReactNode }) => {
  const libraries = useMemo<Libraries>(() => ["places"], []);
  const { setLocation } = useLocation();
  const { matches } = useMediaQueries("(min-width: 640px)"); // isDesktop
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey, libraries });

  useEffect(() => {
    if (navigator.geolocation && isLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) =>
          toast.error(error.PERMISSION_DENIED.toString(), {
            description: error.message,
          }),
      );
    }
  }, [isLoaded]);

  if (!isLoaded)
    return (
      <div className="flex h-screen w-full items-center justify-center p-20 sm:p-52">
        <Spinner className="size-14" />
      </div>
    );

  if (matches) return <div className="flex flex-col pb-20 sm:pb-52">{children}</div>;

  return (
    <div className="flex flex-col pb-20 sm:pb-52" vaul-drawer-wrapper="">
      {children}
    </div>
  );
};
