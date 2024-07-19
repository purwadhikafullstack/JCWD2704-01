import { z } from "zod";

const googleMapsApiKey = z.string().parse(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY);
const mapId = z.string().parse(process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID);

export { googleMapsApiKey, mapId };
