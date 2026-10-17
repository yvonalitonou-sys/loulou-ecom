const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = 'loulou-salt-123';
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@loulou.com' },
    update: {},
    create: {
      email: 'admin@loulou.com',
      password: hashPassword('admin123'),
      role: 'ADMIN',
      name: 'Administrateur'
    }
  });

  await prisma.user.upsert({
    where: { email: 'closeur@loulou.com' },
    update: {},
    create: {
      email: 'closeur@loulou.com',
      password: hashPassword('closeur123'),
      role: 'CLOSER',
      name: 'Closeur'
    }
  });
  console.log('Database seeded with admin and closer');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });