"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, Star } from "lucide-react";
import type { Tour } from "@/types";
import { useTourRating } from "@/hooks/use-comments";

interface TourCardProps {
  tour: Tour;
  index?: number;
}

export function TourCard({ tour, index = 0 }: TourCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { data: rating } = useTourRating(tour.id);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={tour.images[0] || "/placeholder.svg?height=256&width=400"}
            alt={tour.title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}

          <div className="absolute top-4 left-4 flex gap-2">
            <Badge
              variant="secondary"
              className="bg-white/90 text-gray-700 text-xs"
            >
              {tour.category}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-white/90 text-gray-700 text-xs"
            >
              {tour.difficulty}
            </Badge>
          </div>

          <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-700">
                {rating?.averageRating
                  ? rating.averageRating.toFixed(1)
                  : "New"}
              </span>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-light text-gray-900 mb-2 line-clamp-1">
                {tour.title}
              </h3>
              <p className="text-gray-500 h-10 text-sm line-clamp-2">
                {tour.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{tour.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>{tour.duration} days</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>{new Date(tour.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                <span>{tour.availableSeats} seats</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <span className="text-2xl font-light text-gray-900">
                  ${tour.price}
                </span>
                <span className="text-gray-500 text-sm ml-1">per person</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200"
                asChild
              >
                <Link href={`/tours/${tour.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
