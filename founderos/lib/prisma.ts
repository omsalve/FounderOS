import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pool?: Pool;
  adapter?: any;
};

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL environment variable for Prisma adapter.");
}

if (!globalForPrisma.pool) {
  globalForPrisma.pool = new Pool({ connectionString: process.env.DATABASE_URL });
  globalForPrisma.adapter = new PrismaPg(globalForPrisma.pool);
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: globalForPrisma.adapter,
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
