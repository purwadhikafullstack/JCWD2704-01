import { axiosInstance } from "@/lib/axios.config";

export async function fetchAllCities() {
  const res = await axiosInstance().get(`/cities`);
  return res.data.results;
}
