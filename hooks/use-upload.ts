import { useMutation } from "@tanstack/react-query";
import { uploadService } from "@/services/upload.service";
import { toast } from "sonner";

export const useUpload = () => {
  return useMutation({
    mutationFn: uploadService.uploadFile,
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "File upload failed");
    },
  });
};
