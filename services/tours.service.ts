import { apiClient } from "@/lib/axios"
import type { Tour } from "@/types"

export const toursService = {
  async getAllTours(): Promise<Tour[]> {
    const response = await apiClient.get<Tour[]>("/tours")
    return response.data
  },

  async getTourById(id: number): Promise<Tour> {
    const response = await apiClient.get<Tour>(`/tours/${id}`)
    return response.data
  },

  async getToursByCategory(category: string): Promise<Tour[]> {
    const response = await apiClient.get<Tour[]>(`/tours/category/${category}`)
    return response.data
  },

  async getAvailableTours(): Promise<Tour[]> {
    const response = await apiClient.get<Tour[]>("/tours/available")
    return response.data
  },

  async getToursByDateRange(startDate: string, endDate: string): Promise<Tour[]> {
    const response = await apiClient.get<Tour[]>("/tours/date-range", {
      params: { startDate, endDate },
    })
    return response.data
  },
}
