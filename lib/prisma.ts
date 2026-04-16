import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

// ─── Serverless-safe Prisma Client ───────────────────────────────────
// Uses Neon's serverless driver adapter for optimal performance
// in Netlify Serverless/Edge Functions.
//
// Prisma 6.19+: driverAdapters are stable, no preview feature needed.
// The adapter is passed directly to PrismaClient constructor.

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL!;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool as any);
  return new PrismaClient({ adapter } as any);
}

// Cache on globalThis to prevent multiple instances during
// Next.js hot-reload in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
