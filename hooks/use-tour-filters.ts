"use client";

import { useState, useCallback, useMemo } from "react";
import type { TourFilters } from "@/types/tours.types";

export function useToursFilters(
  initialFilters: TourFilters = { page: 1, limit: 12 },
) {
  const [filters, setFilters] = useState<TourFilters>(initialFilters);

  const updateFilter = useCallback((key: keyof TourFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" || value === "" ? undefined : value,
      page: key !== "page" ? 1 : value, // Reset to first page when changing filters
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      page: 1,
      limit: initialFilters.limit || 12,
    });
  }, [initialFilters.limit]);

  const clearSpecificFilter = useCallback((key: keyof TourFilters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  }, []);

  const hasActiveFilters = useMemo(() => {
    return Object.keys(filters).some(
      (key) =>
        key !== "page" &&
        key !== "limit" &&
        filters[key as keyof TourFilters] !== undefined,
    );
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    return Object.keys(filters).filter(
      (key) =>
        key !== "page" &&
        key !== "limit" &&
        filters[key as keyof TourFilters] !== undefined,
    ).length;
  }, [filters]);

  return {
    filters,
    updateFilter,
    clearFilters,
    clearSpecificFilter,
    hasActiveFilters,
    activeFilterCount,
  };
}
