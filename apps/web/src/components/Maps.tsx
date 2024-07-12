"use client";

import { Libraries, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo } from "react";
import { z } from "zod";

export const Maps = () => {
  const libraries = useMemo<Libraries>(() => ["places"], []);
  const googleMapsApiKey = z.string().parse(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
    libraries,
  });

  useEffect(() => {
    const latlong = () => {};
    window.addEventListener("DOMContentLoaded", latlong);

    return () => window.removeEventListener("DOMContentLoaded", latlong);
  }, []);

  if (!isLoaded) return <p>Loading...</p>;

  return <div>Hehehe</div>;
};
