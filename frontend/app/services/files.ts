export interface FileUploadResponse {
  url: string;
  key: string;
}

export interface PresignedPostData {
  url: string;
  fields: Record<string, string>;
}

// Get presigned URL for file upload (S3 direct upload)
export async function getPresignedUploadUrl(
  fileName: string,
  fileType: string,
  folder: string = 'players'
): Promise<PresignedPostData> {
  const response = await fetch('/api/files/presigned-upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileName,
      fileType,
      folder,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get presigned upload URL');
  }

  return response.json();
}

// Upload file to S3 using presigned URL
export async function uploadFile(
  file: File,
  presignedData: PresignedPostData,
  onProgress?: (progress: number) => void
): Promise<string> {
  const formData = new FormData();

  // Add all the presigned fields
  Object.entries(presignedData.fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Add the file last
  formData.append('file', file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = (event.loaded / event.total) * 100;
        onProgress(progress);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 204) {
        // S3 returns 204 for successful uploads
        const uploadedFileUrl = `${presignedData.url}/${presignedData.fields.key}`;
        resolve(uploadedFileUrl);
      } else {
        reject(new Error('Upload failed'));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'));
    });

    xhr.open('POST', presignedData.url);
    xhr.send(formData);
  });
}

// Build public URL for uploaded files
export function buildImageUrl(key: string, bucket?: string): string {
  // In a real app, this would construct the proper S3/CDN URL
  const baseUrl = import.meta.env.VITE_S3_BASE_URL || 'https://your-bucket.s3.amazonaws.com';
  return `${baseUrl}/${key}`;
}

// Build signed URL for private files
export async function getSignedUrl(key: string): Promise<string> {
  const response = await fetch(`/api/files/signed-url?key=${encodeURIComponent(key)}`);

  if (!response.ok) {
    throw new Error('Failed to get signed URL');
  }

  const { url } = await response.json();
  return url;
}
