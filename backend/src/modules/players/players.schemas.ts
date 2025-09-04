import { z } from "zod";

export const createPlayerSchema = z.object({
  name: z.string().min(1, "Player name is required").max(100, "Name too long"),
  position: z.enum(["GK", "DEF", "MID", "FWD"], {
    message: "Position must be GK, DEF, MID, or FWD",
  }),
  team: z.string().min(1, "Team is required").max(50, "Team name too long"),
  price: z
    .number()
    .min(0.1, "Price must be at least 0.1")
    .max(20, "Price cannot exceed 20"),
  description: z.string().max(500, "Description too long").optional(),
  imageUrl: z.string().url("Must be a valid URL").optional(),
  stats: z.record(z.string(), z.unknown()).optional(), // JSON stats object
});

export const updatePlayerSchema = createPlayerSchema.partial();

export const playerQuerySchema = z.object({
  search: z.string().optional(),
  position: z.enum(["GK", "DEF", "MID", "FWD"]).optional(),
  team: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  sortBy: z.enum(["name", "price", "team", "createdAt"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export type CreatePlayerInput = z.infer<typeof createPlayerSchema>;
export type UpdatePlayerInput = z.infer<typeof updatePlayerSchema>;
export type PlayerQueryInput = z.infer<typeof playerQuerySchema>;
