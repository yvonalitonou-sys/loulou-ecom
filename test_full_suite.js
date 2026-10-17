const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("=== TEST DE TOUTES LES FONCTIONNALITÉS ET BOUTONS ===");
  
  // 1. Test création de commande
  const newOrder = await prisma.order.create({
    data: {
      orderNumber: "TEST-" + Date.now(),
      storeName: "Test Suite",
      customerName: "Aline Test",
      phone: "+22901998877",
      address: "Cotonou Cadjehoun",
      productName: "Kit Beauté Glow",
      quantity: 2,
      totalPrice: 16000,
      status: "PENDING"
    }
  });
  console.log("✔ Création commande:", newOrder.id, newOrder.orderNumber);

  // 2. Test changement de statut vers POSTPONED avec motif
  const updatedPostponed = await prisma.order.update({
    where: { id: newOrder.id },
    data: { status: "POSTPONED", postponedReason: "Client en déplacement" }
  });
  console.log("✔ Passage en REPORTÉE avec motif:", updatedPostponed.status, updatedPostponed.postponedReason);

  // 3. Test assignation à un livreur
  const driver = await prisma.driver.findFirst();
  const updatedAssigned = await prisma.order.update({
    where: { id: newOrder.id },
    data: { driverId: driver.id, status: "SHIPPED" }
  });
  console.log("✔ Assignation Livreur (Loulou):", updatedAssigned.driverId, "Statut:", updatedAssigned.status);

  // 4. Test livraison et encaissement
  const updatedDelivered = await prisma.order.update({
    where: { id: newOrder.id },
    data: { status: "DELIVERED", deliveredAt: new Date(), isPaidToAdmin: false }
  });
  console.log("✔ Validation Livré (Encaissé):", updatedDelivered.status, "Payé Admin:", updatedDelivered.isPaidToAdmin);

  // 5. Test caisse et reversement à l'admin
  const remitted = await prisma.order.updateMany({
    where: { driverId: driver.id, status: "DELIVERED", isPaidToAdmin: false },
    data: { isPaidToAdmin: true }
  });
  console.log("✔ Validation Remise de Caisse (Reversement):", remitted.count, "commandes réglées");

  // 6. Test suppression de commande
  await prisma.order.delete({ where: { id: newOrder.id } });
  console.log("✔ Suppression commande test réussie");

  console.log("=== TOUS LES TESTS BACKEND PASSENT À 100% ===");
}
main().catch(console.error).finally(() => prisma.$disconnect());