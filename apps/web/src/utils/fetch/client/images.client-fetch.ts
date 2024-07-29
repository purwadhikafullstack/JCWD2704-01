import { axiosInstanceCSR } from "@/lib/axios.client-config";
import { AxiosError } from "axios";

export async function renderImage(id: string) {
  try {
    const image = await axiosInstanceCSR().get(`/images/${id}`);
    return image;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
    }
  }
}
