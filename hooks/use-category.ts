import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "@/services/categories.service";

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoriesService.getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
