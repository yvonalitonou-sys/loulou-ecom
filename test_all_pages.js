const routes = ['/', '/login', '/commandes', '/livraisons', '/pub', '/stock', '/equipe'];
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

  for (const r of routes) {
    const res = await fetch('http://127.0.0.1:3000' + r, {
      headers: { 'Cookie': `sessionId=${session.id}` }
    });
    console.log(`Route ${r.padEnd(12)} -> Status ${res.status}`);
    if (res.status !== 200) {
      console.error(`ERROR: Route ${r} returned status ${res.status}`);
      process.exit(1);
    }
  }
  console.log("TOUTES LES 7 ROUTES PRINCIPALES FONCTIONNENT SANS AUCUNE ERREUR !");
}
main().catch(console.error).finally(() => prisma.$disconnect());