import { axiosInstanceSSR } from "@/lib/axios.server-config";
import { SearchParams } from "@/models/search.params";

export async function fetchStoreAdminData(params: SearchParams) {
  try {
    const res = await axiosInstanceSSR().get("/admin/users/store-admins", {
      params,
    });
    return res.data.results;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}

export async function fetchCustomersData(params: SearchParams) {
  try {
    const res = await axiosInstanceSSR().get("/admin/users/customers", {
      params,
    });
    return res.data.results;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}
