"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import type { TourFilters } from "@/types/tours.types";

interface TourFiltersSummaryProps {
  filters: TourFilters;
  activeFilterCount: number;
  clearFilters: () => void;
  clearSpecificFilter: (key: keyof TourFilters) => void;
}

export function TourFiltersSummary({
  filters,
  activeFilterCount,
  clearFilters,
  clearSpecificFilter,
}: TourFiltersSummaryProps) {
  if (activeFilterCount === 0) return null;

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-blue-900 mr-2">
            Active Filters ({activeFilterCount}):
          </span>

          {filters.searchTerm && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              Search: "{filters.searchTerm}"
              <X
                className="h-3 w-3 ml-1 cursor-pointer hover:text-blue-600"
                onClick={() => clearSpecificFilter("searchTerm")}
              />
            </Badge>
          )}

          {filters.location && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              📍 {filters.location}
              <X
                className="h-3 w-3 ml-1 cursor-pointer hover:text-blue-600"
                onClick={() => clearSpecificFilter("location")}
              />
            </Badge>
          )}

          {filters.category && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              🏷️ {filters.category}
              <X
                className="h-3 w-3 ml-1 cursor-pointer hover:text-blue-600"
                onClick={() => clearSpecificFilter("category")}
              />
            </Badge>
          )}

          {filters.difficulty && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              ⛰️ {filters.difficulty}
              <X
                className="h-3 w-3 ml-1 cursor-pointer hover:text-blue-600"
                onClick={() => clearSpecificFilter("difficulty")}
              />
            </Badge>
          )}

          {(filters.minPrice || filters.maxPrice) && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              💰 ${filters.minPrice || "0"} - ${filters.maxPrice || "∞"}
              <X
                className="h-3 w-3 ml-1 cursor-pointer hover:text-blue-600"
                onClick={() => {
                  clearSpecificFilter("minPrice");
                  clearSpecificFilter("maxPrice");
                }}
              />
            </Badge>
          )}

          {(filters.minDuration || filters.maxDuration) && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              📅 {filters.minDuration || "0"} - {filters.maxDuration || "∞"}{" "}
              days
              <X
                className="h-3 w-3 ml-1 cursor-pointer hover:text-blue-600"
                onClick={() => {
                  clearSpecificFilter("minDuration");
                  clearSpecificFilter("maxDuration");
                }}
              />
            </Badge>
          )}

          {filters.minAvailableSeats && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              👥 Min {filters.minAvailableSeats} seats
              <X
                className="h-3 w-3 ml-1 cursor-pointer hover:text-blue-600"
                onClick={() => clearSpecificFilter("minAvailableSeats")}
              />
            </Badge>
          )}

          {(filters.startDate || filters.endDate) && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              📅 {filters.startDate || "Any"} - {filters.endDate || "Any"}
              <X
                className="h-3 w-3 ml-1 cursor-pointer hover:text-blue-600"
                onClick={() => {
                  clearSpecificFilter("startDate");
                  clearSpecificFilter("endDate");
                }}
              />
            </Badge>
          )}

          <Separator orientation="vertical" className="h-6 bg-blue-300" />

          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-blue-700 hover:text-blue-900 hover:bg-blue-100"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
