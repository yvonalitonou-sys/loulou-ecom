import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

function getDatabaseUrl(): string {
  // If a pre-built URL is available, use it
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set')

  // If the password has literal special chars (/ * etc.), reconstruct properly
  // This handles the case where Vercel env var has literal slash in password
  const ref = 'hfifupzdtuhotjkwsduc'
  const pass = process.env.DB_PASSWORD
  if (pass) {
    const encoded = encodeURIComponent(pass)
    return `postgresql://postgres.${ref}:${encoded}@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true`
  }

  return url
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma