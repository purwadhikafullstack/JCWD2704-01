import { axiosInstanceCSR } from "@/lib/axios.client-config";
import { AxiosError } from "axios";

export async function fetchAllCitiesClient() {
  try {
    const res = await axiosInstanceCSR().get(`/cities`);
    return res.data.results;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
    }
  }
}
