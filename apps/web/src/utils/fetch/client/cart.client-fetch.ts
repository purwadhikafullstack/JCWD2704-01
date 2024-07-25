import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

export async function addToCart(data: Record<string, any>) {
  try {
    await axiosInstance().post("/cart", { data });
    toast.success("Product added to cart.");
    window.location.reload();
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
      toast.error(error.response?.data.message);
    }
  }
}
