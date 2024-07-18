import { axiosInstanceSSR } from "@/lib/axios.server-config";
import { StoreAdminSearchParams } from "@/models/search.params";

export async function fetchStoreAdminData(params: StoreAdminSearchParams) {
  try {
    const res = await axiosInstanceSSR().get("/admin/users/store-admins", {
      params,
    });
    return res.data.results;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }
  }
}

export async function fetchCustomersData(params: StoreAdminSearchParams) {
  try {
    const res = await axiosInstanceSSR().get("/admin/users/customers", {
      params,
    });
    return res.data.results;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }
  }
}
