import { apiClient } from './http';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
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

// Login user
export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('http://localhost:4000/api/auth/login', {
    email,
    password,
  });

  // Store token in localStorage
  if (response.token) {
    localStorage.setItem('authToken', response.token);
  }

  return response;
}

// Register new user
export async function register(
  email: string,
  password: string,
  name: string
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/register', {
    email,
    password,
    name,
  });

  // Store token in localStorage
  if (response.token) {
    localStorage.setItem('authToken', response.token);
  }

  return response;
}

// Logout user
export function logout(): void {
  localStorage.removeItem('authToken');
  // Optionally redirect to login page
  window.location.href = '/auth/login';
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }

  try {
    const user = await apiClient.get<User>('/auth/me');
    return user;
  } catch (error) {
    // Token might be invalid, remove it
    localStorage.removeItem('authToken');
    return null;
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('authToken');
}

// Get auth token
export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}
