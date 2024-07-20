import { axiosInstanceSSR } from "@/lib/axios.server-config";
import { SearchParams } from "@/models/search.params";

export async function fetchCategories() {
  try {
    const res = await axiosInstanceSSR().get("/categories");
    return res.data.results;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }
  }
}

export async function fetchCategoryNames(params: SearchParams) {
  try {
    const res = await axiosInstanceSSR().get("/categories/names", {
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

export async function fetchCategoriesWithPagination(params: SearchParams) {
  try {
    const res = await axiosInstanceSSR().get("/categories", {
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

export async function fetchSubCategories(params?: SearchParams) {
  try {
    const res = await axiosInstanceSSR().get(
      "/categories/sub-categories",
      params && {
        params,
      },
    );
    return res.data.results;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }
  }
}

export async function fetchSubCategoriesWithCatID(params: SearchParams) {
  const { category_id } = params;
  try {
    const res = await axiosInstanceSSR().get(`/categories/${category_id}`);
    return res.data.results.sub_categories;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }
  }
}
