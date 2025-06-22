"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTours } from "@/hooks/use-tours";
import { TourCard } from "@/components/tours/tour-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

export default function ToursPage() {
  const { data: tours, isLoading, error } = useTours();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");

  const filteredTours = useMemo(() => {
    if (!tours) return [];

    return tours.filter((tour) => {
      const matchesSearch =
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || tour.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === "all" || tour.difficulty === selectedDifficulty;

      let matchesPrice = true;
      if (priceRange !== "all") {
        const price = Number.parseFloat(tour.price);
        switch (priceRange) {
          case "under-200":
            matchesPrice = price < 200;
            break;
          case "200-500":
            matchesPrice = price >= 200 && price <= 500;
            break;
          case "over-500":
            matchesPrice = price > 500;
            break;
        }
      }

      return (
        matchesSearch && matchesCategory && matchesDifficulty && matchesPrice
      );
    });
  }, [tours, searchQuery, selectedCategory, selectedDifficulty, priceRange]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setPriceRange("all");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "all" ||
    selectedDifficulty !== "all" ||
    priceRange !== "all";

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-500">
            Unable to load tours. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Our Tours
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
              Discover amazing destinations and create unforgettable memories
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-0"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-40 border-gray-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="historical">Historical</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger className="w-40 border-gray-200">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="challenging">Challenging</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40 border-gray-200">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-200">Under $200</SelectItem>
                  <SelectItem value="200-500">$200 - $500</SelectItem>
                  <SelectItem value="over-500">Over $500</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="border-gray-200"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4">
              {searchQuery && (
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-700"
                >
                  Search: {searchQuery}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => setSearchQuery("")}
                  />
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-700"
                >
                  Category: {selectedCategory}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => setSelectedCategory("all")}
                  />
                </Badge>
              )}
              {selectedDifficulty !== "all" && (
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-700"
                >
                  Difficulty: {selectedDifficulty}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => setSelectedDifficulty("all")}
                  />
                </Badge>
              )}
              {priceRange !== "all" && (
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-700"
                >
                  Price: {priceRange}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => setPriceRange("all")}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredTours.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                No tours found
              </h3>
              <p className="text-gray-500 mb-6">
                {hasActiveFilters
                  ? "Try adjusting your filters to see more results."
                  : "No tours are currently available."}
              </p>
              {hasActiveFilters && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="border-gray-200"
                >
                  Clear Filters
                </Button>
              )}
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <p className="text-gray-500">
                  Showing {filteredTours.length} of {tours?.length || 0} tours
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTours.map((tour, index) => (
                  <TourCard key={tour.id} tour={tour} index={index} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
