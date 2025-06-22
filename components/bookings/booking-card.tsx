"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCancelBooking, useCreateCheckout } from "@/hooks/use-bookings";
import {
  Calendar,
  MapPin,
  Users,
  CreditCard,
  X,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import type { Booking } from "@/types";
import { ReviewModal } from "@/components/modals/comment-modal";

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const cancelBooking = useCancelBooking();
  const createCheckout = useCreateCheckout();

  const statusColors = {
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    confirmed: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
    completed: "bg-blue-50 text-blue-700 border-blue-200",
  };

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setIsProcessing(true);
      try {
        await cancelBooking.mutateAsync(booking.id);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const result = await createCheckout.mutateAsync({
        bookingId: booking.id,
        data: {
          successUrl: `${window.location.origin}/payment/success?booking=${booking.id}`,
          cancelUrl: `${window.location.origin}/payment/cancel?booking=${booking.id}`,
        },
      });
      window.location.href = result.url;
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group"
      >
        <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="relative w-full lg:w-80 h-48 lg:h-56 flex-shrink-0">
                <Image
                  src={
                    booking.tour?.images?.[0] ||
                    "/placeholder.svg?height=200&width=300"
                  }
                  alt={booking.tour?.title || "Tour"}
                  fill
                  className="object-cover aspect-1/2"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    className={`${statusColors[booking.status]} border text-xs`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="flex-1 mb-4 lg:mb-0 lg:pr-6">
                        <h3 className="text-xl font-light text-gray-900 mb-2 line-clamp-2">
                          {booking.tour?.title}
                        </h3>
                        <p className="text-gray-500 line-clamp-2 text-sm">
                          {booking.tour?.description}
                        </p>
                      </div>
                      <div className="text-left lg:text-right flex-shrink-0">
                        <div className="text-2xl font-light text-gray-900">
                          ${booking.totalPrice}
                        </div>
                        <div className="text-xs text-gray-500">
                          Booking #{booking.id}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">
                          {new Date(
                            booking.tour?.startDate || "",
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">
                          {booking.tour?.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 flex-shrink-0" />
                        <span>{booking.numberOfPeople} people</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-3 w-3 flex-shrink-0" />
                        <span>{booking.isPaid ? "Paid" : "Pending"}</span>
                      </div>
                    </div>

                    {booking.specialRequests && (
                      <div className="mb-4">
                        <h4 className="text-xs font-medium text-gray-700 mb-1">
                          Special Requests:
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {booking.specialRequests}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    {booking.tour && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-200 text-xs"
                        asChild
                      >
                        <Link href={`/tours/${booking.tour.id}`}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Tour
                        </Link>
                      </Button>
                    )}

                    {booking.status === "pending" && !booking.isPaid && (
                      <Button
                        size="sm"
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="bg-gray-900 hover:bg-gray-800 text-white text-xs"
                      >
                        {isProcessing ? "Processing..." : "Pay Now"}
                      </Button>
                    )}

                    {(booking.status === "pending" ||
                      booking.status === "confirmed") && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        disabled={isProcessing}
                        className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
                      >
                        <X className="h-3 w-3 mr-1" />
                        {isProcessing ? "Cancelling..." : "Cancel"}
                      </Button>
                    )}

                    {/* Review Button - Only for completed tours */}
                    {booking.status === "completed" && booking.tour && (
                      <Button
                        size="sm"
                        onClick={() => setShowReviewModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Write Review
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Review Modal */}
      {booking.tour && (
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          tourId={booking.tour.id}
          tourTitle={booking.tour.title}
        />
      )}
    </>
  );
}
