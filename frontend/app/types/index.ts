export interface Player {
  id: string;
  name: string;
  team: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  age: number;
  nationality: string;
  imageUrl?: string;
  stats?: PlayerStats;
  createdAt: string;
  updatedAt: string;
}

export interface PlayerStats {
  goals: number;
  assists: number;
  appearances: number;
  cleanSheets?: number; // For goalkeepers and defenders
  saves?: number; // For goalkeepers
  yellowCards?: number;
  redCards?: number;
  minutesPlayed?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: string;
  userId: string;
  playerId: string;
  acquiredAt: string;
  player?: Player;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
}

export type Position = 'GK' | 'DEF' | 'MID' | 'FWD';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}
