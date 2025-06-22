import { apiClient } from "@/lib/axios";
import { Category } from "@/types/categories.types";

export const categoriesService = {
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get<Category[]>("/categories");
    return response.data;
  },
};
