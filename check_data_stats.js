const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const orders = await prisma.order.findMany();
  const expenses = await prisma.expense.findMany();
  const products = await prisma.product.findMany();
  console.log(`Orders count: ${orders.length}`);
  console.log(`Expenses count: ${expenses.length}`);
  console.log(`Products count: ${products.length}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());