import { axiosInstance } from "@/lib/axios.config";
import { TCity } from "@/models/address.model";

export async function fetchAllCities(): Promise<TCity[]> {
  const res = await axiosInstance().get(`/cities`);
  return res.data.results;
}
