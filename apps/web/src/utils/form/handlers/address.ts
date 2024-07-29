import { UserCreateAddressType } from "@/schemas/address.schema";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { userAddressAction } from "../actions/address";
import { axiosInstanceCSR } from "@/lib/axios.client-config";

export const userAddressSubmit = async (payload: UserCreateAddressType) => {
  try {
    const response = await userAddressAction(payload);
    toast.success(response.data.message, { richColors: false });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      toast.error(error.response?.data.message, {
        description: error.response?.data.cause,
        position: "top-right",
      });
    } else if (error instanceof Error) {
      toast.error(error.message, {
        description: error.cause ? (error.cause as string) : "",
        position: "top-right",
      });
    } else {
      toast.error(`${error}`, { position: "top-right" });
    }
  }
};

export const userAddressDeleteSubmit = async () => {
  try {
    const response = await axiosInstanceCSR().delete("/addresses/user");
    window.location.reload();
    toast.success(response.data.message, { richColors: false });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      toast.error(error.response?.data.message, {
        description: error.response?.data.cause,
        position: "top-right",
      });
    } else if (error instanceof Error) {
      toast.error(error.message, {
        description: error.cause ? (error.cause as string) : "",
        position: "top-right",
      });
    } else {
      toast.error(`${error}`, { position: "top-right" });
    }
  }
};