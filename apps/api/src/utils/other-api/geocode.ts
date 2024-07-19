import { GEOCODING_API, GMAPS_API_KEY } from '@/config';
import axios from 'axios';

export async function getLatLngFromAddress(address: string) {
  const res = await axios.get(`${GEOCODING_API}?address=${address}&key=${GMAPS_API_KEY}`);
  return res.data.results[0].geometry;
}
