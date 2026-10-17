const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const latestOrder = await prisma.order.findFirst({ orderBy: { createdAt: 'desc' } });
  console.log("Latest Order ID:", latestOrder.orderNumber, "Customer:", latestOrder.customerName);
  
  // Call WordPress AJAX to send this order to Telegram group
  const res = await fetch('http://boutique-cod.local/wp-admin/admin-ajax.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `action=wao_send_telegram_ajax&order_id=${latestOrder.orderNumber}`
  });
  const text = await res.text();
  console.log("AJAX RESPONSE:", text);
}
main().catch(console.error).finally(() => prisma.$disconnect());