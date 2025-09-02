import { apiClient } from './http';

export interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  age: number;
  nationality: string;
  imageUrl?: string;
  stats?: {
    goals: number;
    assists: number;
    appearances: number;
    cleanSheets?: number;
  };
}

export interface PlayerFilters {
  search?: string;
  position?: string;
  team?: string;
  page?: number;
  limit?: number;
}

export interface PlayersResponse {
  players: Player[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreatePlayerData {
  name: string;
  team: string;
  position: string;
  age: number;
  nationality: string;
  imageUrl?: string;
}

// Get all players with optional filters
export async function getPlayers(filters: PlayerFilters = {}): Promise<PlayersResponse> {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      queryParams.append(key, value.toString());
    }
  });

  const queryString = queryParams.toString();
  const endpoint = `/players${queryString ? `?${queryString}` : ''}`;

  return apiClient.get<PlayersResponse>(endpoint);
}

// Get a single player by ID
export async function getPlayerById(id: string): Promise<Player> {
  return apiClient.get<Player>(`/players/${id}`);
}

// Create a new player (admin only)
export async function createPlayer(playerData: CreatePlayerData): Promise<Player> {
  return apiClient.post<Player>('/players', playerData);
}

// Update a player (admin only)
export async function updatePlayer(
  id: string,
  playerData: Partial<CreatePlayerData>
): Promise<Player> {
  return apiClient.put<Player>(`/players/${id}`, playerData);
}

// Delete a player (admin only)
export async function deletePlayer(id: string): Promise<void> {
  return apiClient.delete<void>(`/players/${id}`);
}

// Get user's collection
export async function getUserCollection(userId: string): Promise<Player[]> {
  return apiClient.get<Player[]>(`/users/${userId}/collection`);
}

// Add player to user's collection
export async function addToCollection(userId: string, playerId: string): Promise<void> {
  return apiClient.post<void>(`/users/${userId}/collection`, { playerId });
}

// Remove player from user's collection
export async function removeFromCollection(userId: string, playerId: string): Promise<void> {
  return apiClient.delete<void>(`/users/${userId}/collection/${playerId}`);
}
