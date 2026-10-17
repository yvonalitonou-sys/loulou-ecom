const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.hfifupzdtuhotjkwsduc:Leo10Messi10*%2F*@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true"
    }
  }
});

async function main() {
  try {
    const res = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("QUERY SUCCESSFUL:", res);
  } catch(e) {
    console.error("QUERY ERROR:", e);
  }
}
main().finally(() => prisma.$disconnect());