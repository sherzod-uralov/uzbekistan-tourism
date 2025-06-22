import { apiClient } from "@/lib/axios";

export interface UploadResponse {
  originalname: string;
  filename: string;
  mimetype: string;
  size: number;
  url: string;
}

export const uploadService = {
  async uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<UploadResponse>(
      "/upload/file",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  },
};
