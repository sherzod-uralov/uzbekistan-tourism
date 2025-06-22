import { apiClient } from "@/lib/axios";
import type { Tour } from "@/types";
import { TourFilters, ToursResponse } from "@/types/tours.types";

export const toursService = {
  async getAllTours(): Promise<Tour[]> {
    const response = await apiClient.get<Tour[]>("/tours");
    return response.data;
  },
  async getAllToursSearch(filters: TourFilters = {}): Promise<ToursResponse> {
    // Create query parameters from filters
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });

    const response = await apiClient.get<ToursResponse>(
      `/tours/search/tours${params.toString() ? `?${params.toString()}` : ""}`,
    );
    return response.data;
  },
  async getTourById(id: number): Promise<Tour> {
    const response = await apiClient.get<Tour>(`/tours/${id}`);
    return response.data;
  },

  async getToursByCategory(category: string): Promise<Tour[]> {
    const response = await apiClient.get<Tour[]>(`/tours/category/${category}`);
    return response.data;
  },

  async getAvailableTours(): Promise<Tour[]> {
    const response = await apiClient.get<Tour[]>("/tours/available");
    return response.data;
  },

  async getToursByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<Tour[]> {
    const response = await apiClient.get<Tour[]>("/tours/date-range", {
      params: { startDate, endDate },
    });
    return response.data;
  },
};
