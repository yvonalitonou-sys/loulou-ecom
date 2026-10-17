const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  console.log(orders.map(o => ({ id: o.orderNumber, name: o.customerName })));
}
main().catch(console.error).finally(() => prisma.$disconnect());