import { axiosInstanceCSR } from "@/lib/axios.client-config";
import { AxiosError } from "axios";

export async function fetchAllCities() {
  try {
    const res = await axiosInstanceCSR().get(`/cities`);
    console.log("TEST", res.data);
    return res.data.results;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
    }
  }
}
