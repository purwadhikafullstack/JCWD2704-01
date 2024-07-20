import { axiosInstanceSSR } from "@/lib/axios.server-config";
import { SearchParams } from "@/models/search.params";

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
