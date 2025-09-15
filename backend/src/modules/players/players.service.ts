import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PlayersService {
  async getAllPlayers() {
    return prisma.player.findMany();
  }

  async getPlayerById(playerId: string) {
    return prisma.player.findUnique({
      where: { id: playerId },
    });
  }
}

export const playersService = new PlayersService();
