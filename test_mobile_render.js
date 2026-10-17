const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findUnique({ where: { email: 'admin@loulou.com' } });
  const session = await prisma.session.create({
    data: {
      userId: admin.id,
      expiresAt: new Date(Date.now() + 1000000)
    }
  });

  const res = await fetch('http://127.0.0.1:3000/commandes', {
    headers: { 'Cookie': `sessionId=${session.id}` }
  });
  console.log("Commandes HTTP Status:", res.status);
  const text = await res.text();
  console.log("Contains 'MobileNavbar' markup:", text.includes('aria-label="Menu"'));
}
main().catch(console.error).finally(() => prisma.$disconnect());