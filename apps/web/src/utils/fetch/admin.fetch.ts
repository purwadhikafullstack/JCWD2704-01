import { axiosInstance } from "@/lib/axios.config";
import { StoreAdminSearchParams } from "@/models/search.params";

export async function fetchStoreAdminData(params: StoreAdminSearchParams) {
  try {
    const res = await axiosInstance().get("/admin/users/store-admins", {
      params,
    });
    return res.data.results;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}
