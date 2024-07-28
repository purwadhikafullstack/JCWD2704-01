"use client";

import { useLocation } from "@/stores/latLng.store";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { ReactNode, useEffect, useMemo } from "react";
import { googleMapsApiKey } from "./maps.config";

import useAuthStore from "@/stores/auth.store";
import { useMediaQueries } from "@/hooks/use-media-queries";
import Spinner from "../ui/spinner";
import { toast } from "sonner";

export const MapsProvider = ({ children }: { children: ReactNode }) => {
  const libraries = useMemo<Libraries>(() => ["places"], []);
  const { setLocation } = useLocation();
  const { user } = useAuthStore();
  const { matches } = useMediaQueries("(min-width: 640px)"); // isDesktop
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey, libraries });

  useEffect(() => {
    if (navigator.geolocation) {
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
    // else {
    //   setLocation({ lat: user.addresses[0].latitude, lng: user.addresses[0].longitude });
    // }
  }, []);

  if (!isLoaded)
    return (
      <div className="flex h-screen w-full items-center justify-center p-20 sm:p-52">
        <Spinner className="size-14" />
      </div>
    );

  if (matches) return <div className="flex flex-col">{children}</div>;

  return <div className="flex flex-col">{children}</div>;
};
