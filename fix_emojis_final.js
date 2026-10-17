const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const regexFeatures = /<div class="wao-features">[\s\S]*?<\/div>\s*<\/div>/;
const newFeatures = `<div class="wao-features">
              <div>
                  <div class="wao-feat-icon">💎</div>
                  <h4>Qualité Premium</h4>
                  <p>Tous nos produits sont testés et approuvés pour garantir votre satisfaction.</p>
              </div>
              <div>
                  <div class="wao-feat-icon">🔒</div>
                  <h4>Paiement Sécurisé</h4>
                  <p>Profitez de l'esprit tranquille. Payez uniquement à la réception de votre colis.</p>
              </div>
              <div>
                  <div class="wao-feat-icon">🚀</div>
                  <h4>Livraison Rapide</h4>
                  <p>Vos commandes sont expédiées rapidement et livrées directement chez vous.</p>
              </div>
              <div>
                  <div class="wao-feat-icon">🎧</div>
                  <h4>Service Client 24/7</h4>
                  <p>Notre équipe est toujours disponible pour répondre à vos questions et vous assister.</p>
              </div>
          </div>`;
content = content.replace(regexFeatures, newFeatures);

const regexTelegram = /\$text = "xa \*NOUVELLE COMMANDE COD\*[\s\S]*?\]\(" \. \$whatsapp \. "\)";/;
const newTelegram = `$text = "🚨 *NOUVELLE COMMANDE COD* 🚨\\n\\n";
    $text .= "👤 *Client:* " . $name . "\\n";
    $text .= "📞 *Téléphone:* " . $phone . "\\n";
    $text .= "📍 *Adresse:* " . $address . "\\n";
    $text .= "📦 *Produit:* " . $product_name . " (x" . $qty . ")\\n";
    $text .= "💰 *Total:* " . $total . " FCFA\\n\\n";
    $text .= "📲 [Appeler sur WhatsApp](" . $whatsapp . ")";`;
content = content.replace(regexTelegram, newTelegram);

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Fixed features and telegram');