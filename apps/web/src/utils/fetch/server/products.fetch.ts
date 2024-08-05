import { axiosInstanceSSR } from "@/lib/axios.server-config";
import { SearchParams } from "@/models/search.params";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export async function fetchProductsWithVariants(params: SearchParams) {
  try {
    const res = await axiosInstanceSSR().get("/products/variants", {
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
export async function fetchProducts(params: SearchParams) {
  try {
    const res = await axiosInstanceSSR().get("/products", {
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

export async function fetchVariantsNamesIds(params: SearchParams) {
  try {
    const res = await axiosInstanceSSR().get("/products/variants/names-ids", {
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

export async function fetchProductIdsAndNames(params: SearchParams) {
  try {
    const res = await axiosInstanceSSR().get("/products/names-ids", {
      params: {
        search: params.search,
      },
    });
    return res.data.results;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }
  }
}

export async function fetchProductsByCityID(
  filter?: string,
  city_id?: number,
  search?: string,
  page: number = 1,
  min?: number,
  max?: number,
) {
  try {
    const res = await axiosInstanceSSR().get("/store/products", {
      params: { filter, city_id, search, page, min, max },
    });
    return res.data.results;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

export async function fetchProductDetailsByCityID(city_id: number, name: string) {
  try {
    const res = await axiosInstanceSSR().get(`/store/products/${name}`, { params: { city_id } });
    return res.data.results;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
