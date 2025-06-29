"use client";

import type React from "react";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTour } from "@/hooks/use-tours";
import { useCreateBooking } from "@/hooks/use-bookings";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Calendar,
  Users,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  ArrowLeft,
  MapPin,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { CommentForm } from "@/components/comments/comment-form";
import { CommentList } from "@/components/comments/comment-list";
import { RatingSummary } from "@/components/comments/comment-summary";
import { RatingDisplay } from "@/components/comments/rating-display";

export default function TourDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = Number(params.id);
  const { data: tour, isLoading, error } = useTour(tourId);
  const { isAuthenticated } = useAuth();
  const createBooking = useCreateBooking();

  const [bookingData, setBookingData] = useState({
    numberOfPeople: 1,
    specialRequests: "",
    contactPhone: "",
    contactEmail: "",
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <LoadingSpinner size="lg" />
        </motion.div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Tour not found
          </h2>
          <p className="text-gray-500 mb-8">
            The tour you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => router.push("/tours")}
            variant="outline"
            className="border-gray-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tours
          </Button>
        </motion.div>
      </div>
    );
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    createBooking.mutate(
      {
        tourId: tour.id,
        ...bookingData,
      },
      {
        onSuccess: (booking) => {
          setShowBookingForm(false);
          router.push(`/bookings/${booking.id}`);
        },
      },
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + tour.images.length) % tour.images.length,
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-50"
      >
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="sm"
          className="bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white border border-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={
                tour.images[currentImageIndex] ||
                "/placeholder.svg?height=1080&width=1920"
              }
              alt={tour.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Image Navigation */}
        {tour.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {tour.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-white w-8"
                      : "bg-white/50 w-1"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end z-20">
          <div className="w-full max-w-7xl mx-auto px-6 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                <Badge
                  variant="secondary"
                  className="bg-white/90 text-gray-700 border-0"
                >
                  {tour.category}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/90 text-gray-700 border-0"
                >
                  {tour.difficulty}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-light text-white mb-4 leading-tight">
                {tour.title}
              </h1>

              {/* Location */}
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-4 w-4 text-white/80" />
                <span className="text-white/90">{tour.location}</span>
              </div>

              {/* Quick Info */}
              <div className="flex gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{tour.duration} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <RatingDisplay tourId={tour.id} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    ${tour.price} per person
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Overview
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {tour.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-8 py-8 border-t border-b border-gray-100">
                {[
                  {
                    icon: Clock,
                    label: "Duration",
                    value: `${tour.duration} days`,
                  },
                  {
                    icon: Users,
                    label: "Available",
                    value: `${tour.availableSeats} seats`,
                  },
                  {
                    icon: Calendar,
                    label: "Starts",
                    value: new Date(tour.startDate).toLocaleDateString(),
                  },
                  {
                    icon: Star,
                    label: "Rating",
                    value: (
                      <RatingDisplay
                        tourId={tour.id}
                        compact
                        className="text-gray-900"
                      />
                    ),
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <stat.icon className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                    <div className="font-medium text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Itinerary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Itinerary
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {tour.itinerary}
                </p>
              </div>
            </motion.div>

            {/* Included/Excluded */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-gray-400" />
                  What's included
                </h3>
                <ul className="space-y-2">
                  {tour.includedServices.split(",").map((service, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{service.trim()}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-light text-gray-900 mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-gray-400" />
                  Not included
                </h3>
                <ul className="space-y-2">
                  {tour.excludedServices.split(",").map((service, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <XCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{service.trim()}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <Card className="border border-gray-100 shadow-sm bg-white">
                <CardContent className="p-6">
                  {/* Price */}
                  <div className="text-center mb-6 pb-6 border-b border-gray-100">
                    <div className="text-3xl font-light text-gray-900 mb-1">
                      ${tour.price}
                    </div>
                    <div className="text-sm text-gray-500">per person</div>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Star className="h-4 w-4 text-gray-400" />
                      <RatingDisplay tourId={tour.id} compact />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Start date</span>
                      <span className="text-gray-900">
                        {new Date(tour.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">End date</span>
                      <span className="text-gray-900">
                        {new Date(tour.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Meeting point</span>
                      <span className="text-gray-900 text-right">
                        {tour.meetingPoint}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mb-6">
                    <Button
                      onClick={() => setIsLiked(!isLiked)}
                      variant="outline"
                      size="sm"
                      className="border-gray-200"
                    >
                      <Heart
                        className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                      />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Booking Form */}
                  <AnimatePresence>
                    {!showBookingForm ? (
                      <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Button
                          onClick={() => setShowBookingForm(true)}
                          disabled={tour.availableSeats === 0}
                          className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                        >
                          {tour.availableSeats === 0
                            ? "Fully booked"
                            : "Book now"}
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleBookingSubmit}
                        className="space-y-4"
                      >
                        <div>
                          <Label
                            htmlFor="numberOfPeople"
                            className="text-sm text-gray-700"
                          >
                            Number of people
                          </Label>
                          <Input
                              disabled={true}
                            id="numberOfPeople"
                            type="number"
                            min="1"
                            max={tour.availableSeats}
                            value={bookingData.numberOfPeople}
                            onChange={(e) =>
                              setBookingData((prev) => ({
                                ...prev,
                                numberOfPeople: Number(e.target.value),
                              }))
                            }
                            className="mt-1 border-gray-200 focus:border-gray-400 focus:ring-0"
                            required
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="contactPhone"
                            className="text-sm text-gray-700"
                          >
                            Phone number
                          </Label>
                          <div className="relative mt-1">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              id="contactPhone"
                              type="tel"
                              value={bookingData.contactPhone}
                              onChange={(e) =>
                                setBookingData((prev) => ({
                                  ...prev,
                                  contactPhone: e.target.value,
                                }))
                              }
                              className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-0"
                              placeholder="+998 90 123 45 67"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label
                            htmlFor="contactEmail"
                            className="text-sm text-gray-700"
                          >
                            Email address
                          </Label>
                          <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              id="contactEmail"
                              type="email"
                              value={bookingData.contactEmail}
                              onChange={(e) =>
                                setBookingData((prev) => ({
                                  ...prev,
                                  contactEmail: e.target.value,
                                }))
                              }
                              className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-0"
                              placeholder="your@email.com"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label
                            htmlFor="specialRequests"
                            className="text-sm text-gray-700"
                          >
                            Special requests (optional)
                          </Label>
                          <Textarea
                            id="specialRequests"
                            value={bookingData.specialRequests}
                            onChange={(e) =>
                              setBookingData((prev) => ({
                                ...prev,
                                specialRequests: e.target.value,
                              }))
                            }
                            placeholder="Any special requirements..."
                            rows={3}
                            className="mt-1 border-gray-200 focus:border-gray-400 focus:ring-0"
                          />
                        </div>

                        {/* Total */}
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-700">Total</span>
                            <span className="text-xl font-light text-gray-900">
                              $
                              {(
                                Number(tour.price) * bookingData.numberOfPeople
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowBookingForm(false)}
                            className="flex-1 border-gray-200"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={createBooking.isPending}
                            className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                          >
                            {createBooking.isPending ? (
                              <div className="flex items-center gap-2">
                                <LoadingSpinner size="sm" />
                                Booking...
                              </div>
                            ) : (
                              "Confirm"
                            )}
                          </Button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 border-t border-gray-100">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                Reviews & Ratings
              </h2>
              <RatingSummary tourId={tour.id} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-light text-gray-900 mb-6">
                Customer Reviews
              </h3>
              <CommentList tourId={tour.id} />
            </motion.div>
          </div>

          <div>
            <CommentForm tourId={tour.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
