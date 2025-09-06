import { apiClient } from './http';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

// ✅ Cookie helper functions (works on both server and client)


function getCookie(name: string): string | null {
  if (typeof document !== 'undefined') {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}



function getAuthTokenFromStorage(): string | null {
  return getCookie('authToken');
}



// Login user
export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/login', {
    email,
    password,
  });


  console.log("🍪 Login response token:", response.data.token );
  return response;
}

// Register new user
export async function register(
  email: string,
  password: string,
  name: string
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/register', {
    name,
    email,
    password,
  });


  return response;
}

// Logout user
export async function logout(): Promise<void> {
  try {
    // Call backend logout endpoint to clear HTTP-only cookie
    await apiClient.post('/auth/logout');
  } catch (error) {
    console.warn('Logout endpoint failed:', error);
  } finally {
    // Only redirect on client side
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  }
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  const token = getAuthTokenFromStorage();
  if (!token) {
    return null;
  }

  try {
    const response = await apiClient.get<{ success: boolean; data: User }>('/auth/profile');
    return response.data;
  } catch (error) {
    // HTTP-only cookie might be invalid or expired
    return null;
  }
}

// Check if user is authenticated (by trying to get profile)
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}

// Get auth token - not applicable with HTTP-only cookies
export function getAuthToken(): string | null {
  // HTTP-only cookies are handled automatically by the browser
  return null;
}
