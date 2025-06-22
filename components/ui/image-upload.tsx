"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useUpload } from "@/hooks/use-upload";
import { Camera, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  currentImage?: string;
  onImageUploaded: (url: string) => void;
  className?: string;
}

export function ImageUpload({
  currentImage,
  onImageUploaded,
  className = "",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const upload = useUpload();

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    upload.mutate(file, {
      onSuccess: (response) => {
        onImageUploaded(response.url);
        toast.success("Image uploaded successfully!");
      },
      onError: () => {
        setPreview(null);
      },
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const displayImage = preview || currentImage;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current/Preview Image */}
      {displayImage && (
        <div className="relative w-32 h-32 mx-auto">
          <Image
            src={displayImage || "/placeholder.svg"}
            alt="Profile"
            fill
            className="object-cover rounded-full border-4 border-white shadow-lg"
          />
          {preview && (
            <button
              onClick={clearPreview}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          )}
          {upload.isPending && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <LoadingSpinner size="sm" className="text-white" />
            </div>
          )}
        </div>
      )}

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? "border-gray-400 bg-gray-50"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={upload.isPending}
        />

        <div className="space-y-3">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            {upload.isPending ? (
              <LoadingSpinner size="sm" />
            ) : (
              <Camera className="h-6 w-6 text-gray-400" />
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900">
              {upload.isPending ? "Uploading..." : "Upload profile picture"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Drag and drop or click to select
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={upload.isPending}
            className="border-gray-200"
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose File
          </Button>
        </div>
      </div>
    </div>
  );
}
