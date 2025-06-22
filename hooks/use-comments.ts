import { commentsService } from "@/services/comment.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateCommentData } from "@/types";

export const useTourComments = (tourId: number) => {
  return useQuery({
    queryKey: ["tour-comments", tourId],
    queryFn: () => commentsService.getTourComments(tourId),
    enabled: !!tourId,
  });
};

export const useTourRating = (tourId: number) => {
  return useQuery({
    queryKey: ["tour-rating", tourId],
    queryFn: () => commentsService.getTourRating(tourId),
    enabled: !!tourId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentsService.createComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["tour-comments", data.tourId],
      });
      queryClient.invalidateQueries({ queryKey: ["tour-rating", data.tourId] });
      toast.success("Review posted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to post review");
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCommentData }) =>
      commentsService.updateComment(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["tour-comments", data.tourId],
      });
      queryClient.invalidateQueries({ queryKey: ["tour-rating", data.tourId] });
      toast.success("Review updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update review");
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentsService.deleteComment,
    onSuccess: (_, commentId) => {
      queryClient.invalidateQueries({ queryKey: ["tour-comments"] });
      queryClient.invalidateQueries({ queryKey: ["tour-rating"] });
      toast.success("Review deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete review");
    },
  });
};
