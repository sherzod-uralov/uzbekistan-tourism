"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateComment, useTourComments } from "@/hooks/use-comments";
import { useAuth } from "@/hooks/use-auth";
import { Star, Send, X } from "lucide-react";
import { CommentList } from "@/components/comments/comment-list";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourId: number;
  tourTitle: string;
}

export function ReviewModal({
  isOpen,
  onClose,
  tourId,
  tourTitle,
}: ReviewModalProps) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [activeTab, setActiveTab] = useState<"write" | "view">("write");
  const { isAuthenticated } = useAuth();
  const createComment = useCreateComment();
  const { data: comments } = useTourComments(tourId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
          setActiveTab("view");
        },
      },
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl lg:text-2xl font-light text-gray-900 truncate">
                  Tour Review
                </h2>
                <p className="text-gray-500 text-sm mt-1 truncate">
                  {tourTitle}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 ml-4"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setActiveTab("write")}
                className={`flex-1 px-4 lg:px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === "write"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Write Review
              </button>
              <button
                onClick={() => setActiveTab("view")}
                className={`flex-1 px-4 lg:px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === "view"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                All Reviews ({comments?.length || 0})
              </button>
            </div>

            {/* Content */}
            <div className="p-4 lg:p-6 max-h-[60vh] overflow-y-auto">
              {activeTab === "write" ? (
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
                            className={`h-6 lg:h-8 w-6 lg:w-8 transition-colors duration-200 ${
                              star <= (hoveredRating || rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <p className="text-sm text-gray-500 mt-2">
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
                      rows={6}
                      className="border-gray-200 focus:border-gray-400 focus:ring-0"
                      required
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-700">
                      💡 Your honest review helps other travelers make informed
                      decisions about this tour.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      disabled={
                        createComment.isPending ||
                        !comment.trim() ||
                        rating === 0
                      }
                      className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
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
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="border-gray-200"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <CommentList tourId={tourId} />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
