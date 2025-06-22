"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Calendar,
  MapPin,
  DollarSign,
  Filter,
  ChevronDown,
  ChevronUp,
  Users,
  Mountain,
  Tag,
} from "lucide-react";
import { useToursSearch } from "@/hooks/use-tours";
import { TourCard } from "@/components/tours/tour-card-enxanced";
import { useToursFilters } from "@/hooks/use-tour-filters";

import { TourFiltersSummary } from "@/components/tours/tour-filters-summary";

export default function ImprovedToursPage() {
  const {
    filters,
    updateFilter,
    clearFilters,
    clearSpecificFilter,
    hasActiveFilters,
    activeFilterCount,
  } = useToursFilters();

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const { data: toursResponse, isLoading, error } = useToursSearch(filters);
  const tours = toursResponse?.tours || [];
  const totalCount = toursResponse?.total || 0;
  const totalPages = Math.ceil(totalCount / (filters.limit || 12));

  const [searchInput, setSearchInput] = useState(filters.searchTerm || "");

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Discover Amazing Tours
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
              Find your perfect adventure with our intelligent search and
              filtering system
            </p>
          </motion.div>
        </div>
      </section>

      {error && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-500 mb-6">
              Unable to load tours. Please try again later.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* Enhanced Filter System */}
      <section className="bg-white border-b shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Primary Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search destinations, activities, or tour names..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0 rounded-xl"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Location Filter */}
                <div className="flex-1 min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Location
                  </label>
                  <Input
                    placeholder="Where do you want to go?"
                    value={filters.location || ""}
                    onChange={(e) => updateFilter("location", e.target.value)}
                    className="border-gray-200 focus:border-blue-500 focus:ring-0"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex-1 min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Tag className="inline h-4 w-4 mr-1" />
                    Category
                  </label>
                  <Select
                    value={filters.category || "all"}
                    onValueChange={(value) => updateFilter("category", value)}
                  >
                    <SelectTrigger className="border-gray-200 focus:border-blue-500">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="historical">🏛️ Historical</SelectItem>
                      <SelectItem value="cultural">🎭 Cultural</SelectItem>
                      <SelectItem value="eco">🌿 Eco Tours</SelectItem>
                      <SelectItem value="luxury">✨ Luxury</SelectItem>
                      <SelectItem value="adventure">🏔️ Adventure</SelectItem>
                      <SelectItem value="culinary">🍷 Culinary</SelectItem>
                      <SelectItem value="religious">⛪ Religious</SelectItem>
                      <SelectItem value="educational">
                        📚 Educational
                      </SelectItem>
                      <SelectItem value="wellness">🧘 Wellness</SelectItem>
                      <SelectItem value="photography">
                        📸 Photography
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Difficulty Filter */}
                <div className="flex-1 min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mountain className="inline h-4 w-4 mr-1" />
                    Difficulty
                  </label>
                  <Select
                    value={filters.difficulty || "all"}
                    onValueChange={(value) => updateFilter("difficulty", value)}
                  >
                    <SelectTrigger className="border-gray-200 focus:border-blue-500">
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="easy">🟢 Easy</SelectItem>
                      <SelectItem value="moderate">🟡 Moderate</SelectItem>
                      <SelectItem value="challenging">
                        🟠 Challenging
                      </SelectItem>
                      <SelectItem value="difficult">🔴 Difficult</SelectItem>
                      <SelectItem value="extreme">⚫ Extreme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Advanced Filters Toggle */}
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="border-gray-200 hover:border-blue-500 relative"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                    {activeFilterCount > 3 && (
                      <Badge className="ml-2 bg-blue-500 text-white text-xs px-1.5 py-0.5">
                        {activeFilterCount - 3}
                      </Badge>
                    )}
                    {showAdvancedFilters ? (
                      <ChevronUp className="h-4 w-4 ml-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-2" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Price Range */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <DollarSign className="inline h-4 w-4 mr-1" />
                          Price Range
                        </label>
                        <div className="flex gap-2 items-center">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={filters.minPrice || ""}
                            onChange={(e) =>
                              updateFilter(
                                "minPrice",
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              )
                            }
                            className="border-gray-200 focus:border-blue-500 focus:ring-0"
                          />
                          <span className="text-gray-400">to</span>
                          <Input
                            type="number"
                            placeholder="Max"
                            value={filters.maxPrice || ""}
                            onChange={(e) =>
                              updateFilter(
                                "maxPrice",
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              )
                            }
                            className="border-gray-200 focus:border-blue-500 focus:ring-0"
                          />
                        </div>
                      </div>

                      {/* Duration */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="inline h-4 w-4 mr-1" />
                          Duration (Days)
                        </label>
                        <div className="flex gap-2 items-center">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={filters.minDuration || ""}
                            onChange={(e) =>
                              updateFilter(
                                "minDuration",
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              )
                            }
                            className="border-gray-200 focus:border-blue-500 focus:ring-0"
                          />
                          <span className="text-gray-400">to</span>
                          <Input
                            type="number"
                            placeholder="Max"
                            value={filters.maxDuration || ""}
                            onChange={(e) =>
                              updateFilter(
                                "maxDuration",
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              )
                            }
                            className="border-gray-200 focus:border-blue-500 focus:ring-0"
                          />
                        </div>
                      </div>

                      {/* Available Seats */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Users className="inline h-4 w-4 mr-1" />
                          Min Available Seats
                        </label>
                        <Input
                          type="number"
                          placeholder="Minimum seats needed"
                          value={filters.minAvailableSeats || ""}
                          onChange={(e) =>
                            updateFilter(
                              "minAvailableSeats",
                              e.target.value
                                ? Number(e.target.value)
                                : undefined,
                            )
                          }
                          className="border-gray-200 focus:border-blue-500 focus:ring-0"
                        />
                      </div>

                      {/* Date Range */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="inline h-4 w-4 mr-1" />
                          Travel Dates
                        </label>
                        <div className="flex gap-2 items-center">
                          <Input
                            type="date"
                            value={filters.startDate || ""}
                            onChange={(e) =>
                              updateFilter("startDate", e.target.value)
                            }
                            className="border-gray-200 focus:border-blue-500 focus:ring-0"
                          />
                          <span className="text-gray-400">to</span>
                          <Input
                            type="date"
                            value={filters.endDate || ""}
                            onChange={(e) =>
                              updateFilter("endDate", e.target.value)
                            }
                            className="border-gray-200 focus:border-blue-500 focus:ring-0"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters Display */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4"
              >
                <TourFiltersSummary
                  filters={filters}
                  activeFilterCount={activeFilterCount}
                  clearFilters={clearFilters}
                  clearSpecificFilter={clearSpecificFilter}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : tours.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-light text-gray-900 mb-4">
                  No tours found
                </h3>
                <p className="text-gray-500 mb-6">
                  {hasActiveFilters
                    ? "Try adjusting your filters to discover more amazing tours."
                    : "No tours are currently available."}
                </p>
                {hasActiveFilters && (
                  <Button
                    onClick={clearFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <>
              {/* Results Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div>
                  <h2 className="text-2xl font-light text-gray-900 mb-2">
                    {hasActiveFilters ? "Filtered Results" : "All Tours"}
                  </h2>
                  <p className="text-gray-500">
                    Showing{" "}
                    {((filters.page || 1) - 1) * (filters.limit || 12) + 1} -{" "}
                    {Math.min(
                      (filters.page || 1) * (filters.limit || 12),
                      totalCount,
                    )}{" "}
                    of {totalCount} tours
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Select
                    value={String(filters.limit || 12)}
                    onValueChange={(value) =>
                      updateFilter("limit", Number(value))
                    }
                  >
                    <SelectTrigger className="w-40 border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 per page</SelectItem>
                      <SelectItem value="12">12 per page</SelectItem>
                      <SelectItem value="24">24 per page</SelectItem>
                      <SelectItem value="48">48 per page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              {/* Tours Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {tours.map((tour, index) => (
                  <TourCard key={tour.id} tour={tour} index={index} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center items-center gap-2"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateFilter("page", Math.max(1, (filters.page || 1) - 1))
                    }
                    disabled={filters.page === 1}
                    className="border-gray-200"
                  >
                    Previous
                  </Button>

                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNum =
                      Math.max(
                        1,
                        Math.min(totalPages - 4, (filters.page || 1) - 2),
                      ) + i;
                    return (
                      <Button
                        key={pageNum}
                        variant={
                          pageNum === filters.page ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => updateFilter("page", pageNum)}
                        className="border-gray-200"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateFilter(
                        "page",
                        Math.min(totalPages, (filters.page || 1) + 1),
                      )
                    }
                    disabled={filters.page === totalPages}
                    className="border-gray-200"
                  >
                    Next
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
