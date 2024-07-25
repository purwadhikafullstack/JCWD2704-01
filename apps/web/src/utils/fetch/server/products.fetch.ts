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

export async function fetchProductsByStoreID(filter: string, store_id: string, search?: string, page: number = 1) {
  try {
    const res = await axiosInstanceSSR().get("/store/products", {
      params: {
        filter,
        store_id,
        search,
        page,
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

export async function fetchProductDetailsByStoreID(store_id: string, name: string) {
  try {
    const res = await axiosInstanceSSR().get(`/store/products/${name}`, { params: { store_id } });
    return res.data.results;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }
  }
}
