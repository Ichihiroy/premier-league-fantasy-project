// Safe access to Vite environment variables
export function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[key];

  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
}

// Get API base URL
export const API_BASE_URL = getEnvVar('VITE_API_BASE_URL', 'http://localhost:4000/api');

// Get S3 base URL
export const S3_BASE_URL = getEnvVar('VITE_S3_BASE_URL', '');

// Check if we're in development mode
export const isDevelopment = getEnvVar('DEV') === 'true';

// Check if we're in production mode
export const isProduction = getEnvVar('PROD') === 'true';
