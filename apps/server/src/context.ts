import { PrismaClient } from '@prisma/client';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export async function createContext({ req, res }: CreateExpressContextOptions) {
  const prisma = new PrismaClient();
  return { prisma };
}
