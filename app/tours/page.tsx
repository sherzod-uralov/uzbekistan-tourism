"use client"
import { motion } from "framer-motion"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Calendar, MapPin, DollarSign, Filter, X, Users, Mountain, Tag } from "lucide-react"
import { useToursSearch } from "@/hooks/use-tours"
import { TourCard } from "@/components/tours/tour-card"
import { useToursFilters } from "@/hooks/use-tour-filters"
import { useQuery } from "@tanstack/react-query"
import { categoriesService } from "@/services/categories.service"

export default function ImprovedToursPage() {
  const { filters, updateFilter, clearFilters, clearSpecificFilter, hasActiveFilters, activeFilterCount } =
      useToursFilters()

  const { data: toursResponse, isLoading, error } = useToursSearch(filters)
  const tours = toursResponse?.tours || []
  const totalCount = toursResponse?.total || 0
  const totalPages = Math.ceil(totalCount / (filters.limit || 12))

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await categoriesService.getCategories()
      return (response as any)
    },
  })

  // Fetch difficulties
  const { data: difficulties, isLoading: difficultiesLoading } = useQuery({
    queryKey: ["difficulties"],
    queryFn: async () => {
      const response = await categoriesService.getDifficulty()
      return (response as any)
    },
  })

  console.log(categories)
  return (
      <div className="min-h-screen pt-16 bg-gray-50">
        {/* Header */}
        <section className="bg-white py-16 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Discover Amazing Tours</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                Find your perfect adventure with our intelligent search and filtering system
              </p>
            </motion.div>
          </div>
        </section>

        {error && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center max-w-md">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-light text-gray-900 mb-4">Something went wrong</h2>
                <p className="text-gray-600 mb-6">Unable to load tours. Please try again later.</p>
                <Button onClick={() => window.location.reload()} className="bg-gray-900 hover:bg-gray-800 text-white">
                  Try Again
                </Button>
              </div>
            </div>
        )}

        {/* Main Content with Sidebar */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex gap-8">
            {/* Sidebar Filters - Single Card */}
            <div className="w-80 flex-shrink-0">
              <div className="sticky top-24">
                <Card className="border-gray-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-medium text-gray-900 flex items-center justify-between">
                    <span className="flex items-center">
                      <Filter className="h-5 w-5 mr-2 text-gray-600" />
                      Filters
                    </span>
                      {hasActiveFilters && (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                            {activeFilterCount}
                          </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Search */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Search className="inline h-4 w-4 mr-1" />
                        Search
                      </label>
                      <Input
                          placeholder="Search tours..."
                          value={filters.searchTerm || ""}
                          onChange={(e) => updateFilter("searchTerm", e.target.value)}
                          className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>

                    {/* Location & Category Row */}
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="inline h-4 w-4 mr-1" />
                          Location
                        </label>
                        <Input
                            placeholder="Where to go?"
                            value={filters.location || ""}
                            onChange={(e) => updateFilter("location", e.target.value)}
                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Tag className="inline h-4 w-4 mr-1" />
                          Category
                        </label>
                        <Select
                            value={filters.category || "all"}
                            onValueChange={(value) => updateFilter("category", value === "all" ? undefined : value)}
                        >
                          <SelectTrigger className="border-gray-300 focus:border-gray-500">
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories?.map((category: any) => (
                                <SelectItem key={category.id} value={category.name.toLowerCase()}>
                                  {category.name}
                                </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Difficulty & Seats Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mountain className="inline h-4 w-4 mr-1" />
                          Difficulty
                        </label>
                        <Select
                            value={filters.difficulty || "all"}
                            onValueChange={(value) => updateFilter("difficulty", value === "all" ? undefined : value)}
                        >
                          <SelectTrigger className="border-gray-300 focus:border-gray-500">
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {difficulties?.map((difficulty: any) => (
                                <SelectItem key={difficulty.id} value={difficulty.name.toLowerCase()}>
                                  {difficulty.name}
                                </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Users className="inline h-4 w-4 mr-1" />
                          Min Seats
                        </label>
                        <Input
                            type="number"
                            placeholder="1"
                            value={filters.minAvailableSeats || ""}
                            onChange={(e) =>
                                updateFilter("minAvailableSeats", e.target.value ? Number(e.target.value) : undefined)
                            }
                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="inline h-4 w-4 mr-1" />
                        Price Range
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={filters.minPrice || ""}
                            onChange={(e) => updateFilter("minPrice", e.target.value ? Number(e.target.value) : undefined)}
                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={filters.maxPrice || ""}
                            onChange={(e) => updateFilter("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        Duration (Days)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={filters.minDuration || ""}
                            onChange={(e) =>
                                updateFilter("minDuration", e.target.value ? Number(e.target.value) : undefined)
                            }
                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={filters.maxDuration || ""}
                            onChange={(e) =>
                                updateFilter("maxDuration", e.target.value ? Number(e.target.value) : undefined)
                            }
                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </div>
                    </div>

                    {/* Travel Dates */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        Travel Dates
                      </label>
                      <div className="grid gap-2">
                        <Input
                            type="date"
                            value={filters.startDate || ""}
                            onChange={(e) => updateFilter("startDate", e.target.value)}
                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                        <Input
                            type="date"
                            value={filters.endDate || ""}
                            onChange={(e) => updateFilter("endDate", e.target.value)}
                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                      </div>
                    </div>

                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                        <div className="pt-2 border-t border-gray-200">
                          <Button
                              onClick={clearFilters}
                              variant="outline"
                              size="sm"
                              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Clear All Filters
                          </Button>
                        </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {isLoading ? (
                  <div className="flex justify-center py-12">
                    <LoadingSpinner size="lg" />
                  </div>
              ) : tours.length === 0 ? (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                    <Card className="max-w-md mx-auto border-gray-200 shadow-sm">
                      <CardContent className="p-8">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-light text-gray-900 mb-4">No tours found</h3>
                        <p className="text-gray-600 mb-6">
                          {hasActiveFilters
                              ? "Try adjusting your filters to discover more amazing tours."
                              : "No tours are currently available."}
                        </p>
                        {hasActiveFilters && (
                            <Button onClick={clearFilters} className="bg-gray-900 hover:bg-gray-800 text-white">
                              Clear All Filters
                            </Button>
                        )}
                      </CardContent>
                    </Card>
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
                        <p className="text-gray-600">
                          Showing {((filters.page || 1) - 1) * (filters.limit || 12) + 1} -{" "}
                          {Math.min((filters.page || 1) * (filters.limit || 12), totalCount)} of {totalCount} tours
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <Select
                            value={String(filters.limit || 12)}
                            onValueChange={(value) => updateFilter("limit", Number(value))}
                        >
                          <SelectTrigger className="w-40 border-gray-300">
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
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
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
                              onClick={() => updateFilter("page", Math.max(1, (filters.page || 1) - 1))}
                              disabled={filters.page === 1}
                              className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            Previous
                          </Button>

                          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            const pageNum = Math.max(1, Math.min(totalPages - 4, (filters.page || 1) - 2)) + i
                            return (
                                <Button
                                    key={pageNum}
                                    variant={pageNum === filters.page ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => updateFilter("page", pageNum)}
                                    className={
                                      pageNum === filters.page
                                          ? "bg-gray-900 hover:bg-gray-800 text-white"
                                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }
                                >
                                  {pageNum}
                                </Button>
                            )
                          })}

                          <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateFilter("page", Math.min(totalPages, (filters.page || 1) + 1))}
                              disabled={filters.page === totalPages}
                              className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            Next
                          </Button>
                        </motion.div>
                    )}
                  </>
              )}
            </div>
          </div>
        </div>
      </div>
  )
}
