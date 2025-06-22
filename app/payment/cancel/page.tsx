"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useBooking } from "@/hooks/use-bookings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { XCircle, ArrowLeft, CreditCard, RefreshCw } from "lucide-react"

export default function PaymentCancelPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const bookingId = searchParams.get("booking")
  const { data: booking, isLoading } = useBooking(Number(bookingId))

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const handleRetryPayment = () => {
    if (booking) {
      router.push(`/tours/${booking.tourId}`)
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6"
          >
            <XCircle className="h-12 w-12 text-red-600" />
          </motion.div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Cancelled</h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Your payment was cancelled. Don't worry, your booking is still reserved for a limited time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
              <CardTitle className="text-2xl">What Happened?</CardTitle>
              <CardDescription className="text-red-100">Your payment process was interrupted</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              {booking && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Your Booking Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking ID:</span>
                      <span className="font-medium">#{booking.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tour:</span>
                      <span className="font-medium">{booking.tour?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium text-lg">${booking.totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-yellow-600 font-medium">Payment Pending</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">What You Can Do</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Try the payment process again with the same or different payment method</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <RefreshCw className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Your booking is temporarily reserved - you can complete payment later</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Contact our support team if you continue experiencing issues</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleRetryPayment} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Try Payment Again
                </Button>
                <Button variant="outline" onClick={() => router.push("/profile")} className="flex-1">
                  View My Bookings
                </Button>
              </div>

              <div className="mt-6 text-center">
                <Button variant="ghost" onClick={() => router.push("/")} className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
