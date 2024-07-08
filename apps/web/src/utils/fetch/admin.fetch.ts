import { axiosInstance } from "@/lib/axios.config";
import { StoreAdminSearchParams } from "@/models/search.params";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

export async function fetchStoreAdminData(params: StoreAdminSearchParams) {
  try {
    const res = await axiosInstance().get("/admin/users/store-admins", {
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
    const res = await axiosInstance().get("/admin/users/customers", {
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

export async function updateStoreAdmin(
  id: string | undefined,
  data: Record<string, any>,
) {
  console.log(id);

  try {
    await axiosInstance().patch(`/admin/users/store-admins/${id}`, {
      ...data,
    });
    toast.success("Store admin data updated.");
    window.location.reload();
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
      toast.error("Failed to edit store admin data.");
    }
  }
}

export async function deleteStoreAdmin(id: string | undefined) {
  try {
    await axiosInstance().delete(`/admin/users/store-admins/${id}`);
    toast.success("Store admin deleted.");
    window.location.reload();
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
      toast.error("Failed to delete store admin.");
    }
  }
}
