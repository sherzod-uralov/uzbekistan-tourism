"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateComment } from "@/hooks/use-comments";
import { useAuth } from "@/hooks/use-auth";
import { Star, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CommentFormProps {
  tourId: number;
}

export function CommentForm({ tourId }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { isAuthenticated } = useAuth();
  const createComment = useCreateComment();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (!comment.trim() || rating === 0) {
      return;
    }

    createComment.mutate(
      {
        comment: comment.trim(),
        rating,
        tourId,
      },
      {
        onSuccess: () => {
          setComment("");
          setRating(0);
          toast.success(
            "Thank you for your review! Your feedback helps other travelers.",
          );
        },
      },
    );
  };

  if (!isAuthenticated) {
    return (
      <Card className="border border-gray-100 shadow-sm">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-light text-gray-900 mb-2">
            Share Your Experience
          </h3>
          <p className="text-gray-500 mb-4">
            Sign in to leave a review for this tour
          </p>
          <Button
            onClick={() => router.push("/auth/login")}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            Sign In to Review
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-light">Write a Review</CardTitle>
          <CardDescription className="text-gray-500">
            Share your experience with other travelers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Your Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 transition-colors duration-200"
                  >
                    <Star
                      className={`h-6 w-6 transition-colors duration-200 ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Review
              </label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience on this tour..."
                rows={4}
                className="border-gray-200 focus:border-gray-400 focus:ring-0"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={
                createComment.isPending || !comment.trim() || rating === 0
              }
              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
            >
              {createComment.isPending ? (
                "Posting..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Post Review
                </>
              )}
            </Button>
          </form>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              💡 Your honest review helps other travelers make informed
              decisions about this tour.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
