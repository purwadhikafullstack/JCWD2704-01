import { axiosInstanceSSR } from "@/lib/axios.server-config";
import { AxiosError } from "axios";

export async function fetchAllCities() {
  try {
    const res = await axiosInstanceSSR().get(`/cities`);
    return res.data.results;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
    }
  }
}
