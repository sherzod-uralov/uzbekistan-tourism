"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookingsService } from "@/services/bookings.service";
import type { CheckoutData } from "@/types";
import { toast } from "sonner";

export const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: bookingsService.getMyBookings,
  });
};

export const useBooking = (id: number) => {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: () => bookingsService.getBookingById(id),
    enabled: !!id,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingsService.createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Booking failed");
    },
  });
};

export const useCreateCheckout = () => {
  return useMutation({
    mutationFn: ({
      bookingId,
      data,
    }: {
      bookingId: number;
      data: CheckoutData;
    }) => bookingsService.createCheckout(bookingId, data),
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Checkout failed");
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingsService.cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking cancelled successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Cancellation failed");
    },
  });
};
