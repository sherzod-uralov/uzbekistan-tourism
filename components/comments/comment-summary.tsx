"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useTourRating } from "@/hooks/use-comments"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Star } from "lucide-react"

interface RatingSummaryProps {
    tourId: number
}

export function RatingSummary({ tourId }: RatingSummaryProps) {
    const { data: rating, isLoading, error } = useTourRating(tourId)

    if (isLoading) {
        return (
            <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-6 text-center">
                    <LoadingSpinner size="sm" />
                </CardContent>
            </Card>
        )
    }

    if (error || !rating) {
        return null
    }

    const { averageRating, totalComments } = rating

    if (totalComments === 0) {
        return (
            <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                        <Star className="h-4 w-4" />
                        <span className="text-sm">No reviews yet</span>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="text-3xl font-light text-gray-900">{averageRating.toFixed(1)}</div>
                            <div>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`h-4 w-4 ${
                                                star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Based on {totalComments} review{totalComments !== 1 ? "s" : ""}
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-sm text-gray-500">Overall Rating</div>
                            <div className="text-lg font-light text-gray-900">
                                {averageRating >= 4.5
                                    ? "Excellent"
                                    : averageRating >= 4.0
                                        ? "Very Good"
                                        : averageRating >= 3.0
                                            ? "Good"
                                            : averageRating >= 2.0
                                                ? "Fair"
                                                : "Poor"}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
