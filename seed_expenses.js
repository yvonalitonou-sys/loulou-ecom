const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sampleExpenses = [
    { date: new Date(Date.now() - 6 * 24 * 3600 * 1000), adSpend: 12000, otherSpend: 0, notes: "Facebook Ads - Campagne 1" },
    { date: new Date(Date.now() - 5 * 24 * 3600 * 1000), adSpend: 15000, otherSpend: 2000, notes: "Facebook Ads" },
    { date: new Date(Date.now() - 4 * 24 * 3600 * 1000), adSpend: 18000, otherSpend: 0, notes: "TikTok Ads" },
    { date: new Date(Date.now() - 3 * 24 * 3600 * 1000), adSpend: 14000, otherSpend: 0, notes: "Facebook Ads" },
    { date: new Date(Date.now() - 2 * 24 * 3600 * 1000), adSpend: 20000, otherSpend: 1500, notes: "Facebook + TikTok" },
    { date: new Date(Date.now() - 1 * 24 * 3600 * 1000), adSpend: 16000, otherSpend: 0, notes: "Facebook Ads" },
  ];

  for (const exp of sampleExpenses) {
    await prisma.expense.create({ data: exp });
  }
  console.log("Added realistic advertising expenses for last 7 days");
}
main().catch(console.error).finally(() => prisma.$disconnect());