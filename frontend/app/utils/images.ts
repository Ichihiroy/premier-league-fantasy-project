import { S3_BASE_URL } from './env';

// Build public image URL from S3 key
export function buildImageUrl(key: string): string {
  if (!key) return '';

  // If key is already a full URL, return as-is
  if (key.startsWith('http://') || key.startsWith('https://')) {
    return key;
  }

  // Build S3 URL
  return `${S3_BASE_URL}/${key}`;
}

// Get placeholder image URL
export function getPlaceholderImage(width: number = 300, height: number = 400): string {
  return `https://via.placeholder.com/${width}x${height}/3b82f6/ffffff?text=Player`;
}

// Optimize image URL with query parameters (for services like Cloudinary)
export function optimizeImageUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
): string {
  if (!url || (!url.includes('cloudinary') && !url.includes('imagekit'))) {
    return url;
  }

  const params = new URLSearchParams();

  if (options.width) params.append('w', options.width.toString());
  if (options.height) params.append('h', options.height.toString());
  if (options.quality) params.append('q', options.quality.toString());
  if (options.format) params.append('f', options.format);

  return `${url}?${params.toString()}`;
}

// Check if image URL is valid
export function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}
