import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UsersService {
  async updateBalance(userId: string, balance: number) {
    return prisma.user.update({
      where: { id: userId },
      data: { balance },
    });
  }
}

export const usersService = new UsersService();
