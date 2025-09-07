export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Player {
  id: string;
  name: string;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  team: string;
  price: number;
  points: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
  message?: string;
}

export interface CollectionItem {
  id: string;
  name: string;
  type: 'image' | 'document' | 'other';
  size: number;
  url: string;
  thumbnail_url?: string;
  uploaded_at: string;
}
