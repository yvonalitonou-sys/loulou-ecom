const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log(users.map(u => ({ username: u.username, role: u.role, name: u.name })));
}
main().catch(console.error).finally(() => prisma.$disconnect());