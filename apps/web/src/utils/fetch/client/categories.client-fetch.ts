import { axiosInstanceCSR } from "@/lib/axios.client-config";
import { SearchParams } from "@/models/search.params";
import { AxiosError } from "axios";
import { toast } from "sonner";

export async function fetchCategoriesClient() {
  try {
    const res = await axiosInstanceCSR().get("/categories");
    return res.data.results;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}

export async function fetchCategoryNamesClient(search: string) {
  try {
    const res = await axiosInstanceCSR().get("/categories/names", {
      params: { search },
    });
    return res.data.results;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}

export async function fetchCategoriesWithPaginationClient(params: SearchParams) {
  try {
    const res = await axiosInstanceCSR().get("/categories", {
      params,
    });
    return res.data.results.categories;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}

export async function fetchSubCategoriesClient(params?: SearchParams) {
  try {
    const res = await axiosInstanceCSR().get(
      "/categories/sub-categories",
      params && {
        params,
      },
    );
    return res.data.results;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}

export async function fetchSubCategoriesWithCatIDClient(category_id: string) {
  try {
    const res = await axiosInstanceCSR().get(`/categories/sub-categories/names`, {
      params: {
        category_id,
      },
    });
    return res.data.results.sub_categories;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}

export async function createNewCategory(data: Record<string, any>) {
  try {
    await axiosInstanceCSR().post(
      "/categories",
      { ...data },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    toast.success("New category added.");
    window.location.reload();
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error("Category name already exists.");
    }
  }
}

export async function updateCategory(id: number, data: Record<string, any>) {
  try {
    await axiosInstanceCSR().patch(
      `/categories/${id}`,
      { ...data },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    toast.success("Category successfully edited.");
    window.location.reload();
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error("Category name already exists.");
    }
  }
}

export async function deleteCategory(id: number) {
  try {
    await axiosInstanceCSR().delete(`/categories/${id}`);
    toast.success("Category deleted.");
    window.location.reload();
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
    }
  }
}

export async function createNewSubCat(data: Record<string, any>) {
  try {
    await axiosInstanceCSR().post("/categories/sub-categories", { ...data });
    toast.success("New sub-category added.");
    window.location.reload();
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error("Sub-category name already exists.");
    }
  }
}

export async function updateSubCat(id: number, data: Record<string, any>) {
  try {
    await axiosInstanceCSR().patch(`/categories/sub-categories/${id}`, { ...data });
    toast.success("Sub-category successfully edited.");
    window.location.reload();
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error("Sub-category name already exists.");
    }
  }
}

export async function deleteSubCat(id: number) {
  try {
    await axiosInstanceCSR().delete(`/categories/sub-categories/${id}`);
    toast.success("Sub-category deleted.");
    window.location.reload();
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
    }
  }
}
