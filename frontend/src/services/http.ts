import axios from 'axios';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true, // This is crucial for sending cookies with requests
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to:`, config.url);
    console.log('📋 Request config:', {
      baseURL: config.baseURL,
      withCredentials: config.withCredentials,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging and error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status, response.statusText);
    console.log('📦 Response data:', response.data);
    
    // Log cookie information
    if (response.headers['set-cookie']) {
      console.log('🍪 Set-Cookie headers received:', response.headers['set-cookie']);
    }
    
    return response.data; // Return only the data part
  },
  (error) => {
    console.error('❌ Response error:', error);
    
    if (error.response) {
      // Server responded with error status
      console.error('📛 Error response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
      
      // Handle specific error cases
      if (error.response.status === 401) {
        // Unauthorized - redirect to login or clear auth state
        console.warn('🚫 Unauthorized request - user may need to login again');
      }
      
      // Return the error message from the server response
      const message = error.response.data?.message || error.response.data?.error || 'Request failed';
      throw new Error(message);
    } else if (error.request) {
      // Network error
      console.error('🌐 Network error:', error.request);
      throw new Error('Network error - please check your connection');
    } else {
      // Other error
      console.error('⚡ Unexpected error:', error.message);
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

export default apiClient;
