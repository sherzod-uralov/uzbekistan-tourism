"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  useBooking,
  useCreateCheckout,
  useCancelBooking,
} from "@/hooks/use-bookings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Calendar,
  MapPin,
  Users,
  Phone,
  Mail,
  CreditCard,
  ArrowLeft,
  ExternalLink,
  X,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = Number(params.id);
  const { data: booking, isLoading, error } = useBooking(bookingId);
  const createCheckout = useCreateCheckout();
  const cancelBooking = useCancelBooking();
  const [isProcessing, setIsProcessing] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Booking not found
          </h2>
          <p className="text-gray-500 mb-6">
            The booking you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => router.push("/profile")}
            variant="outline"
            className="border-gray-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
        </div>
      </div>
    );
  }

  const statusColors = {
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    confirmed: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
    completed: "bg-blue-50 text-blue-700 border-blue-200",
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

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setIsProcessing(true);
      try {
        await cancelBooking.mutateAsync(booking.id);
        router.push("/profile");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-gray-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900">
                Booking Details
              </h1>
              <p className="text-gray-500 mt-2">Booking ID: #{booking.id}</p>
            </div>
            <Badge className={`${statusColors[booking.status]} border`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tour Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-light">
                    Tour Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {booking.tour && (
                    <div className="flex gap-6">
                      <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            booking.tour.images[0] ||
                            "/placeholder.svg?height=100&width=150"
                          }
                          alt={booking.tour.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-light text-gray-900 mb-2">
                          {booking.tour.title}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            <span>{booking.tour.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(
                                booking.tour.startDate,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 border-gray-200"
                          asChild
                        >
                          <a
                            href={`/tours/${booking.tour.id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <ExternalLink className="h-3 w-3 mr-2" />
                            View Tour Details
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Booking Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-light">
                    Booking Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 text-sm">
                        Travel Information
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-600">
                            {booking.numberOfPeople} people
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-600">
                            Booked on{" "}
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 text-sm">
                        Contact Information
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-600">
                            {booking.contactPhone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-600">
                            {booking.contactEmail}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {booking.specialRequests && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 text-sm">
                        Special Requests
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-600 text-xs">
                          {booking.specialRequests}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-light">
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Total Amount:</span>
                    <span className="text-2xl font-light text-gray-900">
                      ${booking.totalPrice}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">
                      Payment Status:
                    </span>
                    <span
                      className={`text-sm ${booking.isPaid ? "text-green-600" : "text-yellow-600"}`}
                    >
                      {booking.isPaid ? "Paid ✓" : "Pending"}
                    </span>
                  </div>

                  {booking.paymentId && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Payment ID:</span>
                      <span className="font-mono text-gray-700">
                        {booking.paymentId}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-light">Actions</CardTitle>
                  <CardDescription className="text-gray-500">
                    Manage your booking
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {booking.status === "pending" && !booking.isPaid && (
                    <Button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {isProcessing ? "Processing..." : "Pay Now"}
                    </Button>
                  )}

                  {(booking.status === "pending" ||
                    booking.status === "confirmed") && (
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isProcessing}
                      className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-2" />
                      {isProcessing ? "Cancelling..." : "Cancel Booking"}
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => router.push("/profile")}
                    className="w-full border-gray-200"
                  >
                    View All Bookings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Meeting Point */}
            {booking.tour && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="border border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">
                      Meeting Point
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-900">
                            {booking.tour.meetingPoint}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Please arrive 15 minutes before departure time
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
