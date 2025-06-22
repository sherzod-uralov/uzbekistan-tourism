"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TourCardProps {
  tour: {
    id: number | string;
    title: string;
    location: string;
    category: string;
    difficulty: string;
    price: number | string;
    duration: number;
    availableSeats: number;
    image?: string;
    description?: string;
    rating?: number;
    reviewCount?: number;
  };
  index: number;
}

export function TourCard({ tour, index }: TourCardProps) {
  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    moderate: "bg-yellow-100 text-yellow-800",
    challenging: "bg-orange-100 text-orange-800",
    difficult: "bg-red-100 text-red-800",
    extreme: "bg-purple-100 text-purple-800",
  };

  const categoryIcons = {
    historical: "🏛️",
    cultural: "🎭",
    eco: "🌿",
    luxury: "✨",
    adventure: "🏔️",
    culinary: "🍷",
    religious: "⛪",
    educational: "📚",
    wellness: "🧘",
    photography: "📸",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/tours/${tour.id}`}>
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
          <div className="aspect-video bg-gray-200 relative flex-shrink-0">
            <img
              src={tour.image || `/placeholder.svg?height=300&width=400`}
              alt={tour.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `/placeholder.svg?height=300&width=400`;
              }}
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge className="bg-white/90 text-gray-800">
                {categoryIcons[tour.category as keyof typeof categoryIcons] ||
                  "🎯"}{" "}
                {tour.category}
              </Badge>
              <Badge
                className={`${difficultyColors[tour.difficulty as keyof typeof difficultyColors] || "bg-gray-100 text-gray-800"}`}
              >
                {tour.difficulty}
              </Badge>
            </div>
            {tour.availableSeats <= 5 && tour.availableSeats > 0 && (
              <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                Only {tour.availableSeats} left!
              </Badge>
            )}
          </div>
          <CardContent className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
              {tour.title}
            </h3>
            <p className="text-gray-600 mb-3 flex items-center">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              {tour.location}
            </p>

            {tour.description && (
              <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                {tour.description}
              </p>
            )}

            <div className="mt-auto">
              <div className="flex justify-between items-center mb-3">
                <div className="text-2xl font-bold text-blue-600">
                  ${tour.price}
                </div>
                <div className="text-sm text-gray-500">
                  {tour.duration} day{tour.duration !== 1 ? "s" : ""}
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{tour.availableSeats} seats available</span>
                {tour.rating && (
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    <span>{tour.rating.toFixed(1)}</span>
                    {tour.reviewCount && (
                      <span className="ml-1">({tour.reviewCount})</span>
                    )}
                  </div>
                )}
                <button className="bg-white text-black border border-gray-200 px-2 py-1 rounded-md hover:bg-gray-100 transition-all duration-300 ">
                  Click for more information
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
