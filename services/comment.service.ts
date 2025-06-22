import { apiClient } from "@/lib/axios"
import type { TourComment, CreateCommentData, UpdateCommentData, TourRating } from "@/types"

export const commentsService = {
    async createComment(data: CreateCommentData): Promise<TourComment> {
        const response = await apiClient.post<TourComment>("/tour-comments", data)
        return response.data
    },

    async getTourComments(tourId: number): Promise<TourComment[]> {
        const response = await apiClient.get<TourComment[]>(`/tour-comments/tour/${tourId}`)
        return response.data
    },

    async getCommentById(id: number): Promise<TourComment> {
        const response = await apiClient.get<TourComment>(`/tour-comments/${id}`)
        return response.data
    },

    async updateComment(id: number, data: UpdateCommentData): Promise<TourComment> {
        const response = await apiClient.put<TourComment>(`/tour-comments/${id}`, data)
        return response.data
    },

    async deleteComment(id: number): Promise<void> {
        await apiClient.delete(`/tour-comments/${id}`)
    },

    async getTourRating(tourId: number): Promise<TourRating> {
        const response = await apiClient.get<TourRating>(`/tour-comments/rating/${tourId}`)
        return response.data
    },
}
