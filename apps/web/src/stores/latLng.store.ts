import { create } from "zustand";

type State = { latLng: { lat: number; lng: number }; location: google.maps.GeocoderResult | null };
type Action = { setLocation: (latLng: State["latLng"]) => void };
type LatLngStore = State & Action;

export const useLocation = create<LatLngStore>()((set) => ({
  location: null,
  latLng: { lat: 0, lng: 0 },
  setLocation: async (latLng: State["latLng"]) => {
    set({ latLng });
    try {
      const geocoder = new google.maps.Geocoder();
      const { results } = await geocoder.geocode({ location: latLng });

      if (results && results[0]) {
        // Successful reverse geocoding
        // console.log("Location:", results[0]);
        set({ location: results[0] });
      } else {
        console.log("No location found for given coordinates.");
      }
    } catch (error) {
      console.log("Error fetching location:", error);
    }
  },
}));
