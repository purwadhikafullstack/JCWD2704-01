import { axiosInstanceSSR } from "@/lib/axios.server-config";
import { TCategory } from "@/models/category.model";
import { SearchParams } from "@/models/search.params";

export async function fetchCategories(): Promise<TCategory[] | undefined> {
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
  try {
    const res = await axiosInstanceSSR().get(`/categories/sub-categories/names`, { params });
    return res.data.results.sub_categories;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }
  }
}

export async function fetchSubCategoriesWithCatName(category_name?: string) {
  try {
    const res = await axiosInstanceSSR().get(`/categories/sub-categories/names`, { params: { category_name } });
    return res.data.results.sub_categories;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }
  }
}
