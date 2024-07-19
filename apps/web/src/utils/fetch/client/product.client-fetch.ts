import { axiosInstanceCSR } from "@/lib/axios.client-config";
import { AxiosError } from "axios";
import { toast } from "sonner";

export async function createNewProduct(data: Record<string, any>) {
  try {
    await axiosInstanceCSR().post("/products", { ...data });
    toast.success("New product added.");
    window.location.reload();
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      toast.error(error.response?.data.message);
    }
  }
}

export async function updateProduct(id: string, data: Record<string, any>) {
  try {
    await axiosInstanceCSR().patch(`/products/${id}`, { ...data });
    toast.success("Product updated.");
    window.location.reload();
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      toast.error(error.response?.data.message);
    }
  }
}

export async function createNewVariant(data: Record<string, any>) {
  try {
    await axiosInstanceCSR().post(
      "/products/variants",
      { ...data },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    toast.success("New variant added.");
    window.location.reload();
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      toast.error(error.response?.data.message);
    }
  }
}

export async function updateVariant(id: string, data: Record<string, any>) {
  try {
    await axiosInstanceCSR().patch(
      `/products/variants/${id}`,
      { ...data },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    toast.success("Variant updated.");
    window.location.reload();
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      toast.error(error.response?.data.message);
    }
  }
}

export async function fetchProductIdsAndNamesClient() {
  try {
    const res = await axiosInstanceCSR().get("/products/all");
    return res.data.results;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }
  }
}

export async function deleteProduct(id: string) {
  try {
    await axiosInstanceCSR().delete(`/products/${id}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }
  }
}

export async function deleteVariant(id: string) {
  try {
    await axiosInstanceCSR().delete(`/products/variants/${id}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }
  }
}
