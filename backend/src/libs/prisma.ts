import { PrismaClient } from "@prisma/client";
import { env } from "../config/env";

declare global {
  var __prisma: PrismaClient | undefined;
}

// Prevent multiple instances of Prisma Client in development
export const prisma =
  globalThis.__prisma ||
  new PrismaClient({
    log: env.isDevelopment ? ["query", "error", "warn"] : ["error"],
    errorFormat: "pretty",
  });

if (env.isDevelopment) {
  globalThis.__prisma = prisma;
}

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit();
});
