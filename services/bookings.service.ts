import { apiClient } from "@/lib/axios"
import type { Booking, CreateBookingData, CheckoutData, CheckoutResponse } from "@/types"

export const bookingsService = {
  async createBooking(data: CreateBookingData): Promise<Booking> {
    const response = await apiClient.post<Booking>("/bookings", data)
    return response.data
  },

  async getMyBookings(): Promise<Booking[]> {
    const response = await apiClient.get<Booking[]>("/bookings/my-bookings")
    return response.data
  },

  async getBookingById(id: number): Promise<Booking> {
    const response = await apiClient.get<Booking>(`/bookings/${id}`)
    return response.data
  },

  async updateBooking(id: number, data: Partial<Booking>): Promise<Booking> {
    const response = await apiClient.patch<Booking>(`/bookings/${id}`, data)
    return response.data
  },

  async cancelBooking(id: number): Promise<void> {
    await apiClient.post(`/bookings/${id}/cancel`)
  },

  async createCheckout(bookingId: number, data: CheckoutData): Promise<CheckoutResponse> {
    const response = await apiClient.post<CheckoutResponse>(`/lemon-squeezy/create-checkout/${bookingId}`, data)
    return response.data
  },

  async verifyPayment(bookingId: number, orderId: string): Promise<void> {
    await apiClient.post(`/lemon-squeezy/verify-payment/${bookingId}`, { orderId })
  },
}
