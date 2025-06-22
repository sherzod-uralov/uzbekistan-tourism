"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useTourComments, useDeleteComment, useUpdateComment } from "@/hooks/use-comments"
import { useAuth } from "@/hooks/use-auth"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Star, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import type { TourComment } from "@/types"

interface CommentListProps {
    tourId: number
}

interface CommentItemProps {
    comment: TourComment
}

function CommentItem({ comment }: CommentItemProps) {
    const { user } = useAuth()
    const deleteComment = useDeleteComment()
    const updateComment = useUpdateComment()
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(comment.comment)
    const [editRating, setEditRating] = useState(comment.rating)

    const isOwner = user?.id === comment.userId
    const canEdit = isOwner || user?.role === "admin"

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            deleteComment.mutate(comment.id)
        }
    }

    const handleUpdate = () => {
        if (!editText.trim()) return

        updateComment.mutate(
            {
                id: comment.id,
                data: {
                    comment: editText.trim(),
                    rating: editRating,
                },
            },
            {
                onSuccess: () => {
                    setIsEditing(false)
                },
            },
        )
    }

    const handleCancelEdit = () => {
        setIsEditing(false)
        setEditText(comment.comment)
        setEditRating(comment.rating)
    }

    return (
        <Card className="border border-gray-100 shadow-sm">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={comment.user?.profilePicture || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                                {comment.user?.firstName?.[0] || "U"}
                                {comment.user?.lastName?.[0] || ""}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-medium text-gray-900 text-sm">
                                {comment.user?.firstName} {comment.user?.lastName}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`h-3 w-3 ${
                                                star <= (isEditing ? editRating : comment.rating)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {canEdit && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                {isEditing ? (
                    <div className="space-y-4">
                        {/* Edit Rating */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} type="button" onClick={() => setEditRating(star)} className="p-1">
                                        <Star
                                            className={`h-5 w-5 ${star <= editRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Edit Comment */}
                        <Textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            rows={3}
                            className="border-gray-200 focus:border-gray-400 focus:ring-0"
                        />

                        <div className="flex gap-2">
                            <Button
                                onClick={handleUpdate}
                                disabled={updateComment.isPending || !editText.trim()}
                                size="sm"
                                className="bg-gray-900 hover:bg-gray-800 text-white"
                            >
                                {updateComment.isPending ? "Saving..." : "Save"}
                            </Button>
                            <Button onClick={handleCancelEdit} variant="outline" size="sm" className="border-gray-200">
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600 leading-relaxed">{comment.comment}</p>
                )}
            </CardContent>
        </Card>
    )
}

export function CommentList({ tourId }: CommentListProps) {
    const { data: comments, isLoading, error } = useTourComments(tourId)

    if (isLoading) {
        return (
            <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" />
            </div>
        )
    }

    if (error) {
        return (
            <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-6 text-center">
                    <p className="text-gray-500">Failed to load reviews. Please try again later.</p>
                </CardContent>
            </Card>
        )
    }

    if (!comments || comments.length === 0) {
        return (
            <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-8 text-center">
                    <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-light text-gray-900 mb-2">No reviews yet</h3>
                    <p className="text-gray-500">Be the first to share your experience!</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {comments.map((comment, index) => (
                <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <CommentItem comment={comment} />
                </motion.div>
            ))}
        </div>
    )
}
