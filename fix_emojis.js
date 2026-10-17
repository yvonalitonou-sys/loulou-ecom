const fs = require('fs');
let content = fs.readFileSync('src/app/components/OrderTable.tsx', 'utf8');

// The corrupted emoji block needs to be replaced with the exact string.
// Since it's hard to match the corrupted characters, we just use a regex between `getWaLinkDriver` and `return `https://wa.me/`
content = content.replace(
  /const text = `.*?`;/s,
  "const text = `📦 *NOUVELLE LIVRAISON*\\n\\n👤 Client: ${order.customerName}\\n📞 Tél: ${order.phone}\\n📍 Adresse: ${order.address || 'À demander au client'}\\n🛍️ Produit: ${order.productName} (x${order.quantity})\\n💰 À encaisser: ${order.totalPrice.toLocaleString()} XOF`;"
);

fs.writeFileSync('src/app/components/OrderTable.tsx', content, 'utf8');
console.log('Fixed');