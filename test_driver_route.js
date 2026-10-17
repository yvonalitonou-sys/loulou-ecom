const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  let driver = await prisma.driver.findFirst();
  if (!driver) {
    driver = await prisma.driver.create({
      data: {
        name: 'Koffi Express',
        phone: '+22997000000'
      }
    });
  }
  console.log("Driver ID:", driver.id, "Name:", driver.name);
  
  const res = await fetch(`http://127.0.0.1:3000/livreur/${driver.id}`);
  console.log("Driver Portal HTTP Status:", res.status);
}
main().catch(console.error).finally(() => prisma.$disconnect());