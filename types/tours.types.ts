import { Tour } from "@/types/index";

export interface TourFilters {
  searchTerm?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
  minDuration?: number;
  maxDuration?: number;
  category?: string;
  difficulty?: string;
  minAvailableSeats?: number;
  page?: number;
  limit?: number;
}

export interface ToursResponse {
  tours: Tour[];
  total: number;
  page: number;
  limit: number;
}
