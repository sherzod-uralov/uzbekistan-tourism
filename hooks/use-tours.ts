import { useQuery } from "@tanstack/react-query";
import { toursService } from "@/services/tours.service";
import { TourFilters } from "@/types/tours.types";

export const useTours = () => {
  return useQuery({
    queryKey: ["tours"],
    queryFn: toursService.getAllTours,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
export const useToursSearch = (filters: TourFilters = {}) => {
  return useQuery({
    queryKey: ["tours", filters],
    queryFn: () => toursService.getAllToursSearch(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
export const useTour = (id: number) => {
  return useQuery({
    queryKey: ["tour", id],
    queryFn: () => toursService.getTourById(id),
    enabled: !!id,
  });
};

export const useToursByCategory = (category: string) => {
  return useQuery({
    queryKey: ["tours", "category", category],
    queryFn: () => toursService.getToursByCategory(category),
    enabled: !!category,
  });
};

export const useAvailableTours = () => {
  return useQuery({
    queryKey: ["tours", "available"],
    queryFn: toursService.getAvailableTours,
  });
};
