import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CollectionService {
  async buyPlayer(userId: string, playerId: string) {
    // Fetch user and player
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const player = await prisma.player.findUnique({ where: { id: playerId } });
    if (!user || !player) throw new Error("User or player not found");
    if (user.balance === null || user.balance === undefined)
      throw new Error("User balance not set");
    if (user.balance < player.price) throw new Error("Insufficient balance");
    // Transaction: deduct balance, add to collection
    return prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { balance: { decrement: player.price } },
      }),
      prisma.userCollection.create({
        data: { userId, playerId },
      }),
    ]);
  }
}

export const collectionService = new CollectionService();
