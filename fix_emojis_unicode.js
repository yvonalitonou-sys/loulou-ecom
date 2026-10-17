const fs = require('fs');
let content = fs.readFileSync('src/app/components/OrderTable.tsx', 'utf8');

content = content.replace(
  /const text = `.*?`;/s,
  "const text = `\\u{1F4E6} *NOUVELLE LIVRAISON*\\n\\n\\u{1F464} Client: ${order.customerName}\\n\\u{1F4DE} Tél: ${order.phone}\\n\\u{1F4CD} Adresse: ${order.address || 'À demander au client'}\\n\\u{1F6CD}\\u{FE0F} Produit: ${order.productName} (x${order.quantity})\\n\\u{1F4B0} À encaisser: ${order.totalPrice.toLocaleString()} XOF`;"
);

fs.writeFileSync('src/app/components/OrderTable.tsx', content, 'utf8');
console.log('Fixed using pure unicode escapes');