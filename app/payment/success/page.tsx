"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useBooking } from "@/hooks/use-bookings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("booking");
  const { data: booking, isLoading } = useBooking(Number(bookingId));

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Booking not found
          </h2>
          <p className="text-gray-500 mb-6">
            We couldn't find your booking details.
          </p>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="border-gray-200"
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>

          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Payment Successful
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Your booking has been confirmed. Get ready for an amazing adventure
            in Uzbekistan!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-900 text-white">
              <CardTitle className="text-2xl font-light">
                Booking Confirmation
              </CardTitle>
              <CardDescription className="text-gray-300">
                Booking ID: #{booking.id}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Tour Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-light text-gray-900 mb-4">
                      Tour Details
                    </h3>
                    <div className="space-y-3">
                      <h4 className="text-lg text-gray-900">
                        {booking.tour?.title}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>{booking.tour?.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(
                            booking.tour?.startDate || "",
                          ).toLocaleDateString()}{" "}
                          -{" "}
                          {new Date(
                            booking.tour?.endDate || "",
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Users className="h-4 w-4" />
                        <span>{booking.numberOfPeople} people</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-light text-gray-900 mb-4">
                      Meeting Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 mb-2">
                        Meeting Point:
                      </p>
                      <p className="text-sm text-gray-900">
                        {booking.tour?.meetingPoint}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-light text-gray-900 mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Phone className="h-4 w-4" />
                        <span>{booking.contactPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Mail className="h-4 w-4" />
                        <span>{booking.contactEmail}</span>
                      </div>
                    </div>
                  </div>

                  {booking.specialRequests && (
                    <div>
                      <h3 className="text-xl font-light text-gray-900 mb-4">
                        Special Requests
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                          {booking.specialRequests}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-light text-gray-900 mb-4">
                      Payment Summary
                    </h3>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">
                          Total Amount:
                        </span>
                        <span className="text-2xl font-light text-green-700">
                          ${booking.totalAmount}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-gray-600 text-sm">Status:</span>
                        <span className="text-green-600 text-sm">Paid ✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-light text-gray-900 mb-4">
                  What's Next?
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span>
                      You'll receive a confirmation email with detailed
                      itinerary within 24 hours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Our team will contact you 48 hours before departure with
                      final details
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Make sure to bring your passport and any required
                      documents
                    </span>
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  onClick={() => router.push("/profile")}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                >
                  View My Bookings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/tours")}
                  className="flex-1 border-gray-200"
                >
                  Browse More Tours
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
