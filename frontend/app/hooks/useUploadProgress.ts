import { useState, useCallback } from 'react';
import { uploadFile, getPresignedUploadUrl } from '../services/files';

interface UseUploadProgressResult {
  progress: number;
  uploading: boolean;
  error: string | null;
  uploadFile: (file: File, folder?: string) => Promise<string | null>;
  reset: () => void;
}

export function useUploadProgress(): UseUploadProgressResult {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = useCallback(
    async (file: File, folder: string = 'players'): Promise<string | null> => {
      setUploading(true);
      setProgress(0);
      setError(null);

      try {
        // Get presigned upload URL
        const presignedData = await getPresignedUploadUrl(file.name, file.type, folder);

        // Upload file with progress tracking
        const uploadedUrl = await uploadFile(file, presignedData, (progressPercent) =>
          setProgress(progressPercent)
        );

        setUploading(false);
        return uploadedUrl;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Upload failed';
        setError(errorMessage);
        setUploading(false);
        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setProgress(0);
    setUploading(false);
    setError(null);
  }, []);

  return {
    progress,
    uploading,
    error,
    uploadFile: handleUpload,
    reset,
  };
}
