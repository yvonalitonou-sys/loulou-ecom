const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const closer = await prisma.user.findUnique({ where: { email: 'closeur@loulou.com' } });
  const session = await prisma.session.create({
    data: {
      userId: closer.id,
      expiresAt: new Date(Date.now() + 1000000)
    }
  });
  
  // Test accessing /livraisons with closer session
  const res = await fetch('http://127.0.0.1:3000/livraisons', {
    headers: { 'Cookie': `sessionId=${session.id}` },
    redirect: 'manual'
  });
  console.log("Closer accessing /livraisons status:", res.status, "Location:", res.headers.get('location'));
  
  // Test accessing /commandes with closer session
  const res2 = await fetch('http://127.0.0.1:3000/commandes', {
    headers: { 'Cookie': `sessionId=${session.id}` },
    redirect: 'manual'
  });
  console.log("Closer accessing /commandes status:", res2.status);
}
main().catch(console.error).finally(() => prisma.$disconnect());