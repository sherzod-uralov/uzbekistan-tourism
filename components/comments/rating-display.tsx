"use client";
import { useTourRating } from "@/hooks/use-comments";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface RatingDisplayProps {
  tourId: number;
  compact?: boolean;
  className?: string;
}

export function RatingDisplay({
  tourId,
  compact = false,
  className = "",
}: RatingDisplayProps) {
  const { data: rating, isLoading } = useTourRating(tourId);

  if (isLoading) {
    return <LoadingSpinner size="sm" />;
  }

  if (!rating || rating.totalComments === 0) {
    return (
      <span
        className={`text-sm ${compact ? "text-gray-600" : "text-white/90"} ${className}`}
      >
        No reviews yet
      </span>
    );
  }

  return (
    <span
      className={`text-sm ${compact ? "text-gray-600" : "text-white/90"} ${className}`}
    >
      {rating.averageRating.toFixed(1)} ({rating.totalComments} review
      {rating.totalComments !== 1 ? "s" : ""})
    </span>
  );
}
